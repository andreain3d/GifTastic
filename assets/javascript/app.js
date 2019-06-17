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
    // YOUR CODE GOES HERE
    e.preventDefault();
    topics.push($("#input-animal").val());
    console.log(topics);
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
      // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
      // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

      console.log(response);

      // Step 2: since the image information is inside of the data key,
      // make a variable named results and set it equal to response.data

      // =============== put step 2 in between these dashes ==================
      var results = response.data;
      // ========================

      for (var i = 0; i < results.length; i++) {
        // Step 3: uncomment the for loop above and the closing curly bracket below.
        // Make a div with jQuery and store it in a variable named animalDiv.
        // Make a paragraph tag with jQuery and store it in a variable named p.
        // Set the inner text of the paragraph to the rating of the image in results[i].
        // Make an image tag with jQuery and store it in a variable named animalImage.
        // Set the image's src to results[i]'s fixed_height.url.
        // Append the p variable to the animalDiv variable.
        // Append the animalImage variable to the animalDiv variable.
        // Prepend the animalDiv variable to the element with an id of gifs-appear-here.

        // ============= put step 3 in between these dashes ======================

        var animalDiv = $("<div>");
        var p = $("<p>");
        var animalRating = p.text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalDiv.addClass("result-items");
        animalDiv.append(animalRating);
        animalDiv.append(animalImage);
        $("#gifs-appear-here").prepend(animalDiv);
      }
    });
  });
});
