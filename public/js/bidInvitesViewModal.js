
//This will be the modal that pops up when someone clicks on a job-item
function modalDeploy(background){

    //Empty everything before appending new stuff
    $("#modalHeader").empty();
    //Same for background for posterities sake
    $("#modalBody").empty();

    var modalHeaderDynamic = $("<h4 class='modal-title'>Job Pictures</h4>");
    $("#modalHeader").append(modalHeaderDynamic);
    $("#modalBody")
    .css("background-size", "contain")
    .css("background-repeat", "no-repeat")
    .css("background-position", "center")
    .css('background-image', background);
}//End of modalDeploy()

//This builds the static parts of the modal
function modalFormWork(){

    var modalContainer = $("<div id='modalMain' ></div>"),
        modalFade = $("<div class='modal fade' id='jobModal' role='dialog'></div>"),
        modalDialog = $("<div id='modalDialog' class='modal-dialog'></div>")
        .css("height", "95%")
        .css("width", "95%"),
        modalContent = $("<div id='modalContent' class='modal-content'></div>")
        .css("height", "95%")
        .css("width", "95%"),
        modalHeader = $("<div id='modalHeader' class='modal-header'></div>"),
        modalBody = $("<div id='modalBody' class='modal-body'></div>")
        .css("height", "75%")
        .css("width", "95%"),
        modalFooter = $("<div id='modalFooter' class='modal-footer'></div>"),
        modalHeaderStatic = $("<button type='button' class='close' data-dismiss='modal'>&times;</button>"),
        modalFooterStatic = $("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");

    //Step One add container
    $("#modalBuild").append(modalContainer);
    //Step 2 add modal fade into container
    $("#modalMain").append(modalFade);
    //Step 3 add modal dialog into modal-fade
    $("#jobModal").append(modalDialog);
    //Step 4 add modal content to modal dialog
    $("#modalDialog").append(modalContent);
    //Step 4 append modal header to modal content
    $("#modalContent").append(modalHeader);
    //Step 5 append modal body to modal content
    $("#modalContent").append(modalBody)
    //Step 6 append modal footer to modal content
    $("#modalContent").append(modalFooter);
    //Step 7 append modal header content to modal Header
    $("#modalHeader").append(modalHeaderStatic);
    //Step 8 append modal footer content to modal footer
    $("#modalFooter").append(modalFooterStatic);
}//end of modalFormWork
