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
    var item = button.parentElement.parentElement.parentElement.parentElement;
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
    var cookies = document.cookie;
    if (cookies.length == 0){
        document.cookie = "product=" + title + "," + price + "," + image + "," + amount + "]";
        console.log(document.cookie);
        return ;
    }
    if (cookies.contains(title)){
        alert("This item is already in your cart.")
        return ;
    }
    document.cookie = document.cookie.product + title + "," + price + "," + image + "," + amount + "]";
}