function getJob(jobId) {
    var Job = Parse.Object.extend("Job"),
        JobQuery = new Parse.Query(Job);
    return JobQuery.get(jobId);
}

function getBid(bidId) {
    var Bid = Parse.Object.extend("Bid"),
        BidQuery = new Parse.Query(Bid);
    return BidQuery.get(bidId);
}

function getUser(userId) {
    var _User = Parse.Object.extend("_User"),
        _UserQuery = new Parse.Query(_User);
    return _UserQuery.get(userId);
}

function getSubCat(subCatId) {
    var SubCat = Parse.Object.extend("Subcategory"),
        SubCatQuery = new Parse.Query(SubCat);
    return SubCatQuery.get(subCatId);
}

function getPics(jobId) {
    var Photo = Parse.Object.extend("Photo"),
        PhotoQuery = new Parse.Query(Photo);
    PhotoQuery.equalTo("job", {__type:"Pointer", className:"Job", objectId:jobId});
    PhotoQuery.equalTo("type", "job");
    return PhotoQuery.find();
}

function makePhoto(url) {
    var photoFrame = $("<p></p>")
        .addClass("give-space lh-shadow-down")
        .css("border-radius","2px")
        .css("height", "10em")
        .css("width", "10em")
        .css("margin", "15px")
        .css("cursor", "pointer")
        .css("display", "inline-block")
        .css("background-size", "cover")
        .css("background-image",url);
    return photoFrame;
}

//auto-run init function
(function() {
    var url = getUrlObject();
    Promise.all([
        getJob(url.jobId),
        getBid(url.bidId),
        getUser(url.userId),
        getSubCat(url.subCat),
        getPics(url.jobId)
    ]).then(function(results) {
        var job = results[0],
            bid = results[1],
            user = results[2],
            subCat = results[3],
            photo = results[4];
        console.log(job.get("description"));
        console.log(bid.id);
        console.log(user.get("firstName"));
        console.log(subCat.get("name"));
        console.log(job.get("when"));

        modalFormWork();//Create the dom elements needed for the modal

        var fName = user.get("firstName"),
            lName = user.get("lastName"),
            subcategory = subCat.get("name"),
            when = job.get("when"),
            description = job.get("description");

        var name = $("<p>"+ fName + " " + lName + " Needs<p class='display-inline needsText'>" + subcategory +"</p></p>")
            .addClass("lh-text nameText");

        var title = $("<h2></h2>")
            .addClass("titleText")
            .append(name);

        var quotesLeft = $('<img src="images/quoteleft.png">')
            .css("width", "5%")
            .css("height", "5%"),
            quotesRight = $('<img src="images/quoteleft.png">')
            .css("width", "5%")
            .css("height", "5%")
            .css("-webkit-transform", "rotate(180deg)")
            .css("-moz-transform", "rotate(180deg)")
            .css("-ms-transform", "rotate(180deg)")
            .css("-o-transform", "rotate(180deg)")
            .css("transform", "rotate(180deg)")
            .css("float", "right"),
            desc = $("<h4>" + description + "</h4>")
            .css("color", "grey")
            .css("text-align", "center")
            .css("padding", "0px, 15px, 0px, 15px");

        var quoteL = $('<img src="images/quoteleft.png">')
            .css("width", "5%")
            .css("height", "5%"),
            quoteR = $('<img src="images/quoteleft.png">')
            .css("width", "5%")
            .css("height", "5%")
            .css("-webkit-transform", "rotate(180deg)")
            .css("-moz-transform", "rotate(180deg)")
            .css("-ms-transform", "rotate(180deg)")
            .css("-o-transform", "rotate(180deg)")
            .css("transform", "rotate(180deg)")
            .css("float", "right");

        // TODO: This needs some refectoring
        var descriptionTitle = $("<h3>Job Description</h3>")
            .css("font-family", "Slabo 27px, serif")
            .css("color", "#555555"),
            descriptionBox = $("<p></p>")
            .addClass("give-space")
            .css("border-radius","5px")
            .css("display", "inline-block")
            .append(quotesLeft, desc, quotesRight);

        var pictureTitle = $("<h3>Pictures</h3><br/>")
            .css("font-family", "Slabo 27px, serif")
            .css("color", "#555555"),
            pictureBox = $("<p></p>")
            .addClass("give-space")
            .attr("id", "pictureBox")
            .css("border-radius","5px");
            //.append(pictureFrame2, pictureFrame3, pictureFrame4, pictureFrame5);
            for(var i=0;i<photo.length;i++) {
                pictureBox.append(makePhoto("url("+photo[i].get("img").url()+")").click(function() {
                    var background = $(this).css("background-image");
                    modalDeploy(background);
                        $('#jobModal').modal('toggle');
                }));
            }

        var whenTitle =  $("<h3>When</h3>")
            .css("font-family", "Slabo 27px, serif")
            .css("color", "#555555"),
            whenWords = $("<h4>" + when +  "</h4>")
            .css("color", "grey")
            .css("text-align", "center")
            .css("padding", "0px, 15px, 0px, 15px"),
            whenBox = $("<p></p>")
            .addClass("give-space")
            .css("border-radius","5px")
            .css("display", "inline-block")
            .append(quoteL, whenWords, quoteR);

        var line = $("<h2> </h2>")
            .css("border", "solid 0px, 0px, 5px, 0px ")
            .css("border-bottom-style", "dotted")
            .css("border-color", "lightgrey");

        var formGroup = $("<div></div>")
            .addClass("form-group");

        var bidTitle = $("<h3>Bid Amount</h3><br>")
            .css("font-family", "Slabo 27px, serif")
            .css("color", "#555555")
            .appendTo(formGroup);
            bidInput = $("<textarea></textarea><br>")
            .attr("placeholder", "Enter an amount you would like to bid!")
            .attr("cols", "35")
            .attr("rows", "5")
            .css("border-radius", "2px")
            .appendTo(formGroup),
            bidWhen = $("<h3>Availability</h3><br>")
            .css("font-family", "Slabo 27px, serif")
            .css("color", "#555555")
            .appendTo(formGroup),
            bidWhenInput = $("<textarea></textarea><br>")
            .attr("placeholder", "When would you be available to do the job?")
            .attr("cols", "35")
            .attr("rows", "5")
            .css("border-radius", "2px")
            .appendTo(formGroup);

        var box = $("<div></div>")
            .addClass("col-md-8 lh-shadow-down lh-shadow-up")
            .append(title, "<br>", descriptionTitle, "<br>", descriptionBox, "<br>")
            .append(pictureTitle, "<br>", pictureBox)
            .append(whenTitle, "<br>", whenBox)

            .append("<br>", line, "<br>")
            .append(formGroup);

        var viewItem = $("<div></div>")
            .append(box)
            .appendTo("#here");

        $(".display-inline")
            .css("color", "grey")
            .css("opacity", "0.6")
            .css("text-align","right");
    }).then(function(){
        //append picture frame to #picturebox once I pull them
    });
})();
