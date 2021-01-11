/*
    profile.js
    Developed By: Kenyan Burnham
    Copyright 2015 J&P Innovations, inc.
*/

/*jslint browser: true*/
/*jslint unparam: true*/
/*global $, Parse, console, google, document*/

// NOTE:  Below is an explaination of the overal functionality of this js file.
/*
Step 1.) Document.ready calls pull(), pull grabs all of the information inside
of the user"s profile that can be changed and displays it in a programatic input
 field as a placeholder.
 Step 2.) pull() then calls bush() upon completion, push saves the information
 from the User information section, the other section is the subcategories section
 Step 3.) Before bush() finishes executing it calls workPreference, then catscatscats() which builds
 the subcategory input field, button, and saves the information using the Parse
  addUnique method.
Step 4.)At the end of catscatscats() it calls domdomdom() to append the current
subcategories the User has to the dom, Also adds the remove functionality.
Step 5.) At the end of domdomdom() it calls cps() and nomenclature(), cps() is
in charge of actually removing the subcategory you would like to remoive from
the parse database, does this by removing the parent. nomenclature() adds the
names associated with the id of the subcategories in the user"s array to the
actual well itself. This functionality was separated due to the complexity of
parse requests already in domdomdom(). Just to make it neater.
Step 6.) After catscatscats() and bush() save theoir information it reloads
 the page to update the display.
*/

(function () {
    "use strict";

    //Turns the user"s address into a set of lat/long coords
    function getLocation(address, range) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ "address": address }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat(),
                    longitude = results[0].geometry.location.lng(),
                    //Create a lat/long with the user address
                    point = new Parse.GeoPoint({latitude: latitude, longitude: longitude}),
                    user = Parse.User.current();

                user.set("location", point);
                user.set("workPreferenceRange", range);
                user.save(null, {
                    success: function (user) {
                        console.log("successfully saved GEO for user");
                    },
                    error: function (user, error) {
                        console.log("An error occured when saving new job...");
                        console.log(error.code + " " + error.message);
                    }
                });//End of save

            } else {//For geocode
                console.log("Didn't work." + results + " " + status);
            }
        });
    }

    function workPreference() {
        //Declare all html elements
        var form = $("<form class='form-group'id='preference'></form>"),
            content1 = $("<br><label class='lead' for='city'>City</label><br><input id='city' required name='city' placeholder='City'></input><br>"),
            content2 = $("<br><label class='lead' for='state'>State</label><br><select id='state' required name='state'></select><br>"),
            content3 = $("<br><label class='lead' for='zip'>Zipcode</label><br><input id='zip' name='zip' required placeholder='Zip'></input><br>"),
            content4 = $("<br><label class='lead' for='range'>Range</label><br><select id='range' required name='range'></select><br>"),
            content5 = $("<br><button type='button' id='save'>Save</button><br>"),
            //content6 = $("<br><br><h5>Current Preference:</h5><br>"),
            //Current option groups will not actually display (except Texas).
            //To use them remove the "<!-- -->" on the ends
            optionGroup1 = $("<!--<option value='AL'>Alabama</option><option value='AK'>Alaska</option><option value='AZ'>Arizona</option><option value='AR'>Arkansas</option>-->"),
            optionGroup2 = $("<!--<option value='CA'>California</option><option value='CO'>Colorado</option><option value='CT'>Connecticut</option><option value='DE'>Delaware</option><option value='DC'>District Of Columbia</option>-->"),
            optionGroup3 = $("<!--<option value='FL'>Florida</option><option value='GA'>Georgia</option><option value='HI'>Hawaii</option><option value='ID'>Idaho</option>-->"),
            optionGroup4 = $("<!--<option value='IL'>Illinois</option><option value='IN'>Indiana</option><option value='IA'>Iowa</option><option value='KS'>Kansas</option><option value='KY'>Kentucky</option>-->"),
            optionGroup5 = $("<!--<option value='LA'>Louisiana</option><option value='ME'>Maine</option><option value='MD'>Maryland</option><option value='MA'>Massachusetts</option><option value='MI'>Michigan</option><option value='MN'>Minnesota</option>-->"),
            optionGroup6 = $("<!--<option value='MS'>Mississippi</option><option value='MO'>Missouri</option><option value='MT'>Montana</option><option value='NE'>Nebraska</option><option value='NV'>Nevada</option>-->"),
            optionGroup7 = $("<!--<option value='NH'>New Hampshire</option><option value='NJ'>New Jersey</option><option value='NM'>New Mexico</option><option value='NY'>New York</option><option value='NC'>North Carolina</option>-->"),
            optionGroup8 = $("<!--<option value='ND'>North Dakota</option><option value='OH'>Ohio</option><option value='OK'>Oklahoma</option><option value='OR'>Oregon</option><option value='PA'>Pennsylvania</option>-->"),
            optionGroup9 = $("<!--<option value='RI'>Rhode Island</option><option value='SC'>South Carolina</option><option value='SD'>South Dakota</option><option value='TN'>Tennessee</option>-->"),
            optionGroup10 = $("<option value='TX'>Texas</option>"),
            optionGroup11 = $("<!--<option value='UT'>Utah</option><option value='VT'>Vermont</option><option value='VA'>Virginia</option><option value='WA'>Washington</option>-->"),
            optionGroup12 = $("<!--<option value='WV'>West Virginia</option><option value='WI'>Wisconsin</option><option value='WY'>Wyoming</option>-->"),
            optionGroup13 = $("<option value='50'>50 miles</option><option value='45'>45 miles</option><option value='40'>40 miles</option><option value='35'>35 miles</option>"),
            optionGroup14 = $("<option value='30'>30 miles</option><option value='25'>25 miles</option><option value='20'>20 miles</option>"),
            optionGroup15 = $("<option value='15'>15 miles</option><option value='10'>10 miles</option><option value='5'> 5 miles</option>");

        //Step 1.) Add a title
        $("#here").append("<br><br><h4>Work Area Preference!</h4>");

        //Step 2.) Append the form
        $("#here").append(form);
        $("#preference").append(content1)
            .append(content2)
            .append(content3)
            .append(content4)
            .append(content5);

        //Step 3.) Append options for content 2
        $("#state").append(optionGroup1)
            .append(optionGroup2)
            .append(optionGroup3)
            .append(optionGroup4)
            .append(optionGroup5)
            .append(optionGroup6)
            .append(optionGroup7)
            .append(optionGroup8)
            .append(optionGroup9)
            .append(optionGroup10)
            .append(optionGroup11)
            .append(optionGroup12);

        $("#range").append(optionGroup13)
            .append(optionGroup14)
            .append(optionGroup15);

        $("#save").on("click", function (event) {
            event.preventDefault();
            console.log("Hello?");
            //creates the address value and calls the geocoder
            var city = $("#city").val(),
                state = $("state").val(),
                zipcode = $("zip").val(),
                range = $("range").val(),
                address = city;

            address += (" " + state);
            address += (" " + zipcode);

            getLocation(address, range);
        });
    }//End of workPreference

    //Removes parent from environment
    function cps(parent) {
        var user = Parse.User.current();
        //removes the subcategory from the array
        user.remove("subcategories", parent);
        user.save(null, {
            success: function (user) {
                console.log("Successfully removed parent.");
            },
            error: function (user, error) {
                console.log("ERROR occurred in cps()..");
            }
        });
    }//end of cps

    //This adds the labels to the subcategory nodes after element is built
    function nomenclature(output) {
        var Subcategory = Parse.Object.extend("Subcategory"),
            query = new Parse.Query(Subcategory);

        query.equalTo("objectId", output);
        query.find().then(function (results) {
            var r,
                name,
                objectId;
            for (r = 0; r < results.length; r += 1) {
                name = results[r].get("name");
                objectId = results[r].id;
                $("#" + objectId + " ").append(name);
            }
        }, function () {
            console.log("ERROR in nomenclature()");
        });
    }//end of nomenclature

    function func0(el) {
        $("#" + el.id).parent().remove();
        cps($(el).parent().attr("id"));//removes paren
    }

    //Appends currently selected subcategories
    function domdomdom() {
        //Gets the current user"s subcategories and displays them
        var User = Parse.Object.extend("User"),
            user = new Parse.Query(User),
            current = Parse.User.current();

        user.equalTo("objectId", current.id);
        user.find().then(function (results) {
            var d, output, e, element;
            for (d = 0; d < results.length; d += 1) {
                output = results[d].get("subcategories");
                //pass the subcategories to the next then
                for (e = 0; e < output.length; e += 1) {
                    element = $("<div id='" + output[e] + "' " + "class='well'><button id='remove" + output[e] + "'" + " class='rem glyphicon glyphicon-remove'></button></div>");
                    $("#here").append(element);
                    $("#remove" + output[e] + " ").on("click", func0(this));
                    nomenclature(output[e]);
                }//End of second for loop
            }
        }).then(function () {
            console.info("domdomdom complete");
        }, function () {
            console.log("ERROR in domdomdom()");
        });
    }//End of domdomdom

    //This shows which subcategories the user uses already and what they are adding
    function catscatscats(subcategories) {

        var form = $("<div id='selopt' class='form-group'><select id='dropdown'></select></div>"),
            button = $("<button id='changeSub'>Submit Changes</button><br><br><h5>Current Subcategories:</h5><br>"),
            Subcategory = Parse.Object.extend("Subcategory"),
            query = new Parse.Query(Subcategory);

        //Put label to the DOM
        $("#here").append($("<br><br><h4>Subcategories</h4><br><h5>Add More:</h5><br>"));
        $("#here").append($(form)).append(button);

        //Query subcategories chosen, and to be chosen

        //To find subcategories to choose from
        query.find().then(function (results) {
            var i, objectId, name, option;
            for (i = 0; i < results.length; i += 1) {
                //Create idividual options for input form
                objectId = results[i].id;
                name = results[i].get("name");
                option = $("<option id='option" + objectId + "'  value='" + objectId + "'>" + name + "</option>");
                $("#dropdown").append(option);
            }
        }).then(function (query) {
            //Add on change event that listens for the value of the selected option
            $("#changeSub").on("click", function () {
                var chosen = $("#dropdown").val(),
                    user = Parse.User.current();

                //Save chosen to subcategories (choices)
                user.addUnique("subcategories", chosen);
                user.save(null, {
                    success: function (user) {
                        console.log("Success changing account information...");
                        //This is so that the new information is displayed as a
                        //confirmation that it has happened
                        window.location.reload();
                    },
                    error: function (user, error) {
                        console.log("An error occured changing account information...");
                    }
                });//End of save
            });
        }, function () {
            console.log("ERROR occured in catscatscats()");
        });//END OF SUBCAT QUERY
        //Calls the visual subcat appending function
        domdomdom();
    }//end of catscatscats

    //This saves the changes the user wants to change on their account
    function bush(fn, ln, un, cpa) {
        var user = Parse.User.current();
        user.set("firstName", fn);
        user.set("lastName", ln);
        user.setUsername(un);
        user.setEmail(un);
        user.setPassword(cpa);
        user.save(null, {
            success: function (user) {
                console.log("Success changing account information...");
                //This is so that the new information is displayed as a confirmation that it has happened
                window.location.reload();
            },
            error: function (user, error) {
                console.log("ERROR occured in bush()");
            }
        });
    }

    function func1() {
        //Get the value of their inputs
        var fn = $("#fn").val(),
            ln = $("#ln").val(),
            un = $("#un").val(),
            pa = $("#pa").val(),
            cpa = $("#cpa").val();

        //Compare passwords to ensure they"re the same
        if (cpa === pa) {
            bush(fn, ln, un, cpa);
        } else {
            console.log("Password does not match.");
        }
    }

    //This pulls the current user information and puts it on the dom as a form
    function pull() {
        var human = Parse.User.current(),
            User = Parse.Object.extend("User"),
            query = new Parse.Query(User);

        query.equalTo("objectId", human.id);
        query.find().then(function (results) {
            var i, username, /*password,*/ firstName, lastName, subcategories,
                userTitle, labelFirstName, inputFirstName,
                labelLastName, inputLastName, labelUserName, inputUserName,
                labelPassword, inputPassword, labelConfirmPassword, inputConfirmPassword,
                button;
            for (i = 0; i < results.length; i += 1) {
                //Get current information to place in placeholder
                username = results[i].get("username");
                //password = results[i].get("password");
                firstName = results[i].get("firstName");
                lastName = results[i].get("lastName");
                subcategories = results[i].get("subcategories");

                //Build inputs dynamically for placeholder
                userTitle = $("<h4>Worker Account Info</h4>");
                labelFirstName = $("<br><label class='lead' for='fname'>First Name:</label><br>");
                inputFirstName = $("<input id='fn' name='fname'placeholder='" + firstName + "''></input><br>");
                labelLastName = $("<label class='lead' for='lname'>Last Name:</label><br>");
                inputLastName = $("<input id='ln' name='lname' placeholder='" + lastName + "'></input><br>");
                labelUserName = $("<label class='lead' for='uname'>Email:</label><br>");
                inputUserName = $("<input id='un' name='uname' placeholder='" + username + "'></input><br>");
                labelPassword = $("<label class='lead' for='pass'>Password <small>(Always required during changes)</small>:</label><br>");
                inputPassword = $("<input id='pa' name='pass' placeholder='password'></input><br>");
                labelConfirmPassword = $("<label class='lead' for='cname'>Confirm Password</label><br>");
                inputConfirmPassword = $("<input id='cpa' name='cpass' placeholder='password'></input><br>");
                button = $("<br><button type='click' id='changeAcct'>Confirm Change</button>");

                //Append them to the DOM as variables
                $("#here").append($("<div id='form' class='form-group'></div>"))
                    .append(userTitle)
                    .append(labelFirstName)
                    .append(inputFirstName)
                    .append(labelLastName)
                    .append(inputLastName)
                    .append(labelUserName)
                    .append(inputUserName)
                    .append(labelPassword)
                    .append(inputPassword)
                    .append(labelConfirmPassword)
                    .append(inputConfirmPassword)
                    .append(button);

                //Creates a work area preference form
                workPreference();
                //Creates subcategory form below
                catscatscats(subcategories);

                $("#changeAcct").click(func1());//end of jquery changAcct

            }//END of for statement
        }, function (error) {
            console.log("Error: " + error.code + " " + error.message);
        });//end of .then and query
    }//End of pull()



    $(document).ready(function () {
        //For debugging: Parse.User.logOut();
        //Pull starts the function calls
        pull();
    });
}());
