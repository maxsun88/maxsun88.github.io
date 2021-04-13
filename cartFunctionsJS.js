if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', cartFunction());
} else {
	cartFunction();
}

function cartFunction(){
	var removeFromCartButtons = document.getElementsByClassName('cart-remove-btn');
	for (var i = 0; i<removeFromCartButtons.length; i++){
		var button = removeFromCartButtons[i];
		button.addEventListener('click', removeItem);
	}
	
	var addToCartButtons = document.getElementsByClassName('cart-add-btn');
	for (var i = 0; i < addToCartButtons.length; i++){
		var button = addToCartButtons[i];
		button.addEventListener('click', addToCartButton);
	}
	
	document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked);
}

function removeItem(event){
	var buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
	cartPrice();
}

function addToCartButton(event){
	var button = event.target;
	var item = button.parentElement.parentElement;
	var title = item.getElementsByClassName('p-name')[0].innerHTML;
	var price = parseFloat(item.getElementsByClassName('price')[0].innerHTML.substring(1));
	var image = item.getElementsByClassName('img')[0].src;
	var amount = isNaN(item.getElementByClassName('p-quantity')[0].value) ? 1 : (item.getElementByClassName('')[0].value);
	addItemToCart(title, price, image, amount);
	cartPrice();
}

function addItemToCart(title, price, image, amount){
	var cartRow = document.createElement('div');
	var carItems = document.getElementByClassName('cart-items')[0];
	var cartItemNames = cartItems.getElementsByClassName('cart-item-name');
	for (var i = 0; i < cartItemNames.length; i++){
		if (cartItemNames[i].innerText == title){
			alert('This item is already in your cart');
			return;
		}
	}
	var cartRowContent = ``;
	cartRow.innerHTML = cartRowContent;
	cartItems.append(cartRow);
	cartRow.getElementsByClassName('cart-remove-btn')[0].addEventListener('click', removeItem);
}

function purchaseClicked(){
	alert('Thank you for your purchase!');
	var cartItems = document.getElementsByClassName('cart-items')[0];
	while (cartItems.hasChildNode()){
		cartItems.removeChild(cartItems.firstChild);
	}
	cartPrice();
}

function productPrice(){
	var pricePerUnitList=document.getElementsByClassName('price-per-kg');
	var totalPerProductList=new Array(pricePerUnitList.length);
	var i=0;
	for (i;i<totalPerProductList.length;i++){
		totalPerProductList[i]= parseFloat(pricePerUnitList[i].innerHTML.substring(1)) * document.getElementById(('quantity'+i)).value;
		document.getElementById("summary"+i).innerHTML="$"+totalPerProductList[i].toFixed(2);
	}
	cartPrice();
}
        
function cartPrice(){
	var productPriceList=document.getElementsByClassName('price');
	var i;
	var sum=0.0;
	for(i=0;i<productPriceList.length;i++){
		sum += parseFloat(productPriceList[i].innerHTML.substring(1));
	}
	var gst=sum*0.05;
	var qst=sum*0.15;
	var total=sum+gst+qst;

	document.getElementById("subtotal").innerHTML="$"+sum.toFixed(2);
	document.getElementById("gst").innerHTML="$"+gst.toFixed(2);
	document.getElementById("qst").innerHTML="$"+qst.toFixed(2);
	document.getElementById("total").innerHTML="$"+total.toFixed(2);
}
