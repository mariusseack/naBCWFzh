//TRIGGER
$(".open-cart-overlay, #close-cart-btn").click(function() {
  closeCart();
});

$(".delete-cartitem").click(function() {
  deleteCartitem($(this));
});

$(".delete-cartitem").hover(function() {
  hoverDeleteicon($(this).closest('.cart-element'));
}, function() {
  hoverDeleteicon($(this).closest('.cart-element'));
});

//!TRIGGER

//open button trigger
$("#cart-btn").click(function() {
  openCart();
});

function closeCart() {
  $("body").removeClass("stop-scrolling open-cart");
  $("#nav-mobile-pagelinks, #nav-mobile-login").toggleClass("cart-open-hide");
}

function openCart() {
  $("body").addClass("stop-scrolling open-cart");
  $("#nav-mobile-pagelinks, #nav-mobile-login").toggleClass("cart-open-hide");
}

//delete a specific item of the current cart
function deleteCartitem(deletebtn) {
  deletebtn.closest('.cart-element').fadeOut(300);
}

//hover over the delte button - effect
function hoverDeleteicon(item) {
  item.toggleClass('white-text primary-textcolor');
  item.toggleClass('delete-hover');
}
