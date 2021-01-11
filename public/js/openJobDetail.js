Stripe.setPublishableKey('pk_live_DSpIWESeCGowRxBNWfrA16OS');

function stripeResponseHandler(status, response) {
  if(response.error) {
    console.error("An error occured in stripe: " + response.error.message);
  } else {
    console.log("The credit card token was created successfully...");
    console.log("Executing Parse Cloud Code 'ChargeOnHire'...");
    Parse.Cloud.run("ChargeOnHire",
     {
       card: response.id,
       amount: 5.00,
       currency: "usd"
     },
     {
      success: function(response) {
          console.log("Credit Card Charge made successfully.")
      },
      error: function (error) {
        console.error("An error occured while making the charge...");
        console.error("Error: " + error.message);
      }
    });
  }
}

function getCreditCardInfo(user) {

  var CreditCard = Parse.Object.extend("CreditCard"),
      query = new Parse.Query(CreditCard);

  query.equalTo("owner", user);
  query.find({
    success: function(results) {
      console.log("Successfully found " + results.length + " credit card(s) for this user...");
      console.log("Generating a Stripe token for this credit card...");

      console.log("Number: " + results[0].get("number"));
      console.log("expirationMonth: " + results[0].get("expirationMonth"))
      console.log("expirationYear: " + results[0].get("expirationYear"));
      console.log("CVC: " + results[0].get("securityCode"));

      Stripe.card.createToken({
        number: results[0].get("number"),
        cvc: results[0].get("securityCode"),
        exp_month: results[0].get("expirationMonth"),
        exp_year: results[0].get("expirationYear")
      }, stripeResponseHandler);
    }
  });

}

$(document).ready(function () {
  // Handle a selection on the hire button.
  $("#hireButton").on("click", function () {
    console.log("Hire Button Clicked...");
    $("#hireConfirmationModal").modal("show");
  });

  $("#hireConfirmationButton").on("click", function () {
    console.log("Hire Confirmed.");

    // Log In the test user.
    Parse.User.logIn("derek@jpinn.io", "eW6Sgxyx", {
      success: function(user) {
        console.log("Test User logIn successful...");
        getCreditCardInfo(user);
      },
      error: function(user, error){
        console.error("An error logging in the test user occured:");
        console.error("Code: " + error.code + " Error: " + error.message);

      }
    });
  });
});
