
/*
    bidModal.js
    Developed By: Kenyan Burnham
    Copyright 2015 J&P Innovations
*/

/*jslint browser: true*/
/*global $, Parse*/

(function () {
    'use strict';

    function bidFormSubmit() {
        var Per = $("#per").val(),
        //Extend Bid
            Bid = Parse.Object.extend("Bid"),
            bid = new Bid(),

        //Assign bid variables
            bidWhat = $("#bidWhat").val(),//what desc
            bidWhen = $("#bidWhen").val(),//when desc
            bidWhenTime = $("#bidWhenTime").val(),
            bidWhere = $("#bidWhere").val(),//where desc
            bidWhereSt = $("#bidWhereSt").val(),
            bidWhereCity = $("#bidWhereCity").val(),
            bidWhereZip = $("#bidWhereZip").val(),
            bidHowMuch = $("#bidHowMuch").val(),
            bidHowMuchExact = Number($("#bidHowMuchExact").val()),
            bidEstimatedHours = $("bidEstimatedHours").val(),
            bidAddit = $("#bidAddit").val();

        if (Per === "Hour") {
            Per = true;
        } else {
            Per = false;
        }

    //Set bid variable values
        bid.set("bidWhat", bidWhat);
        bid.set("bidWhen", bidWhen);//comment
        bid.set("bidTimeOfDay", bidWhenTime);
        bid.set("bidEstimatedHours", bidEstimatedHours);
        bid.set("bidWhere", bidWhere);//comment
        bid.set("bidWhereSt", bidWhereSt);
        bid.set("bidWhereCity", bidWhereCity);
        bid.set("bidWhereZip", bidWhereZip);
        bid.set("bidHowMuch", bidHowMuch);//comment
        bid.set("bidExactPrice", bidHowMuchExact);
        bid.set("bidAdditional", bidAddit);//coment
        bid.set("bidPricePerHour", Per);

        //Save bids
        bid.save();
    }

    $("#bidSubmit").click(function (event) {
        event.preventDefault();
        bidFormSubmit();
    });
    
}());
