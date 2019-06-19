var topics = [
  "spiderman",
  "batman",
  "superman",
  "wonder woman",
  "rocket raccoon"
];

//function that empties existing buttons and then creates a button for every item in the topics array

var renderButtons = function() {
  $("#button-container").empty();
  for (i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.text(topics[i]);
    newButton.addClass("hero-button btn btn-danger");
    newButton.attr("data-hero", topics[i]);
    $("#button-container").append(newButton);
  }
};

renderButtons();

//on document load, if user clicks the add hero button, script takes input field value and adds it to the topics array,
//re-renders buttons, and empties input field
$(document).ready(function() {
  $("#add-hero").on("click", function(e) {
    e.preventDefault();
    topics.push(
      $("#input-hero")
        .val()
        .trim()
    );
    renderButtons();
    $("#input-hero").val("");
  });

  //when hero buttons are clicked, makes ajax call
  $(document).on("click", ".hero-button", function() {
    $("#gifs-appear-here").empty();
    var hero = $(this).attr("data-hero");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      hero +
      "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"

      //then loops through the response object to pull out the needed info and write to the page
    }).then(function(response) {
      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var heroDiv = $("<div>");
        var p = $("<p>");
        var heroRating = p.text("Rating: " + results[i].rating);
        var heroImage = $("<img>");
        //attaches still and animated versions of the images as attributes for later pause functionality
        heroImage.attr({
          src: results[i].images.fixed_height_still.url,
          "data-still": results[i].images.fixed_height_still.url,
          "data-animate": results[i].images.fixed_height.url,
          "data-state": "still"
        });
        heroImage.addClass("gif");
        heroDiv.addClass("result-items");
        heroDiv.append(heroRating);
        heroDiv.append(heroImage);
        $("#gifs-appear-here").prepend(heroDiv);
      }
    });
  });

  //when images are clicked on, toggles between still image url and animated image url for the image src
  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      var dataAnimateUrl = $(this).attr("data-animate");
      $(this).attr("src", dataAnimateUrl);
      $(this).attr("data-state", "animate");
    } else if (state === "animate") {
      var dataStillUrl = $(this).attr("data-still");
      $(this).attr("src", dataStillUrl);
      $(this).attr("data-state", "still");
    }
  });
});
