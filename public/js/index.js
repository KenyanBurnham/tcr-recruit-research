// index.js
// Developed By: Derek Johnston
// Copyright 2015 J&P Innovations

/*jslint browser: true*/
/*jslint unparam: true*/
/*global $, jQuery, alert, Parse, console, isEmail*/


(function () {
    'use strict';
    // Check for a current parse user.
    var currentUser = Parse.User.current();
    if (currentUser) {
        // If there is a user, link immediately to the dashboard.
        window.location.href = "dashboard.html";
    }

    // Execute the following once the DOM finishes loading.
    $(document).ready(function () {
        $("#fbLoginBtn").on("click", function () {
            // Execute the base code for a fb login
            // NOTE: The fb.init function must have excuted. It is in js/utilities.js
            Parse.FacebookUtils.logIn("email", {
                success: function (user) {
                    if (!user.existed()) {
                        // Since this user is new, indicate this in Parse.
                        // This will send them through the new user flow when
                        // they reach the dashboard.
                        // TODO: Get the user info from Facebook.
                        user.set("isNew", true);
                        user.save();
                    }
                    window.location.href = "dashboard.html";
                },
                error: function (user, error) {
                    console.error("An error logging in with FB occured.");
                    console.error("Error Code " + error.code + ": " + error.message);
                    // Something went wrong with the FB login. Go ahead and reload the page.
                    // NOTE: We should figure out something better to do here.
                    window.location.href = "index.html";
                }
            });
        });

        $("#loginForm").on("submit", function (event) {
            event.preventDefault();
            // Get the username and password from the form.
            var username = $("#emailLoginInput").val(),
                password = $("#passwordLoginInput").val();

            // Log the user in via parse.
            Parse.User.logIn(username, password, {
                success: function (user) {
                    // Send the user to their dashboard.
                    window.location.href = "dashboard.html";
                },
                error: function (user, error) {
                    // Show the error alert to the user.
                    $("#invalidLogInAlert").collapse("show");
                    // Set a timeout to remove the alert after 3 seconds.
                    setTimeout(function () {
                        $("#invalidLogInAlert").collapse("hide");
                    }, 3000);
                }
            });
        });

        $("#fbSignUpBtn").on("click", function () {
            Parse.FacebookUtils.logIn("email", {
                success: function (user) {
                    if (!user.existed()) {
                        // TODO: Get the user info from Facebook.
                        user.set("isNew", true);
                        user.save();
                    }
                    window.location.href = "dashboard.html";
                },
                error: function (user, error) {
                    window.location.href = "index.html";
                }
            });
        });

        $("#signUpForm").on("submit", function (event) {
            event.preventDefault();

            // Get the form data.
            var email = $("#emailSignUpInput").val(),
                password = $("#passwordSignUpInput").val(),
                confirm = $("#passwordConfirmInput").val(),
                // This is the user variable that will be created.
                user;

            // NOTE: Validate the input form
            if (!isEmail(email)) {
                // If the email address is invalid.
                $("#signUpErrorMessage").html("Invalid Email Address");
                $("#signUpErrorAlert").collapse("show");
                setTimeout(function () {
                    $("#signUpErrorAlert").collapse("hide");
                }, 3000);
            } else if (password !== confirm) {
                // If the password and confirm password do not match.
                $("#signUpErrorMessage").html("Passwords do not match");
                $("#signUpErrorAlert").collapse("show");
                setTimeout(function () {
                    $("#signUpErrorAlert").collapse("hide");
                }, 3000);
            } else {
                // If the form validates, generate the new user.
                user = new Parse.User();


                user.set("username", $("#emailSignUpInput").val());
                user.set("password", $("#passwordSignUpInput").val());
                user.set("email", $("#emailSignUpInput").val());

                user.signUp(null, {
                    success: function (user) {
                        user.set("isNew", true);
                        user.save();
                        window.location.href = "dashboard.html";
                    },
                    error: function (user, error) {
                        $("#signUpErrorMessage").html("Oops! Something went wrong. Give it another try!");
                        $("#signUpErrorAlert").collapse("show");
                        setTimeout(function () {
                            $("#signUpErrorAlert").collapse("hide");
                        }, 3000);
                    }
                });
            }
        });

        // TODO: Handle a question/comment submission.


    });

}());
