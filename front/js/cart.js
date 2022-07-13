function apiPanier() {

    
       
    fetch("http://localhost:3000/api/products/" )
        .then(function(res) {
            if (res.ok) {
                return res.json(); 
            }
        })
        .then (function(product) {
            console.log("Le produit reçu :")
            console.log(product);

           
       
        })
        .catch(function(_err) {
            console.log("Erreur !");
            console.log(_err);
        });  
}

apiPanier();