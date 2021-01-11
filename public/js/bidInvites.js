
/*
    bidInvites.js
    Copyright 2015 J&P Innovations
*/

/*jslint browser: true*/
/*global $, stickFooter, Parse*/

(function () {
    'use strict';

    //requires at least the objectId as the element id,
    // subcategory.name, fName and lName can be appended later of during
    function construct(subcat, fName, lName, url) {
        var subcatText = "<strong>" + subcat + "</strong> ",
            nameText = "<strong>" + fName + " " + lName.substr(0, 1) + ".",
            listItem = $("<div></div>")
                .attr("title", "This is a job you can bid on! Click on the job to view the info.")
                .addClass("well give-space nav-tabs list-group-item lh-shadow-down lh-text lh-super")
                .css("margin", "5px, 0px, 5px, 0px")
                .click(function () {
                    window.location.href = url;
                })
                .appendTo("#here")
                .append(subcatText, " for ", nameText);
        stickFooter();
    }//End of construct()


    //get Bids
    function getBid() {
        var Bid = Parse.Object.extend("Bid"),
            BidQuery = new Parse.Query(Bid);
        BidQuery.equalTo("contractor", Parse.User.current());
        BidQuery.include("job");
        return BidQuery.find();
    }

    //get Jobs
    function getJob(jobPointers) {
        var Job = Parse.Object.extend("Job"),
            JobQuery = new Parse.Query(Job),
            filter = $.map(jobPointers, function (i) {
                return i.id;
            });
        JobQuery.include("subcategory");
        JobQuery.include("customer");

        JobQuery.containedIn("objectId", filter);
        return JobQuery.find();
    }

    var info = [];
    getBid()
        .then(function (bids) {
            $.map(bids, function (i) {
                info[i.get("job").id] = i.id;
            });
            var jobPointers = $.map(bids, function (i) {
                return i.get("job");
            });
            return getJob(jobPointers);
        })
        .then(function (jobs) {
            $(document).ready(function () {
                var i = 0,
                    url;
                for (i; i < jobs.length; i += 1) {
                    url = "bidInvitesView.html?jobId=" + jobs[i].id
                        + "&bidId=" + info[jobs[i].id]
                        + "&userId=" + jobs[i].get("customer").id
                        + "&subCat=" + jobs[i].get("subcategory").id;
                    construct(
                        jobs[i].get("subcategory").get("name"),
                        jobs[i].get("customer").get("firstName"),
                        jobs[i].get("customer").get("lastName"),
                        url
                    );
                }
            });
        });

}());
