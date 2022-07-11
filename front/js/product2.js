function apiPageProduit() {

    let url = window.location.search; //product.html?id=blablabla
    let params = new URLSearchParams(url);
    let id = params.get("id");
       
    fetch("http://localhost:3000/api/products)
        .then(function(res) {
            if (res.ok) {
                return res.json(); 
            }
        })
        .then (function(products) {
            console.log("Les produit reçus :")
            console.log(products);

            let product = products.find(function (p) {
                return p._id === id;
            });

            console.log("Produit trouvé : ");
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