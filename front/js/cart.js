function affichagePanier() {
    fetch("http://localhost:3000/api/products/" )
        .then(function(res) {
            if (res.ok) {
                return res.json(); 
            }
        })
        .then (function(products) {
            console.log("Le produit reçu :")
            console.log(products);

            let interfacePanier = document.getElementById("cart__items")
            let panier = localStorage.getItem("panier")
            console.log("panier =" + panier)
            console.log("panier.lenght = "+ panier.length)
           
            
           for (let i in panier){
            
            let id = panier.id[i];
            
            let color = panier.couleur[i];
            let quantite = panier.quantite[i];

            interfacePanier.innerHTML += ` <article class="cart__item" data-id="${id}" data-color="${color}">
            <div class="cart__item__img">
              <img src="../images/product01.jpg" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>Nom du produit</h2>
                <p>Vert</p>
                <p>42,00 €</p>
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
           }
        // Boucle sur le panier 
            // Pour chaque élément du panier : aller chercher dans products la description, la photo, le titre, etc..
            // Fusionner les deux tableaux
        })
        .catch(function(_err) {
            console.log("Erreur !");
            console.log(_err);
        });  
}

affichagePanier();