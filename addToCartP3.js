if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', cartButtonInitializer());
} else {
	cartButtonInitializer();
}

function cartButtonInitializer(){
    var addToCartButtons = document.getElementsByClassName('add-to-cart');
	for (var i = 0; i < addToCartButtons.length; i++){
		var button = addToCartButtons[i];
		button.addEventListener('click', addToCartButton);
	}
}

function addToCartButton(event){
    var button = event.target;
    var item = button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    var title = item.getElementsByClassName('p-name')[0].innerText;
    var price = parseFloat(item.getElementsByClassName('price')[0].innerText.substring(1));
    var image = item.getElementsByClassName('img')[0].src;
    var amount = 1;
    if (item.getElementsByClassName('p-quantity')[0] == undefined){
        setProductCookie(title, price, image, amount);
        return;
    }
    amount = isNaN(item.getElementsByClassName('p-quantity')[0].value) ? 1 : (item.getElementsByClassName('p-quantity')[0].value);
    setProductCookie(title, price, image, amount);
}

function setProductCookie(title, price, image, amount) {
    if (window.sessionStorage.getItem("product") != null && window.sessionStorage.getItem("product").indexOf(title) >= 0){
        alert("This item is already in your cart.")
        console.log(window.sessionStorage.getItem("product"));
        return ;
    }
    if (window.sessionStorage.getItem("product")){
        window.sessionStorage.setItem("product", window.sessionStorage.getItem("product") + title + "," + price + "," + image + "," + amount + "]");
        console.log(window.sessionStorage.getItem("product"));
        return ;
    }
    window.sessionStorage.setItem("product", title + "," + price + "," + image + "," + amount + "]");
    console.log(window.sessionStorage.getItem("product"));
}