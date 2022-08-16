function calculerPrixQte(){

  let panier = JSON.parse(localStorage.getItem("panier"));
  const divPrixTotal = document.getElementById("totalPrice")
  const divQuantiteTotal = document.getElementById("totalQuantity")
  fetch("http://localhost:3000/api/products/")
    .then(function(res) {
      if (res.ok) {
          return res.json(); 
      }
    })
    .then (function(products) {
      let prixTotal = 0;
      let quantiteTotal = 0
      for (let i in panier) {
        let id = panier[i]["id"];
        let quantite = panier[i]["quantite"];
        let product = products.find(function (p) {
          return p._id === id;
        });
      
        console.log("Le produit trouvé :")
        console.log(product);

        let prixLigne = product.price * quantite;
        prixTotal = prixTotal + prixLigne;
        console.log("Prix total : " + prixTotal);
        quantiteTotal = quantiteTotal + quantite;
        console.log("Qte total : " + quantiteTotal);

      }
      divPrixTotal.innerHTML = prixTotal;
      divQuantiteTotal.innerHTML = quantiteTotal

    })
}

function affichagePanier() {
  const interfacePanier = document.getElementById("cart__items");
  let panier = JSON.parse(localStorage.getItem("panier"));
  console.log("panier.lenght = "+ panier.length);
  const divPrixTotal = document.getElementById("totalPrice")
  const divQuantiteTotal = document.getElementById("totalQuantity")
  const btnDelete = document.getElementsByClassName("deleteItem")
  fetch("http://localhost:3000/api/products/")
    .then(function(res) {
      if (res.ok) {
          return res.json(); 
      }
    })
    .then (function(products) {
      let prixTotal = 0;
      let quantiteTotal = 0
      for (let i in panier) {
        let id = panier[i]["id"];
        let color = panier[i]["couleur"];
        let quantite = panier[i]["quantite"];
       
        let product = products.find(function (p) {
          return p._id === id;
        });

        let prixLigne = product.price * quantite;
        prixTotal = prixTotal + prixLigne;
        console.log("Prix total : " + prixTotal);
        quantiteTotal = quantiteTotal + quantite

        interfacePanier.innerHTML += ` <article class="cart__item" data-id="${id}" data-color="${color}">
          <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${color}</p>
              <p>${product.price}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté :</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantite}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
      }
      // Tout les produits ont bien été ajouté
      divPrixTotal.innerHTML = prixTotal;
      divQuantiteTotal.innerHTML = quantiteTotal

      // Ajout des listener pour le changement de quantité
      const quantityItemCart = document.getElementsByClassName("itemQuantity");

      for(let i = 0;i<quantityItemCart.length;i++) {

        btnDelete[i].addEventListener("click", function(event){
          
          let article = event.target.closest("article");
          let dataId = article.getAttribute("data-id");
          let dataColor = article.getAttribute("data-color");
          let articlePanierTrouvee = panier.find(function (el) {
            return dataId === el["id"]  && dataColor === el["couleur"];
          });
          let indexArticlePanierTrouvee = panier.indexOf(articlePanierTrouvee);
          console.log("indexArticlePanierTrouvee = "+indexArticlePanierTrouvee)
          panier.splice(indexArticlePanierTrouvee, 1);
          localStorage["panier"] = JSON.stringify(panier);
          article.remove();
          calculerPrixQte();
        })

        quantityItemCart[i].addEventListener('change', function (event){
          let newQuantite = event.target.value;

          let article = event.target.closest("article");
          let dataId = article.getAttribute("data-id");
          let dataColor = article.getAttribute("data-color");
          
          
          console.log("Nouvelle quantité : " + newQuantite);

          let articlePanierTrouvee = panier.find(function (el) {
            return dataId === el["id"]  && dataColor === el["couleur"];
          });
            articlePanierTrouvee["quantite"] = parseInt(newQuantite);
          
          for(let key in panier) {
            console.log(key + " = ", panier[key]);
          }

          localStorage["panier"] = JSON.stringify(panier)
          
          calculerPrixQte();

          
        })
      }

    })
    .catch(function(_err) {
      console.log("Erreur !");
      console.log(_err);
    });  
}


affichagePanier();

function formulaireContact() {

const orderBtn =  document.getElementById("order") 
const regExName = /[^a-zA-Z]/;
const regExAddress = /^[a-zA-Z0-9\s,'-]$/;
const refExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
let panier = JSON.parse(localStorage.getItem("panier"));
let products = []
for (let i in panier){
products.push(panier[i].id)
}
console.log(products)



orderBtn.addEventListener("click",function(event){
  event.preventDefault()

let firstName = document.getElementById("firstName").value;
let lastName = document.getElementById("lastName").value;
let address = document.getElementById("address").value;
let city = document.getElementById("city").value;
let email = document.getElementById("email").value;

let firstNameValid = false;
let lastNameValid = false;
let addressValid = false;
let cityValid = false;
let emailValid = false;

  
  if(firstName.search(regExName)==-1 ){
    console.log("prenom valide")
    firstNameValid = true;

  }
  else{
    alert("Prénom invalide");
  }
  if(lastName.search(regExName)==-1 ){
      console.log("nom valide");
      lastNameValid= true
    }
  else{
      alert("Nom invalide");
    }
  if(address.search(regExAddress)==-1){
      console.log("address valide");
      addressValid = true
    }
  else{
      alert("adresse invalide");
    }
  if(city.search(regExName)==-1){
      console.log("ville valide")
      cityValid = true
    }
  else{
      alert("Ville invalide");
    }
  if(email.search(refExEmail)==-1){
      alert("Email invalide");
      
    }
  else{
      console.log("email valide");
      emailValid = true
    }

  if(firstNameValid==true && lastNameValid==true && addressValid==true && cityValid==true && emailValid==true){
    
    let contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email };

    console.log("contact = "+JSON.stringify(contact))
    
  let orderPost = {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({contact, products})
  };

  fetch("http://localhost:3000/api/products/order", orderPost)
  .then(function(res) {
      return res.json();
  })
  .then(function(res) {
      console.log(res);
      window.location.href = 'confirmation.html?orderId='+res.orderId;
  })
  .catch(function(res){ console.log(res) })
    
}
});

}

formulaireContact();