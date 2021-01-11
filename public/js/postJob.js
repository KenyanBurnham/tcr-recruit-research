
/*
    postJob.js
    Developed By: Kenyan Burnham & Derek Johnston
    Copyright 2015 J&P Innovations, inc.

*/

/*jslint browser: true*/
/*jslint unparam: true*/
/*global $, jQuery, alert, Parse, console, google*/

(function () {
    'use strict';

    /*
        --isValidJobPost--

        Description:
            Validates the user input from the job post form.
        Parameters:
            None
        Returns:
            A Boolean value indicating whether the job post form input
            from the User is valid or not.
    */
    // TODO: This function needs a much more robust validation methodology.
    function isValidJobPost() {
        if (!$("#sel2").val()) {
            console.error("No subcategory selected.");
            $("#descriptionErrorMessage").html("* Please select a category");
            return false;
        }

        if ($("#dasTextArea").val().length === 0) {
            $("#descriptionErrorMessage").html("* Please describe the job");
            return false;
        }

        if ($("#dateBegin").val().length === 0) {
            $("#timeErrorMessage").html("* Please describe when you need the job done");
            return false;
        }

        if ($("#jobAddress").val().length === 0) {
            $("#locationErrorMessage").html("* Please enter the address for the job");
            return false;
        }

        if ($("#jobCity").val().length === 0) {
            $("#locationErrorMessage").html("* Please enter the city for the job");
            return false;
        }

        if ($("#jobZipCode").val().length != 5 || isNaN($("#jobZipCode").val()+1)) {
            $("#locationErrorMessage").html("* Please enter a zipcode for the job");
            return false;
        }

        $("#descriptionErrorMessage").html("");
        $("#timeErrorMessage").html("");
        $("#locationErrorMessage").html("");
        return true;
    }

    /*
        --filterSubcategories--

        Description:
            Utilizes GREP to filter the Subcategory class to include
            only subcategories for the selected category.
        Parameters:
            subcategories: An array of Subcategory Objects
            category: A Category object.
        Returns:
            An array of Subcategory objects.
    */
    function filterSubcategories(subcategories, category) {
        return $.grep(subcategories, function (subcategory) {
            return subcategory.get("category").id === category.id;
        });
    }

    /*
        --createNewJob--

        Description:
            Takes the job information from the User form and generates a new
            job object in the Parse database.
        Parameters:
            None
        Returns:
            None
    */
    function createNewJob() {
        var Job = Parse.Object.extend("Job"),
            Subcategory = Parse.Object.extend("Subcategory"),
            newJob = new Job(),
            Query = new Parse.Query(Subcategory),
            geocoder = new google.maps.Geocoder();

        Query.get($("#sel2").val(), {
            success: function (subcategory) {
                newJob.set("subcategory", subcategory);
            },
            error: function (object, error) {
                console.error("Parse Error Occured: " + error.code);
                console.error(error.message);
            }
        });

        newJob.set("customer", Parse.User.current());
        newJob.set("description", $("#dasTextArea").val());
        newJob.set("jobStAddress", $("#jobAddress").val());
        newJob.set("jobCity", $("#jobCity").val());
        newJob.set("jobState", $("#stateSelect").val());
        newJob.set("jobZip", Number($("#jobZipCode").val()));
        newJob.set("when", $("#whenInput").val());
        newJob.set("status", "awaiting");

        geocoder.geocode(
            {
                'address': $("#jobAddress").val() + " " + $("#jobCity").val() + " " + $("#jobZipCode").val()
            },
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    newJob.set("location", new Parse.GeoPoint(
                        {
                            latitude: results[0].geometry.location.lat(),
                            longitude: results[0].geometry.location.lng()
                        }
                    ));
                } else {
                    console.error("Google Maps Error Occured");
                    // TODO: Handle this error.
                }
            }
        );

        newJob.save(null, {
            success: function (newjob) {
                console.info("successfully saved GEO in new job.");
                window.location.href = "dashboard.html";
            },
            error: function (newJob, error) {
                console.error("An error occured when saving new job...");
                console.error(error.code + " " + error.message);
            }
        });
    }

    /*
        -buildSubcategorySelectWithChosen--

        Description:
            Retrieves Category and Subcategory objects from the Parse database
            and builds the select element for the post job form. Utilizes
            Chosen to handle the UX for the DOM select element.
        Parameters:
            None
        Returns:
            None
    */
    function buildSubcategorySelectWithChosen() {

        var categoryQueryResults,

        // Get the major categories from parse.
            Category = Parse.Object.extend("Category"),
            Query = new Parse.Query(Category);

        Query.find().then(function (categoryQueryResult) {
            var Subcategory = Parse.Object.extend("Subcategory"),
                newQuery = new Parse.Query(Subcategory);

            categoryQueryResults = categoryQueryResult;
            return newQuery.find();

        }).then(function (subCategoryQueryResult) {

            var i = 0,
                j = 0,
                filteredSubcategories = [],
                pHTML = "";

            for (i; i < categoryQueryResults.length; i = i + 1) {
                pHTML += "<optgroup label='" + categoryQueryResults[i].get("name") + "'>";
                filteredSubcategories = filterSubcategories(subCategoryQueryResult, categoryQueryResults[i]);

                for (j = 0; j < filteredSubcategories.length; j = j + 1) {
                    pHTML += "<option value='" + filteredSubcategories[j].id + "'>" + filteredSubcategories[j].get("name") + "</option>";
                }
                pHTML += "</optgroup>";
            }

            $('#sel2').append(pHTML);
            $(".chosen-select").chosen({
                search_contains: true,
                display_disabled_options: false,
                width: "100%",
                no_results_text: "Oops, nothing found!"
            });
        });
    }

    $(document).ready(function () {

        // Build the subcategory select element
        buildSubcategorySelectWithChosen();

        //Submission for form
        $("#jobForm").submit(function (event) {
            event.preventDefault();
            if (isValidJobPost()) {
                //createNewJob();
            }
        });

        $("#jobForm").change(function (event) {
            event.preventDefault();
            $("#descriptionErrorMessage").html("");
            $("#timeErrorMessage").html("");
            $("#locationErrorMessage").html("");
        });

        //Date Jquery Function
        $("#sameDay").click(function () {
            if ($(this).is(':checked')) {
                $("#dateEnd").val("");
                $("#dateEnd").hide();
            } else {
                $("#dateEnd").show();
            }
        });
    });

}());
