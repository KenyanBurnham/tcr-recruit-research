var photoStackDOM,
  certStackDOM,
  photoStack= [],
  certStack = [],
  certInput,
  photoInput,
  photoAdderHTML,
  photoSpinnerHTML,
  user = Parse.User.current(),
  photoCounter = 0,
  photoFrame = {},
  url,
  id,
  submitPage,
  bio,
  certCount;

function profileInit() {
  photoSpinner(true);

  var Photos = Parse.Object.extend("Photos"),
        query = new Parse.Query(Photos);

  query.equalTo("user", user);
  query.equalTo("type", "portfolio");

  //fetch certifications + bio
  user.fetch().then(function(result) {
    bio.val(result.get("biography"));
    for(var i=0;i<result.get("certifications").length && result.get("certifications").length!=0;i++){
      var cert = result.get("certifications")[i];
      certStack.push(cert);
      certStackDOM.append($("<div class='cert' id='"+certStack.length+"'>"+cert+"</div>")
        .click(function() {
          deleteCert(this.id);
      }));
    }
    certCount.html(certStack.length);
    if(certStack.length==10) {
      certInput.remove();
    }
  });

  //get images
  query.find().then(function(result) {
    for(var i=0;i<result.length && result.length!=0;i++){
      photoStackDOM.prepend($("<div class='photo-frame photo' id="+result[i].id+"></div>").click(function() {
        deletePhoto(this.id);
      }));
      $(".photo").first().css("background-image", "url("+result[i].get('photo').url()+")");
      photoCounter++;
    }
    photoSpinner(false);
    if(photoCounter<5) {
      photoAdder(true);
    }
  });
}

function photoInit(type) {

  photoSpinner(true);
  var Photos = Parse.Object.extend("Photos");
  var query = new Parse.Query(Photos);
  query.equalTo("user", user);
  query.equalTo("type", type);
  query.find().then(function(result) {
    if(result.length==0) {
      photoSpinner(false);
      photoAdder(true);
    } else {
      for(var i=0;i<result.length;i++) {
        photoSpinner(false);
        var object = result[i],
          id = object.id,
          url = object.get("photo").url();
        photoStackDOM.prepend($("<div class='photo-frame photo' id="+id+"></div>")
        .click(function() {
          deletePhoto(this.id);
        }));
        $(".photo").first().css("background-image", "url("+url+")");
        photoCounter++;
      }
      if(result.length<5) {
        photoAdder(true);
      }
    }
  }, function(error) {
    console.log(error);
  });
}

function deletePhoto(objectId) {
  $("#"+objectId).remove();
  var Photos = Parse.Object.extend("Photos"),
    query = new Parse.Query(Photos);
  query.get(objectId).then(function(result) {
    return result.destroy();
  }).then(function() {
    console.log("killed it");
  }, function(error) {
    console.log(error);
  });
  photoAdder(true);
}

function addPhoto(type, context) {
  photoCounter++;
  photoSpinner(true);
  var fileControl = photoInput[0];
  if (fileControl.files.length > 0) {
    var file = fileControl.files[0],
      name = "photo",
      parseFile = new Parse.File(name, file);
      parseFile.save().then(function(result) {
        url = result.url();
        var photo = new Parse.Object("Photos");
        photo.set("photo", parseFile);
        photo.set("type", type);
        photo.set("user", user);
        return photo.save();
      }).then(function(result) {
        photoSpinner(false);
        photoStackDOM.prepend($("<div class='photo-frame photo' id="+result.id+"></div>").click(function() {
          deletePhoto(this.id);
        }));
        $(".photo").first().css("background-image", "url("+url+")");
      }, function(error) {
        photoSpinner(false);
        photoAdder(true);
        console.log(error);
      });
      if(photoCounter>=5) {
        photoAdder(false);
      }
  }
}

function photoAdder(status) {
  switch(status) {
    case true:
      photoInput.prop('disabled', false);
      photoStackDOM.append(photoAdderHTML);
      break;
    case false:
    photoInput.prop('disabled', true);
      $("#photoAdder").remove();
      break;
  }
}

function photoSpinner(status) {
  switch(status) {
    case true:
      photoInput.prop('disabled', true);
      photoStackDOM.prepend(photoSpinnerHTML);
      break;
    case false:
      photoInput.prop('disabled', false);
      $("#photoSpinner").remove();
      break;
  }
}

function addCert(cert) {
  if(certStack.length!=10) {
    certStack.push(cert);
    certStackDOM.append($("<div class='cert' id='"+certStack.length+"'>"+cert+"</div>")
      .click(function() {
        deleteCert(this.id);
      })
    );
    certInput.remove();
    certInput.val("");
    if(certStack.length<10) {
      certForm.append(certInput);
      certInput.focus();
      certCount.html(certStack.length);
    }
  }
}

function deleteCert(certIndex) {
  certStack.splice(certIndex-1, certIndex);
  $("#"+certIndex).remove();
  certForm.append(certInput);
  certCount.html(certStack.length);
  console.log(certStack);
}

function saveProfile() {
  console.log("saving...");
  user.set("certifications", certStack);
  user.set("biography", bio.val());
  user.save().then(function() {
    console.log("done");
  }, function(error) {
    console.log(error);
  });
}

$(document).ready(function() {
  photoStackDOM = $("#photoStack");
  certStackDOM = $("#certStack");
  photoInput = $("#photoInput");
  certInput = $("#certInput");
  certForm = $("#certForm");
  submitPage = $("#pageSubmit");
  bio = $("#bio");
  certCount = $("#certCount");
  photoAdderHTML = $("<div id='photoAdder' class='photo-frame photo-adder'></div>")
    .click(function() {
      photoInput.click();
    });
  photoSpinnerHTML = $("<div id='photoSpinner' class='photo-frame photo-spinner'></div>");
  photoFrame = $("<div class='photo-frame photo'></div>");

  photoInput.change(function() {
    addPhoto("portfolio", this);
  });

  submitPage.click(function(e) {
    e.preventDefault();
    saveProfile();
  });

  certForm.submit(function(e) {
    e.preventDefault();
    addCert(certInput.val());
  });

  profileInit();
});
