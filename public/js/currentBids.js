function Subcategory(subcat, objectId){
  var Subcategory = Parse.Object.extend("Subcategory");
     var query = new Parse.Query(Subcategory);
      query.equalTo("objectId", subcat.id);
      query.find().then(function(results) {
        for(var i = 0; i<results.length; i++){
          var subcategory = results[i].get("name");
          $("#section" + objectId + " ").prepend(subcategory);
        }
      });
}

function headerBuilder(){
  var human = Parse.User.current();
  var Job = Parse.Object.extend("Job");
     var query = new Parse.Query(Job);
      query.equalTo("customer", human);
      query.equalTo("status", "bidon");
      query.find().then(function(results) {
        for(var i = 0; i<results.length; i++){
          var description = results[i].get("description"),
          job = result[i],
          objectId = results[i].id,
          subcat = results[i].get("subcategory"),
          ellipsis = "...",
          string = description.substring(0,30) + ellipsis;
          //Limits the display of the description

          var div = $("<div id=" + objectId + "></div>")
          .css("padding-top", "10px")
          .css("padding-bottom", "10px")
          .css("padding-left", "5%")
          .css("padding-right", "5%")
          .appendTo("#here");

          var section = $('<h3 id="section' + objectId + '"> | <i>"' + string + '"</i> | </h3>')
          .css("border-bottom", "solid #17B14B")
          .css("box-shadow", "0px 3px 3px rgba(0, 0, 0, 0.2)")
          .css("padding-left", "2%")
          .appendTo("#" + objectId + " ");

          var subcategory = Subcategory(subcat, objectId);
          //Makes this non-time dependent
          return job;
        }//end of for loop
      }).then(function(job){

        var human = Parse.User.current();
        var Bid = Parse.Object.extend("Bid");
        var query = new Parse.Query(Bid);
           query.equalTo("contractor", human);
           query.equalTo("status", "accepted");
           query.count().then(function(results) {
               $("#badge-9").empty();
               $("#badge-9").append(results);
               bidBidon();

        },function(error) {
        console.log("Error: " + error.code + " " + error.message);
      });//end of .then and query
}

$(document).ready(function() {
  headerBuilder();
});//End of doc ready
