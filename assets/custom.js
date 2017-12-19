var nav = $("nav");

$(document).ready(function() {
  $(".button-collapse").sideNav();
  $('.collapsible').collapsible();
  $('.tap-target').tapTarget('close');
  $('.parallax').parallax();
  $('select').material_select();

  $(document).scroll(function() {
    if ($(this).scrollTop() > 0 && !nav.hasClass("inverse")) {
      nav.removeClass("transparent");
      nav.addClass("scrolled-nav");
      nav.addClass("z-depth-4");
    } else if (!nav.hasClass("inverse")) {
      nav.addClass("transparent");
      nav.removeClass("scrolled-nav");
      nav.removeClass("z-depth-4");
    }
  });
});

$('.carousel.carousel-slider').carousel({
  fullWidth: true
});
