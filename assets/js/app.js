$(document).ready(function(){
    // toggle mobile nav menu
    $('.menu-toggle').click(function(){
        $('.responsive-nav').toggleClass("unfold animated slideInDown");
        $(this).toggleClass("close-menu");
    });

    $('#responsive-nav, .unfold.nav-links').click(function(){
        $('.responsive-nav').toggleClass("unfold animated slideInDown");
        $('.menu-toggle').toggleClass("close-menu");
    });
}); 
