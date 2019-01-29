//onload function...when page loads the buttons will populate...the addButtons function will run
$(document).ready(function() {
  addButtons(topics, "search-button");
  //console.log("test");
})

//button value array
var topics = [
  "salad",
  "tacos",
  "spaghetti",
  "sandwich",
  "beer",
  "ice cream",
  "pizza",
];

//ADD BUTTONS
function addButtons(topics, addClassTo) {
  $("#button-container").empty(); //clears buttons out everytime onload function runs....avoids duplicating buttons that a user adds
  for (var i = 0; i < topics.length; i++) {
    var btn = $("<button>"); //loops through and creates buttons for array values
    btn.addClass(addClassTo); //adds a class to all the buttons
    btn.addClass("btn btn-outline-info");
    btn.attr('data-name', topics[i]); //adds a type to the button that is the name of each item in the array
    btn.text(topics[i]); //adds the name of each item in the array as text to the button
    $("#button-container").append(btn); //adds each button one after the other in the button container div
    //console.log(btn);
  }
}

//API FUNCTION
$(document).on("click", ".search-button", function() {
  $("#query-gif").empty();
  // Grabbing and storing the data-animal property value from the button
  var type = $(this).attr("data-name"); //creates a variable for the data-type attribute (value of each array item) for each button
  //console.log(type);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=qJjN6AsPV74YZ8RnGIMWVuvd0TUxI6OL&limit=9";

  // Performing an AJAX request with the queryURL

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function(response) {
      //console.log(queryURL);


    //  console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) { //loops through the images in the array and grabs information needed and stores that info in variables

        var gifDiv = $("<div class='gifs col-md-4'>"); // creating a div for each gif to live
        var rating = results[i].rating.toUpperCase(); //grabs the rating from each gif

        var p = $("<p>").text("Rating: " + rating); //creates a paragraph tag to hold the rating text
        var animated = results[i].images.fixed_height.url; //grabs the animated version of the gif and stores it in a variable
        var still = results[i].images.fixed_height_still.url; // grabs the still version of the gif and stores it in a variable
        var image = $("<img>"); //creating a variable that will add image tags to the html

        image.attr("src", still); //adding the still image to each image tag as default image
        image.attr("data-still", still); //giving the still version of the image a data type
        image.attr("data-animated", animated); //giving the animated version of the image a data type
        image.attr("data-state", "still"); //gives the image a default data type state of still
        image.addClass("gif-image img-responsive img-thumbnail"); //adding bootsrap portfolio thumbnail and responsiveness
        gifDiv.append(image); //adds the image to the gif div above
        gifDiv.append(p); //adds the ratings to the gif div above
        $("#query-gif").append(gifDiv); //adds the gif, one after the other, into the query-gif div
      }
    })
})

//starts and stops animation for each gif when the user clicks the image
$(document).on('click', '.gif-image', function() {
  var state = $(this).attr('data-state'); //creates a variable for the animation state so it can be changed
  if (state == 'still') { //if the image is still then make it animated on click
    $(this).attr('src', $(this).data('animated'));
    $(this).attr('data-state', 'animated');
  } else { //else make it still on click
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
  }
})

// runs function when submit button is clicked
$("#add-input").on("click", function(event) {
  event.preventDefault(); // event.preventDefault() prevents the form from trying to submit itself....this is because the user can click enter to submit form
  var newUserInput = $("#user-input").val().trim().toLowerCase(); // grabs the user's input
  //checks to see if a user entered anything into the input field...will display error if nothing is in field and enter or submit is pressed
  $(".error").remove();
  if (newUserInput.length < 1) {  //adds an error message if user enters nothing in the input box....keeps user from adding blank boxes
    $('form').append('<p class="error">This field is required</p>');
  } else {
    topics.push(newUserInput); //pushed the user's input to the array so a new button can be added
    $('#user-input').val('');
    addButtons(topics, "search-button"); // runs the addButton function again to clear and add the new set off buttons in the array which will include the user's input
  }
});
