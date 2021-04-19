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
	
	document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked);
}

function removeItem(event){
	var buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.parentElement.remove();
	cartPrice();
}

function addItemsToCart(){
	var productList = getProductCookies();
	if (productList.length == 0){
		return;
	}
	var cartRow = document.createElement('div');
	var cartItems = document.getElementByClassName('cart-items')[0];
	for (var i = 0; i < productList.length; i++){
		var cartRowContent = ` <div class="row mb-4">
								<div class="col-md-5 col-lg-3 col-xl-3">
									<div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
										<img class="img-fluid w-100" src=${productList[i][2]}>
	  										<a href="#!">
												<div class="mask"></div>
											</a>
									</div>
								</div>
								<div class="col-md-7 col-lg-9 col-xl-9">
									<div>
										<div class="d-flex justify-content-between">
											<div>
												<h5>${productList[i][0]}</h5>
												<p class="mb-2 text-muted text-uppercase small weight">190g avg.</p>
												<p class="mb-2 text-muted text-uppercase small price-per-kg">${productList[i][1]} /kg</p>
											</div>
											<div>
												<div class="def-number-input number-input safari_only mb-0 w-100">
													<input class="form-control" class="quantity" min="1" id="quantity0" name="quantity" value="${productList[i][3]}" type="number" onclick="productPrice()">
													<select class="form-control my-2" id="sel1">
														<option value="data4">Brazil</option>
														<option value="data5">Mexico</option>
														<option value="data6">Malaysia</option>
													</select>
												</div>
											</div>
										</div>
										<div class="d-flex justify-content-between align-items-center"></div>
											<div>
												<a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3 mb-4"> Remove item </a>
												<p class="mb-0"><span><strong class="price" id="summary${i}">"$"${price*amount}</strong></span></p class="mb-0">
											</div>
										</div>
									</div>
								</div>
							<hr class="mb-4">`;
		cartRow.innerHTML = cartRowContent;
		cartItems.append(cartRow);
		cartRow.getElementsByClassName('cart-remove-btn')[0].addEventListener('click', removeItem);
	}
	productPrice();
}

  function getProductCookie() {
	var storedProducts = window.sessionStorage.getItem("product");
	var productList = [];
	if (!storedProducts){
		return "";
	}
	storedProducts = storedProcuts.split(']');
	for(var i = 0; i <ca.length; i++) {
	  storedProducts[i].split(",");
	  productList.push(storedProducts[i]);
	}
	return productList;
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
		totalPerProductList[i]= parseFloat(pricePerUnitList[i].innerText.substring(1)) * document.getElementById(('quantity'+i)).value;
		document.getElementById("summary"+i).innerText="$"+totalPerProductList[i].toFixed(2);
	}
	cartPrice();
}
        
function cartPrice(){
	var productPriceList=document.getElementsByClassName('price');
	var i;
	var sum=0.0;
	for(i=0;i<productPriceList.length;i++){
		sum += parseFloat(productPriceList[i].innerText.substring(1));
	}
	var gst=sum*0.05;
	var qst=sum*0.15;
	var total=sum+gst+qst;

	document.getElementById("subtotal").innerText="$"+sum.toFixed(2);
	document.getElementById("gst").innerText="$"+gst.toFixed(2);
	document.getElementById("qst").innerText="$"+qst.toFixed(2);
	document.getElementById("total").innerText="$"+total.toFixed(2);
}
