/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function mod(n, m) {
        return ((n % m) + m) % m;
}

var percent = 80;
var previousScroll = 0;
$(document).ready(function(){
  $('.attributes').slick({
      adaptiveHeight: true,
      arrows: true,
      infinite: true,
      speed: 700
  });
  
  $(".navigation a, .name-row a").click(function(evn){
        evn.preventDefault();
        $(this.hash).ScrollTo({offsetTop: 60}); 
    });
  
  var navTop = $('.navigation').offset().top;
  var aboutTop = $('.aboutme').offset().top;
  var aboutMargin = $('.aboutme').css('margin-top');
  
  $(window).scroll(function(){
  var sticky = $('.navigation'),
      scroll = $(window).scrollTop();

  if (scroll >= navTop){
      sticky.addClass('fixed');
      $('.portrait-container').addClass('fixedLeft');
      $('.name').addClass('nameFixedLeft');
      var compMargin =  (aboutTop - 50);
      $('.aboutme').css('margin-top', compMargin);
  }
  else{
      sticky.removeClass('fixed');
      $('.portrait-container').removeClass('fixedLeft');
      $('.name').removeClass('nameFixedLeft');
      $('.aboutme').css('margin-top', aboutMargin);
  }
});
    
  /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and 
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $(".navigation li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        
        
        var currentScroll = $(this).scrollTop();
       if (currentScroll > previousScroll){
           // up
            percent = mod((percent + 1 ), 100);
       }else{
           // down
           percent = mod((percent - 1 ), 100);
       }
       previousScroll = currentScroll;
       console.log(percent);
        var value = percent + '%';
        $('.portrait-container').css('background-position-y', value);
        
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top - 150; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-active");
            }
        }

        if((windowPos + windowHeight) === docHeight) { // scrolled to bottom
            if (!$("navigation li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $(".navigation li:last-child a").addClass("nav-active");
            }
        }
    });

});