
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}



// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_navbar_hide_scroll
// navbar hides on scroll
var prevScrollpos = window.pageYOffset;
		window.onscroll = function() {
		var currentScrollPos = window.pageYOffset;
		  if (prevScrollpos > currentScrollPos) {
		    document.getElementById("navbar").style.top = "0";
		  } else {
		    document.getElementById("navbar").style.top = "-90px";
		  }
		  prevScrollpos = currentScrollPos;
		}



// tab one - w3school
function openTabone(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tabone");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" tab-active-color", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " tab-active-color";
}

// tab two
function openTabtwo(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tabtwo");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink-two");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" tab-active-color", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " tab-active-color";
}



// video visiblity - https://cdnjs.com/libraries/vissense/tutorials/autoplay-video
var myVideo = document.getElementById('myVideo');

VisSense.VisMon.Builder(VisSense(myVideo))
.on('fullyvisible', function() {
    myVideo.play();
})
.on('hidden', function() {
    myVideo.pause();
})
.build()
.start();




// smooth scrool to anchor




