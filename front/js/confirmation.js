let confirmation = document.getElementById("orderId")

let url = window.location.search;
    let params = new URLSearchParams(url);
    let orderId = params.get("orderId");

confirmation.innerHTML =  orderId