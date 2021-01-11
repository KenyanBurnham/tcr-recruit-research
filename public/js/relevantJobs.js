//This is for a bid a contractor has sent on a job
function pull(){
  //Finds bids that are related to the user
  var human = Parse.User.current();
  console.log(human);
  var Bid = Parse.Object.extend("Bid");
   var query = new Parse.Query(Bid);
    query.equalTo("contractor", human);
    query.equalTo("status", "awaiting");
    query.find().then(function(results){
       for(var i=0; i< results.length;i++){
         var job = results[i].get("job"),
         jobob = results[i],
         jobId = job.id;

         var content = $("<div id='" + jobId + "' class='well give-space job-item' data-toggle='modal' data-target='#jobModal'></div>"),
         jobNamePlace = $("<div id='place" + jobId + "'></div>");
         content.append(jobNamePlace).on("click", function(){
           modalJob(jobId);
           var modalFooterStuff = $("<button id='button" + jobId + "'>Place Bid</button>").on("click", function(){

             var buttonInput = $("<button id='submit" + jobId + "'>Place Bid</button>").on("click", function(){

               var bidAM = $("#bidAm").val();
               console.log(bidAM);
               /*
               jobob.set("status", "bidon");
               jobob.set("bidAmount", bidAM);
               jobob.save(null, {
                 success: function(jobob) {
                   console.log("Job status is set to 'complete'...");
                   location.reload();
                 },error: function(jobob, error) {
                   console.log("ERROR in job status set");
                 }
               });
               */
             }).css("float", "left");
             var numberInput = $("<input id='bidAm' type='number' placeholder='In USD'></input>").css("float", "left");
             $("#modalFooter").append(buttonInput).append(numberInput);
             $("#button" + jobId + " ").hide();
           });
           modalFooterStuff.css("float", "left");
           $("#modalFooter").append(modalFooterStuff);
         });
         $("#here").append(content);

        return jobId;
     }//end of for loop
   }).then(function(jobId){
     //Grabs the object Id and searches the job, attaches the jobname to the job id
     var Job = Parse.Object.extend("Job");
      var query = new Parse.Query(Job);
       query.equalTo("objectId", jobId);
       query.find().then(function(results) {
          for(var i=0; i< results.length;i++){
            var subcategory = results[i].get("subcategory"),
            jobCity = results[i].get("jobCity"),
            jobState = results[i].get("jobState"),
            jobZip = results[i].get("jobZip");

            var Subcategory = Parse.Object.extend("Subcategory");
               var subcat = new Parse.Query(Subcategory);
                subcat.equalTo("objectId", subcategory.id);
                subcat.find().then(function(result) {
                   for(var u=0; u< result.length; u++){
                     var sub = result[u].get("name");
                     $("#place" + jobId + " ").append(" " + sub + " | " + jobCity + " | " + jobState + " | " + jobZip + " ");

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
