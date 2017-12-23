//initial
$(function() {
  updateCart();
});

//TRIGGER
$(".open-cart-overlay, #close-cart-btn").click(function() {
  closeCart();
});

$("body").on('click', '.delete-cartitem', function() {
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
//open button trigger
$(".btn-addtocart").click(function(e) {
  e.preventDefault();
  let variantId;
  if ($('#product_select').length) {
    variantId = $('#product_select').val();
  } else {
    variantId = $(this).data('itemId');
  }
  addToCart(variantId, 1);
  return false;
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
  const $_cartItem = deletebtn.closest('.cart-element');

  let options = {
    quantity: 0,
    id: $_cartItem.data('itemId')
  };

  $.post('/cart/change.js', options, 'json')
    .done(function(data) {
      $_cartItem.fadeOut(300);
      setTimeout(updateCart, 300);
    })
    .fail(function(jqxhr, textStatus, error) {
      swal("Ups!", 'Es ist etwas schief gelaufen, bitte versuchen Sie es erneute.', "error");
    });
}

//hover over the delte button - effect
function hoverDeleteicon(item) {
  item.toggleClass('white-text primary-textcolor');
  item.toggleClass('delete-hover');
}

function updateCart() {
  return $.getJSON('/cart.js')
    .done(function(data) {
      const $_cart = $('.cart-element-wrapper');
      $_cart.empty();

      $('#CartCost').text((data.total_price / 100).formatMoney(2, ',', '.') + ' €');
      $('.cart-sum-price').text((data.total_price / 100).formatMoney(2, ',', '.') + ' €');

      if (data.items.length <= 0) {
        //hide the sum and 'go to cart' button
        $('.cart-container').find('.cart-sum').hide().next().hide();

        // when cart is empty show the following and hide all cart-elements
        $_cart.append('<div> \
            <p>Dein Warenkorb ist leer, Zeit das zu &auml;ndern.</p> \
            <a href="/collections/all" class="btn waves-effect primary-btn fullWidth">Entdecke unsere Produkte</a> \
          </div>');
      } else {
        //show the sum and 'go to cart' button
        $('.cart-container').find('.cart-sum').show().next().show();

        data.items.forEach(function(item) {
            $_cart.append('<div class="cart-element hoverable z-depth-2 secondary-textcolor" data-item-id="'+ item.id +'"> \
              <div class="cart-productimg" style="background-image: url('+ item.image.replace(/(\.png|\.jpg|\.jpeg)/, '_75x75$1') +')"></div> \
              <p class="cart-product-description secondary-textcolor"> \
                <span class="cart-amount-description">'+ item.quantity +'x</span> \
                <span class="cart-name-description"><a href="'+ item.url +'" class="secondary-textcolor">'+ item.product_title + ' (' + item.variant_title +')</a></span> \
              </p> \
              <p class="cart-price center-align">'+ (item.price / 100).formatMoney(2, ',', '.') +'&nbsp;&euro;</p> \
              <i class="delete-cartitem material-icons secondary-textcolor pointer">close</i> \
            </div>');
        });
      }
    })
    .fail(function(jqxhr, textStatus, error) {
    });
}

function addToCart(itemId, amount) {
  $.getJSON('/cart/add.js', { quantity: amount, id: itemId })
    .done(function(data) {
        updateCart()
          .done(openCart);
    })
    .fail(function(jqxhr, textStatus, error) {
      swal("Ups!", 'Es ist etwas schief gelaufen, bitte versuchen Sie es erneute.', "error");
    });
}

Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
