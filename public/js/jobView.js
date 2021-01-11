
//This will be the modal that pops up when someone clicks on a job-item class
function modalDeploy(){
    var Job = Parse.Object.extend("Job");
    var query = new Parse.Query(Job);
      //query.equalTo("objectId", jobItem);
      query.find().then(function(results) {
         for(var i=0; i< results.length;i++){
           //console.log(results[i].id);
         }
       }).then(function(){
         //Step One add container
         var modalContainer = $("<div id='modalMain' ></div>");
         $(".lh-content").append(modalContainer);
       }).then(function(){
         //Step 2 add modal fade into container
         var modalFade = $("<div class='modal fade' id='jobModal' role='dialog'></div>");
         $("#modalMain").append(modalFade);
       }).then(function(){
         //Step 3 add modal dialog into modal-fade
         var modalDialog = $("<div id='modalDialog' class='modal-dialog'></div>");
         $("#jobModal").append(modalDialog);
       }).then(function(){
         //Step 4 add modal content to modal dialog
         var modalContent = $("<div id='modalContent' class='modal-content'></div>");
         $("#modalDialog").append(modalContent);
       }).then(function(){
         //Step 4 append modal header to modal content
         var modalHeader = $("<div id='modalHeader' class='modal-header'></div>");
         $("#modalContent").append(modalHeader);
       }).then(function(){
         //Step 5 append modal body to modal content
         var modalBody = $("<div id='modalBody' class='modal-body'></div>");
         $("#modalContent").append(modalBody)
       }).then(function(){
         //Step 6 append modal footer to modal content
         var modalFooter = $("<div id='modalFooter' class='modal-footer'></div>");
         $("#modalContent").append(modalFooter);
       },function(){
         console.log("ERRORS In modalDeploy()");
       });
}//End of modalDeploy()

//This puts the dynamic and static content in the modal
function modalJob(jobItem){
var Job = Parse.Object.extend("Job");
var query = new Parse.Query(Job);
  query.equalTo("objectId", jobItem);
  query.find().then(function(results) {
     for(var i=0; i< results.length;i++){
       //Have to do this so I can make the promise chain
       return jobItem;
     }
  }).then(function(jobItem){
      //Step 7 append modal header content to modal Header
      var modalHeaderStatic = $("<button type='button' class='close' data-dismiss='modal'>&times;</button>");
      $("#modalHeader").append(modalHeaderStatic);
      return jobItem;
  }).then(function(jobItem){
      //Appends in two steps, the stuff that's constant, and the stuff that's programatic
      var modalHeaderDynamic = $("<h4 class='modal-title'></h4>");
      $("#modalHeader").append(modalHeaderDynamic);
      return jobItem;
  }).then(function(jobItem){
      //Step 8 append modal body content to modal body
      //var modalBodyStatic = $("");
      var item1 = $("<p id='description'></p><br>"),
      item2 = $("<div id='jobStAddress'></div><div id='jobCity'></div><div id='jobState'></div><div id='jobZip'></div><br>  ");

      $("#modalBody").append(item1)
      .append(item2);

      return  jobItem;
  }).then(function(jobItem){
      //Step 9 append modal footer content to modal footer
      var modalFooterStatic = $("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
      //var modalFooterDynamic = $("");
      $("#modalFooter").append(modalFooterStatic);
      var Job = Parse.Object.extend("Job");
      var query = new Parse.Query(Job);
        query.equalTo("objectId", jobItem);
        query.find().then(function(results) {
          for(var i=0; i< results.length;i++){
            var subcategory = results[i].get("subcategory"),
            description = results[i].get("description"),
            jobStAddress = results[i].get("jobStAddress"),
            jobState = results[i].get("jobState"),
            jobCity = results[i].get("jobCity"),
            jobZip = results[i].get("jobZip");
            var Subcategory = Parse.Object.extend("Subcategory");
               var subcat = new Parse.Query(Subcategory);
                subcat.equalTo("objectId", subcategory.id);
                subcat.find().then(function(result) {
                   for(var u=0; u< result.length; u++){
                     var sub = result[u].get("name");
                     console.log(results[u]);
                     $(".modal-title").append(sub);
                     $("#description").append(description);
                     $("#jobStAddress").append(jobStAddress);
                     $("#jobState").append(jobState);
                     $("#jobCity").append(jobCity);
                     $("#jobZip").append(jobZip);
                   }
                 });
          }//for loop
        });
  },function(){
      console.log("ERROR in modalJob();");
  });
 }//End of modal

//This is so that it doesn't double up
 $(document).on('hide.bs.modal','#jobModal', function () {
    console.log("Mark Watney Lives!");
    location.reload();
  //Do stuff here
 });
