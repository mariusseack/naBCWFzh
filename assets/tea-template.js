$(document).ready(function() {
  checkTemplateheaderVisiblility();

  var para_element = $('.parallax-container .heading-container').children();
  var ele_offset = para_element.offset().top - para_element.height();
  var puffer = 150; //amount (in pixel) of puffer the element can scroll above top
  var max_offset = ele_offset + puffer;

  var main_productcontainer = $(".main-productpicture-wrapper");

  $(document).scroll(function() {
    //parallax custom scrolleffect
    var scroll_offset = $(window).scrollTop();
    var val = (max_offset - scroll_offset);
    var res = Math.round((val / max_offset) * 100) / 100;

    if (res >= 0.0 && res <= 1.0) {
      if (res < 0.2) {
        para_element.css({
          "opacity": "0"
        });
      } else {
        para_element.css({
          "opacity": res
        });
      }
    }

    checkTemplateheaderVisiblility();

  });

  //update productimage display
  $(".inline-productpicture-wrapper .image-element").click(function() {
    var image_ele = $(this).children('img');
    var image_src = image_ele.attr('src');
    var main_image = main_productcontainer.children('img');
    var main_image_src = main_image.attr('src');

    image_src = image_src.replace(/(\_small.png)/, '_large.png');
    main_image_src = main_image_src.replace(/(\_large.png)/, '_small.png');

    main_image.attr('src',image_src);
    image_ele.attr('src',main_image_src);
  });

  //update product-price display
  $('#product_select').change(function(){
    var val = $(this).children('option:checked').val();
    $('#product_price').replaceWith('<span id="product_price">' + val + '</span>');
  });

});

function checkTemplateheaderVisiblility(){
  var template_header = $('section.template-header');
  var scrollTop = $(window).scrollTop();

  if(template_header.height() < scrollTop){
    template_header.children().children('.heading-container').fadeOut();
  }
  else {
    template_header.children().children('.heading-container').fadeIn();
  }
}
