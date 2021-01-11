Parse.initialize("tXonU1MhumMT3Fo2yrI96jV0f75JA9EExsSn5jKO", "v35br82tT227BVVLRvHIPZfMbqm1wB6grabvxaMs");

function stickFooter() {
    var h = $(window).height(),
        w = $("#wrapper").offset().top,
        x = $("#lh-footer").offset().top,
        y = $("#lh-footer").height()+50,
        z = $("#wrapper").height();
    console.log(h, x, y, z);
    console.log(h-y);
    if((w+z)<h) {
        $("#lh-footer").css("margin-top", h-y-(w+z));
    }
}

$(window).load(function() {
    stickFooter();
    $().append().bind(function() {
        console.log("thing");
    });
});


function logout(){
  Parse.User.logOut();
  location.reload();
}

// Validate that a text string is an email. Return a boolean.
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

// Collapse an error alert after 2 seconds.
function collapseError() {
  setTimeout(  function() { $("#emailSubmitError").collapse("hide"); }, 2000);
}

function getUrlObject() {
  var urlObject = {};
  var url = window.location.href;
  if(!url.indexOf("?")==-1) {
    return false;
  }
  var urlPieceArray = url.split("?");
  var namedValueArray = urlPieceArray[1].split("&");
  for(var i=0;i<namedValueArray.length;i++) {
    var namedValue = namedValueArray[i].split("=");
    var varName = namedValue[0].replace(/%20/g, ' ');
    var varValue = namedValue[1].replace(/%20/g, ' ');
    urlObject[varName] = varValue;
  }
  return urlObject;
}

//Checks to make sure the DOM has something in the given element
function isEmpty( el ){
//this is part of the doc.ready function that looks for empty elements and their children
     return !$.trim(el.html())
 }

 function checkForEmpty(){
     //Kenyan Added this, if nothing is in lh-content this will add a div
     if (isEmpty($('.lh-content'))) {
         var empty = $("<div class='removable'>You have no current items in this menu...</div>");
         $(".lh-content").append(empty);
     }else if(isEmpty($('.lh-content').children())){
         var empty = $("<div class='removable'>You have no current items in this menu...</div>");
         $(".lh-content").append(empty);
     }
     else{
       $(".removable").remove();
     }
 }

$(document).ready(function() {
  $(".btn").on("focus", function(){
    $(this).blur();
  });

  // Stick the footer to the bottom of the screen.
  //if(($("#wrapper").height()) < window.innerHeight) {
  //  $("#lh-footer").addClass("navbar-fixed-bottom");
  //}


  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init
      appId      : '642577062543413', // Facebook App ID
      status     : false,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : 'v2.4' // point to the latest Facebook Graph API version
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  //checks for empty ".lh-content"
  //checkForEmpty();
});
