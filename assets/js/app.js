$(document).ready(function(){
    // toggle mobile nav menu
    $('.menu-toggle').click(function(){
        $('.responsive-nav').toggleClass("unfold");
        $(this).toggleClass("close-menu");
    });
}); 
