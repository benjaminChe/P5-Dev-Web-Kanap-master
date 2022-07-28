function affichagePanier() {
    
        
            

            let interfacePanier = document.getElementById("cart__items");
            let panier = JSON.parse(localStorage.getItem("panier"));
            console.log("panier.lenght = "+ panier.length);
           
            
           for (let i in panier){
            
            let id = panier[i]["id"];
            let color = panier[i]["couleur"];
            let quantite = panier[i]["quantite"];

            fetch("http://localhost:3000/api/products/"+id )
        .then(function(res) {
            if (res.ok) {
                return res.json(); 
            }
        })
      .then (function(product) {
            console.log("Le produit reçu :")
            console.log(product);

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
                  <p>Qté : ${quantite} </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantite}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`

    })
    .catch(function(_err) {
            console.log("Erreur !");
            console.log(_err);
        });  

            
           }
        // Boucle sur le panier 
            // Pour chaque élément du panier : aller chercher dans products la description, la photo, le titre, etc..
            // Fusionner les deux tableaux
        
       
}

affichagePanier();