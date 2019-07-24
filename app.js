var array = ["penguin", "monkey", "cat", "lion", "dog", "horse", "hamster"];
var click = 0;

LoadButtons();

$(document).on("click", ".animal-btn", function () {
    var pet = $(this).val();
    giphySearch(pet)
});

// This .on("click") function will trigger the AJAX Call
$("#find-animal").on("click", function (event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a Tform when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    var animal = $("#animal-input").val();
    // $("#animal-input").empty();
    if (animal.length < 2) {
        alert("Your string should be longer!:)");
    } else if (array.includes(animal)) {
        alert("This item is already in the list!:)")
    } else {
        array.push(animal)
        giphySearch(animal);
        LoadButtons();
    }
    
    // reset this form to an empty one
    document.getElementById('animal-input').value = null;

});

function LoadButtons() {
    $("#buttons").html("")

    for (var i = 0; i < array.length; i++) {
        var button = $("<button>");
        button.val(array[i]);
        button.text(array[i]);
        button.addClass("animal-btn");


        $("#buttons").append(button).append(" ");
    }
}

function giphySearch(value) {
    $("#images").html("")
    // Here we construct our URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + value + "&limit=10&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data from the AJAX request comes back
        .then(function (response) {
            // Saving the image_original_url property
            // console.log(response);

            for (var i = 0; i < response.data.length; i++) {

                var stillUrl = response.data[i].images.fixed_height_still.url;
                var animateUrl = response.data[i].images.fixed_height.url;
                var ratingUrl = response.data[i].rating.toUpperCase();
                var title = response.data[i].title.toUpperCase();
                title = title.replace("GIF", "");
                var pForTitle = $("<p>");
                pForTitle.addClass("bold");
                pForTitle.append(title);



                var div = $("<div>");
                div.addClass("floatDiv");

                var rating = $("<span>");
                rating.text("Rating: " + ratingUrl);

                var image = $("<img>");
                // Setting the src attribute to stillUrl
                image.attr("src", stillUrl);
                image.attr("state", "still");
                image.attr("src-still", stillUrl);
                image.attr("src-animate", animateUrl);
                image.addClass("image");

                div.append(image);
                div.prepend(rating);
                div.prepend(pForTitle);
                



                $("#images").append(div);
               


            }

            $(".image").on("click", function () {
                var state = $(this).attr("state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("src-animate"));
                    $(this).attr("state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("src-still"));
                    $(this).attr("state", "still");
                }

            });

        });

}



