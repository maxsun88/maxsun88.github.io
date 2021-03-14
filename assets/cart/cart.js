window.onbeforeunload = function() {
  //note that we need to pass in string for the first argument, which is the variable name;

   localStorage.setItem("quantity1", $('#quantity1').val());
   localStorage.setItem("quantity2", $('#quantity2').val());
}

window.onload = function() {
   var quantity1 = localStorage.getItem("quantity1");
   var quantity2 = localStorage.getItem("quantity2");
   if (quantity1 !== null) $('#quantity1').val(quantity1);
   if (quantity2 !== null) $('#quantity2').val(quantity2);
}
