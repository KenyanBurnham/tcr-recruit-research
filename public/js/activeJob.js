/*
    activeJob.js
    Developed By: Kenyan Burnham
    Copyright 2015 J&P Innovations, inc.
*/

/*jslint browser: true*/
/*jslint unparam: true*/
/*global $, Parse, console, document*/

(function () {
    "use strict";
/*
    function archiveJob(objectId) {
        var Job = Parse.Object.extend("Job"),
            query = new Parse.Query(Job),
            Archive = Parse.Object.extend("Archive"),
            archive = new Archive(),
            acl = new Parse.ACL();

        query.get(objectId)
            .then(function (result) {
                acl.setPublicWriteAccess(false);
                acl.setPublicReadAccess(false);
                archive.set("record", result.toJSON());
                archive.set("user", result.get("customer"));
                archive.set("type", "job");
                archive.setACL(acl);
                archive.save()
                    .then(function () {
                        console.log("archived");
                    })
                    .then(function () {
                        result.destroy();
                        console.log("deleted");
                    }, function (error) {
                        console.log(error);
                    });
            }, function (error) {
                console.log(error);
            });
    }
*/
    function completeJob(job) {

        var worker = job.get("worker"),
            Balance = Parse.Object.extend("Balance"),
            query = new Parse.Query(Balance);

        query.equalTo("owner", worker);
        query.find({
            success: function (results) {
                console.log("Successfully found " + results.length + " Balance.");
                var value = results[0].get("value");
                console.log("Current balance: $" + value);
                value += job.get("jobPrice") - job.get("jobPrice") * 0.17;
                console.log("New balance: $" + value);
                results[0].set("value", value);
                results[0].save();
            },
            error: function (error) {
                var errorMessage = "An error fetching the balance for " + worker.id +
                          " occured. Code: " + error.code + ", Message: " +
                          error.message;
                console.error(errorMessage);
            }
        });
    }

    $(document).ready(function () {

        var Job = Parse.Object.extend("Job"),
            query = new Parse.Query(Job);

        query.get("8Ohmg0UVUh", {
            success: function (job) {
                console.log("Successfully found a job...");
                $("#jobName").html(job.get("jobName"));
                $("#completeButton").on("click", function (event) {
                    event.preventDefault();
                    completeJob(job);
                });

            },
            error: function (error) {
                console.error("Error fetching job...");
                console.error("Error: " + error.code + ", " + error.message);
            }
        });
    });

}());
