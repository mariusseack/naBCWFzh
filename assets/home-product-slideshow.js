var timer = null;

$('.product-element').mouseenter(function() {
  var ele = $(this).children('.slideshow-wrapper');
  timer = setInterval(function() {
    ele.children(':first-child')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo(ele);
  }, 1500);
});

$('.product-element').mouseleave(function() {
  clearInterval(timer);
});
