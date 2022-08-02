function affichagePanier() {
  const interfacePanier = document.getElementById("cart__items");
  let panier = JSON.parse(localStorage.getItem("panier"));
  console.log("panier.lenght = "+ panier.length);
  const divPrixTotal = document.getElementById("totalPrice")
  
  fetch("http://localhost:3000/api/products/")
    .then(function(res) {
      if (res.ok) {
          return res.json(); 
      }
    })
    .then (function(products) {
      let prixTotal = 0;
      for (let i in panier) {
        let id = panier[i]["id"];
        let color = panier[i]["couleur"];
        let quantite = panier[i]["quantite"];
       
        let product = products.find(function (p) {
          return p._id === id;
        });
      
        console.log("Le produit trouvé :")
        console.log(product);

        let prixLigne = product.price * quantite;
        prixTotal = prixTotal + prixLigne;
        console.log("Prix total : " + prixTotal);

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

      // Ajout des listener pour le changement de quantité
      const quantityItemCart = document.getElementsByClassName("itemQuantity");

      for(let i = 0;i<quantityItemCart.length;i++) {
        quantityItemCart[i].addEventListener('change', function (event){
          let newQuantite = event.target.value;

          let article = event.target.closest("article");
          let id = article.getAttribute("data-id");
          let color = article.getAttribute("data-color");
          
          //  Changer dans le localstorage la quantité
          console.log("Nouvelle quantité : " + newQuantite);

          // .... Puis : recalculer le total et la quantité totale du panier
        })
      }

    })
    .catch(function(_err) {
      console.log("Erreur !");
      console.log(_err);
    });  
}

affichagePanier();
