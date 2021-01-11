
function pull(){
  var human = Parse.User.current();
  var Job = Parse.Object.extend("Job");
     var query = new Parse.Query(Job);
      query.equalTo("customer", human);
      query.equalTo("status", "awaiting");
      query.find().then(function(results) {
         for(var i=0; i< results.length;i++){

           var objectId = results[i].id,
           jobCity = results[i].get("jobCity"),
           jobState = results[i].get("jobState"),
           jobZip = results[i].get("jobZip"),
           subcategory = results[i].get("subcategory");

           var Subcategory = Parse.Object.extend("Subcategory");
              var subcat = new Parse.Query(Subcategory);
               subcat.equalTo("objectId", subcategory.id);
               subcat.find().then(function(result) {
                  for(var u=0; u< result.length; u++){
                    var sub = result[u].get("name");
                    var content = $("<div id=" + objectId + " class='well give-space job-item' data-toggle='modal' data-target='#jobModal'></div>");
                    content.append(" " + sub + " | " + jobCity + " | " + jobState + " | " + jobZip + " ")
                    .click(function(){
                      var jobItem = this.id;
                      modalJob(jobItem);
                    });
                    $("#poated-jobs").append(content);
                  }
                });
          }
        },function(error) {
        console.log("Error: " + error.code + " " + error.message);
      });//end of .then
}

$(document).ready(function() {
  //Pull the user's information
  pull();
  //Make the modal for the jobs
  modalDeploy();
});
