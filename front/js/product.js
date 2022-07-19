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

function AjouterAuPanier(){
    let url = window.location.search;
    let params = new URLSearchParams(url);
    let id = params.get("id");
    console.log('clique détecté')

    let quantité = document.getElementById("quantity").value;
    let CouleurChoisie = document.getElementById('colors').value;
    
    let lignePanier = {
        id: id,
        couleur: CouleurChoisie,
        quantite: parseInt(quantité)
    };

    console.log("Donnée du formulaire :")
    console.log(lignePanier);

    let panier = localStorage.getItem("panier");
    if(!panier) { 
        panier = []
    } else { 
        panier = JSON.parse(panier);
    }

    let panierFindId = panier.find(id  == lignePanier[id])
    console.log("panierFindId =" + panierFindId)
    let panierFindCouleurChoisie = panier.find(CouleurChoisie == lignePanier[CouleurChoisie])
    console.log(panierFindCouleurChoisie)
    

    if(panierFindId && panierFindCouleurChoisie) {
        console.log("trouvé !")
    }
    else{ 
            panier.push(lignePanier);

        }
    localStorage.setItem("panier", JSON.stringify(panier))
    console.log("Nouveau panier");
    console.log(panier);
}

const BoutonAjouterAuPanier = document.getElementById("addToCart");

BoutonAjouterAuPanier.addEventListener ('click', AjouterAuPanier);








