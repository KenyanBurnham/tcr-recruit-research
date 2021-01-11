
/*
    account.js
    Developed By: Derek Johnston
    Copyright 2015 J&P Innovations
*/

/*jslint browser: true*/
/*global $, Parse*/

(function () {
    'use strict';

    /*
    function setCardStatus(cardString, checkedStatus) {
        $("#" + cardString).checked = checkedStatus;
    }
    */

    function getCreditCardType() {
        var accountNumber = document.getElementById("card_number").value,
            cardReader = {
                "visa": /^4/,
                "mastercard": /^5[1-5]/,
                "amex": /^3[47]/,
                "discover": /^6/
            },
            card,
            imageObject;
        for (card in cardReader) {
            if (cardReader.hasOwnProperty(card)) {
                imageObject = document.getElementById(card);
                imageObject.className = "dimat";
                if (cardReader[card].test(accountNumber)) {
                    //setCardStatus(card, true);
                    imageObject = document.getElementById(card);
                    imageObject.className = "dimit";
                }
            }
        }
    }

    $(document).ready(function () {

        $("#card_number").on("keyup", function () {
            getCreditCardType();
        });

        $("#bankForm").submit(function (e) {
            e.preventDefault();

            var bankAccountNumber = $("#bankAccountForm").val(),
                routingNumber = $("#routingForm").val(),
                BankAccount = Parse.Object.extend("BankAccount"),
                bankAccount = new BankAccount(),
                acl = new Parse.ACL(Parse.User.current());

        //validation

            if (!bankAccountNumber || !routingNumber) {
                return false;
            }

            if (isNaN(bankAccountNumber) || isNaN(routingNumber)) {
                return false;
            }
            if (routingNumber.length !== 9) {
                return false;
            }

            bankAccount.setACL(acl);
            bankAccount.set("owner", Parse.User.current());
            bankAccount.set("accountNumber", Number(bankAccountNumber));
            bankAccount.set("routingNumber", Number(routingNumber));
            bankAccount.save();
        });
    });
}());
