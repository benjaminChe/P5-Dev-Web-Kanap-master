function apiPageProduit() {

    let url = window.location.search;
    let params = new URLSearchParams(url);
    let id = params.get("id");
       
    fetch("http://localhost:3000/api/products/" + id)
        .then(function(res) {
            if (res.ok) {
                return res.json(); 
            }
        })
        .then (function(product) {
            console.log("Le produit reçu :")
            console.log(product);

            let itemImg = document.getElementsByClassName("item__img");
            let itemName = document.getElementById("title");
            let itemPrice = document.getElementById("price");
            let itemDescription = document.getElementById("description");
            let itemColors = document.getElementById("colors")


            itemImg[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;    
            itemName.innerHTML = product.name  ;
            itemPrice.innerHTML = product.price;
            itemDescription.innerHTML = product.description;
           
            

            for(let i=0;i<product.colors.length;i++){
                
                let ColorsValue = product.colors[i]
                itemColors.innerHTML +=  `<option value="${ColorsValue}">${ColorsValue}</option>` ;
            }
        })
        .catch(function(_err) {
            console.log("Erreur !");
            console.log(_err);
        });  
}

apiPageProduit();

const BoutonAjouterAuPanier = document.getElementById("addToCart");
BoutonAjouterAuPanier.addEventListener('click', AjouterAuPanier() ) ;

function AjouterAuPanier(){
    let url = window.location.search;
    let params = new URLSearchParams(url);
    let id = params.get("id");
       

    let quantité = document.getElementById("quantity").value;
    let CouleurChoisie = document.getElementById('colors').selectedIndex;
    
    localStorage.setItem("id", id);
    localStorage.setItem("quantité", quantité);
    localStorage.setItem("CouleurChoisie", CouleurChoisie);
    console.log(localStorage);
    
}



   

