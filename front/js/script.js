console.log("test console")

function api() {
       
    console.log("Je suis dans la fonction api()");
   
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (res.ok) {
                return res.json(); 
            }
        })
        .then (function(products) {
            console.log("Les produits reçus :")
            console.log(products);

            let items = document.getElementById("items");
            
            for(let i=0;i<products.length;i++) {
                console.log("Je prends le produit " + i);
                console.log(products[i].name);
                
                let productImageUrl = products[i].imageUrl;
                let productaltTxt = products[i].altTxt;
                let productName = products[i].name;
                let productDescription = products[i].description;

                    items.innerHTML =   '<a href="./product.html?id=42"> <article> <img src='+ productImageUrl + 
                                        'alt=' + productaltTxt + ' ><h3 class="productName">'+ productName +
                                        '</h3><p class="productDescription">'+ productDescription + '</p> </article>  </a>';
            }                   
        })
        .catch(function(_err) {
            console.log("Erreur !");
            console.log(_err);
        });  
}

console.log("J'appele la fonction api()")
api();

/*
function addition(a, b) {
    console.log("Addition de a et b :", a+b);
    return a + b;
}

addition(3, 5);
*/



/*class produit {
    constructor(nom, description, image){
        this.nom = nom;
        this.description = description;
        this.image = image;
    }
}*/

