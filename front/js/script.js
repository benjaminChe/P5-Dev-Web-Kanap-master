console.log("test console")

function api() {

    let htmlproduit =   '<a href="./product.html?id=42"> <article><img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1"><h3 class="productName">Kanap name1</h3><p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p> </article>  </a>';
   
        
                      


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
                
                items.innerHTML = htmlproduit;
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

