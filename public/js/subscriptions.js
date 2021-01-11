var x;
var subCatArray = [];

function subCategory(name, objectId, position) {
  this.name = name,
  this.objectId = objectId,
  this.position = position,
  this.init = function(context) {

    var raw = $("<tr class='well subs' id=" + position + "><td><h4><span class='glyphicon glyphicon-plus'></span>" +  " "+ name + "</h4></td></tr>");
    raw.click(function() {
      console.log(name);
      window.location.href = "board.html?cat=" + name;
    });

    $(".bl-tbody").append(raw);
  },
  this.hideCat = function() {
    $("#" + position).hide();
  },
  this.showCat = function() {
    $("#" + position).show();
  }
}

$("body").click(function(e) {
    e.preventDefault();
    if(x<30){
      menuToggle(); //toggle menu
    }
    else{}//NOP
});

$(".menu-toggle").click(function(e) {
    e.preventDefault();
    menuToggle(); //toggle menu
});

function menuToggle(){
  $("#wrapper").toggleClass("toggled");
}

function myFunction(e) {
    x = e.clientX;
    //var y = e.clientY;
    //var coor = "Coordinates: (" + x + "," + y + ")";
}

$(document).ready(function() {

  var Subcategory = Parse.Object.extend("Subcategory");
  var query = new Parse.Query(Subcategory);
  query.find()
  .then(function(result){

    for(var i=0;i<result.length;i++){
      var name = result[i].get("name");
      var objectId = result[i].id;
      var subCat = new subCategory(name, objectId, i);
      subCat.init();
      subCatArray.push(subCat);
    }
  }, function(error) {
    console.log(error);
  });

  $("#search-bar").keyup(function() {
    var searchBarVal=$("#search-bar").val();
    var searchBarValLength=searchBarVal.length;
    if(!searchBarVal) {
      $("tr").show();
      return false;
    } else {
      $("tr").hide();
    }

    for(var i=0;i<subCatArray.length;i++) {
      var name = subCatArray[i].name;
      name = name.toLowerCase();
      if(name.indexOf(searchBarVal.toLowerCase())!=-1) {
        subCatArray[i].showCat();
      }
    }
  });
});
