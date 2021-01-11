
/*
    bidView.js
    Developed By: Kenyan Burhnam
    Copyright 2015 J&P Innovations
*/

/*jslint browser: true*/
/*global $*/

(function () {
    'use strict';

    var inactive = "here",
        active = "safe",
        alert = "danger";

    function view(button) {
        var button_input = button,
            date = "Date",
            bid = "5",
            hired = "bidder's name",
            jobName = "This Job Name",
            element = ($("<li class='list-group-item give-space lh-shadow-down " + button_input + "'>" + jobName + " | " +  date + " | " + hired + " | $" + bid + "</li>"));

        $(".bid-current").append(element);
    }


    $(document).ready(function () {

        $(".btn-active").click(function () {
            view(active);
        });

        $(".btn-inactive").click(function () {
            view(inactive);
        });

        $(".btn-danger").click(function () {
            view(alert);
        });
    });
}());
