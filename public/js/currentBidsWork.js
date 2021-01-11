//This is for a bid a contractor has sent on a job
function pull(){
  //Finds bids that are related to the user
  var human = Parse.User.current();
  var Bid = Parse.Object.extend("Bid");
   var query = new Parse.Query(Bid);
    query.equalTo("contractor", human);
    query.equalTo("status", "bidon");
    query.find().then(function(results) {
       for(var i=0; i< results.length;i++){
         //Pull their job id
         var job = results[i].get("job").id,
         bidAmount = results[i].get("bidAmount");
         console.log(job);

         var content = $("<div id='" + job + "' class='well give-space job-item' data-toggle='modal' data-target='#jobModal'></div>");
         var jobNamePlace = $("<div id='place" + job + "'></div>");
         content.append(jobNamePlace)
         .append("| $" + bidAmount + " | ")
         .click(function(){
           var jobItem = this.id;
           modalJob(jobItem);
           var modalFooter = $("<p>Your Bid: $" + bidAmount + "</p>").css("text-align", "left");
           $("#modalFooter").append(modalFooter);
         });
         $("#here").append(content);
         return job;
       }
     }).then(function(job){
       //Grabs the object Id and searches the job, attaches the jobname to the job id
       var Job = Parse.Object.extend("Job");
        var query = new Parse.Query(Job);
         query.equalTo("objectId", job);
         query.find().then(function(results) {
            for(var i=0; i< results.length;i++){
              var subcategory = results[i].get("subcategory");

              var Subcategory = Parse.Object.extend("Subcategory");
                 var subcat = new Parse.Query(Subcategory);
                  subcat.equalTo("objectId", subcategory.id);
                  subcat.find().then(function(result) {
                     for(var u=0; u< result.length; u++){
                       var sub = result[u].get("name");
                       $("#place" + job + " ").append(sub);
                     }
                   });
            }
          }, function(){
            console.log("ERORR fetching job information");
          });//end of query
     },function(){
       console.log("ERROR in pull()");
     });
}//end of pull()

$(document).ready(function() {
  //Pull the user's information
  pull();
  //Make the modal for the jobs
  modalDeploy();
});
