// scroll to top
var myBtn = document.getElementById('myBtn');
window.onscroll = function (){
    scrollFunction()
};

function scrollFunction() {
    if (document.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        myBtn.style.display = "block";
    } else {
        myBtn.style.display = "none";
    }
}

function topFunction (){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
$(document).ready(function(){
    AOS.init(); // initialize aos animations
    // toggle mobile nav menu
    $('.menu-toggle').click(function(){
        $('.responsive-nav').toggleClass("unfold");
        $(this).toggleClass("close-menu");
    });
}); 
