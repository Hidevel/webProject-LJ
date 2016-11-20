//source: W3Schools.com

//variable definitions
var slideIndex;


//function called onload of the index page
function initIndex(){
	slideIndex = 0;
	slideShow();
}

//
function slideShow() {
    var i;
    var x = document.getElementsByClassName("homeMedia");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1} 
    x[slideIndex-1].style.display = "block"; 
    setTimeout(slideShow, 3000); // Change image every 2 seconds
}