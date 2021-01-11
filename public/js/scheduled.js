
function bush(){
  var human = Parse.User.current();
  var Job = Parse.Object.extend("Job");
     var query = new Parse.Query(Job);
      query.equalTo("customer", human);
      query.find().then(function(results) {
         for(var i=0; i< results.length;i++){

           var status = results[i].get("status");
           switch(status) {
              case "accepted"://If a job is waiting on a bid after meg
                  console.log("posted job");
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
                          $("#here").append(content);
                        }
                      });
                  break;
              default:
                console.log("Hit default");
          }//end of switch

          }
        },function(error) {
        console.log("Error: " + error.code + " " + error.message);
      });//end of .then
}

$(document).ready(function() {
  bush();
  //Make the modal for the jobs
  modalDeploy();
});//End of doc ready
