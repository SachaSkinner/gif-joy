var array = ["cat", "dog", "horse"];

LoadButtons();

$(document).on("click", ".animal-btn", function(){
    var pet = $(this).val();
    GiphySearch(pet)
})

 // This .on("click") function will trigger the AJAX Call
 $("#find-animal").on("click", function (event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    var animal = $("#animal-input").val();

    array.push(animal)
    GiphySearch(animal);
    LoadButtons();
});

function LoadButtons(){
    $("#buttons").html("")
    
    for (var i = 0; i < array.length; i++) {
        var button = $("<button>");
        button.val(array[i]);
        button.text(array[i]);
        button.addClass("animal-btn")


        $("#buttons").append(button).append(" ");
    }  
}
 
function GiphySearch(value){
    $("#images").html("")
    // Here we construct our URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ value +"&limit=10&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data from the AJAX request comes back
        .then(function (response) {
            console.log(response);
            // Saving the image_original_url property

            for(var i = 0; i < response.data.length; i++){

                var imageUrl = response.data[i].images.fixed_height_small_still.url;
    
                // Creating and storing an image tag
                var catImage = $("<img>");
    
                // Setting the catImage src attribute to imageUrl
                catImage.attr("src", imageUrl);
                //catImage.attr("alt", "cat image");
    
                // Prepending the catImage to the images div
                $("#images").prepend(catImage);
            }
        });
    // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
    // and display it in the div with an id of movie-view

    // ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.

    //
}
 
 
