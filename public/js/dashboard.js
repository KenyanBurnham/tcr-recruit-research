/*
    dashboard.js
    Developed By: Derek Johnston and Kenyan Burnham
    Copyright 2015 J&P Innovations
*/

/*jslint browser: true*/
/*jslint unparam: true*/
/*global $, Parse, sum*/

(function () {
    'use strict';

    var User = Parse.User.current();

    function setActiveRole(role) {
        if (role === "worker") {
            $("#isWorker").addClass("active");
            $("#isCust").removeClass("active");
            $("#lh-worker").show();
            $("#lh-customer").hide();
        } else {
            $("#isCust").addClass("active");
            $("#isWorker").removeClass("active");
            $("#lh-customer").show();
            $("#lh-worker").hide();
        }
    }

    function getNumbersForBadges(badgeIndex) {
        //var User = Parse.User.current(),
        var Job = Parse.Object.extend("Job"),
            Query,
            role = ["customer", "contractor"],
            status = ["completed", "awaiting", "bidon", "accepted"];

        Query = new Parse.Query(Job);
        Query.equalTo(role[Number(badgeIndex >= 4)], User);
        Query.equalTo("status", status[badgeIndex % 4]);
        Query.count({
            success: function (countResult) {
                if (countResult) {
                    $("#badge-" + badgeIndex).empty().append(countResult);
                }
            }
        });
    }


    $(document).ready(function () {

        setActiveRole(User.get("lastRole"));



        //When clicked will toggle menu
        $("#isCust").on("click", function (event) {
            event.preventDefault();
            setActiveRole("customer");
            $("#dashMenu").collapse("hide");
            User.set("lastRole", "customer");
            User.save();

        });

        //When clicked will toggle menu
        $("#isWorker").on("click", function (event) {
            event.preventDefault();
            setActiveRole("worker");
            $("#dashMenu").collapse("hide");
            User.set("lastRole", "worker");
            User.save();
        });

        // Utilize User data to populate the dashboard.
        //buildUserDashboard();
        var i = 0;
        for (i; i < 8; i += 1) {
            getNumbersForBadges(i);
        }

    });

}());
