function apiPageProduit() {

    let url = window.location.search; //product.html?id=blablabla
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
            console.log(itemImg)
            itemImg[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;          
        })
        .catch(function(_err) {
            console.log("Erreur !");
            console.log(_err);
        });  
}

apiPageProduit();