var topics = ["cat", "eagle", "penguin", "quokka", "raccoon"];

var renderButtons = function() {
  $("#button-container").empty();
  for (i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.text(topics[i]);
    newButton.addClass("animal-button btn btn-info");
    newButton.attr("data-animal", topics[i]);
    $("#button-container").append(newButton);
  }
};

renderButtons();

$(document).ready(function() {
  $("#add-animal").on("click", function(e) {
    e.preventDefault();
    topics.push(
      $("#input-animal")
        .val()
        .trim()
    );
    renderButtons();
  });
  $(document).on("click", ".animal-button", function() {
    $("#gifs-appear-here").empty();
    var animal = $(this).attr("data-animal");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animal +
      "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div>");
        var p = $("<p>");
        var animalRating = p.text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalImage.attr({
          src: results[i].images.fixed_height_still.url,
          "data-still": results[i].images.fixed_height_still.url,
          "data-animate": results[i].images.fixed_height.url,
          "data-state": "still"
        });
        animalImage.addClass("gif");
        animalDiv.addClass("result-items");
        animalDiv.append(animalRating);
        animalDiv.append(animalImage);
        $("#gifs-appear-here").prepend(animalDiv);
      }
    });
  });

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
