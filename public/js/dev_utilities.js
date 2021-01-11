function generateJobs(num) {
  for(var k=0;k<num;k++){
    var Job = Parse.Object.extend("Job"),
      createJob = new Job();

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }



    createJob.set("customer", {__type: "Pointer", className: "_User", objectId: Parse.User.current().id});
    createJob.set("subcategory", {__type: "Pointer", className: "Subcategory", objectId: "cj1gVpkP8Q"});
    createJob.set("jobName", text);
    createJob.set("description", text);
    createJob.set("jobPrice", 12);
    createJob.set("jobStAddress", text);
    createJob.set("jobCity", text);
    createJob.set("jobState", text);
    createJob.set("jobZip", 12);
    createJob.set("endDate", text);
    createJob.set("beginDate", text);
    createJob.set("estHoursToWork", 12);
    createJob.save()
    .then(function() {
      console.log("that's a lot!");
    }, function(error) {
      console.log(error);
    });
  }
}
