// JavaScript function that wraps everything
$(document).ready(function() {

    // Get links for playing music
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "http://www.istpd.com/assets/captainplanet24.mp3");        

    // theme button
    $(".theme-button").on("click", function() {
        audioElement.play();
    })

    $(".pause-button").on("click", function() {
        audioElement.pause();
    });
    
    // Establish a target number
    var targetNumber = Math.floor(Math.random() * 80) + 20;

    // Set the number-to-gess header to match the targetNumber
    // This allow us to change the HTML to match the value in the javascript
    $("#number-to-guess").text(targetNumber);

    

    // Here we select the numbers in numberOptions to start
    // We set this number at the start of the game
    var numberOptions = [10, 5, 3, 7];

    var captainValue = 0;

    var captainArray = ['http://www.istpd.com/assets/images/one.gif', 'http://www.istpd.com/assets/images/two.gif', 'http://www.istpd.com/assets/images/three.gif', 'http://www.istpd.com/assets/images/four.gif'];

        for(var i = 0; i < captainArray.length; i++){
        var captainImg = $("<img>"); // Make a new image element
        captainImg.attr("src", captainArray[i]); // Make the src point to one of the addresses
        captainImg.attr('class', 'cap-images');
        captainImg.attr('height', '89px');
        captainImg.attr('data-captainvalue', Math.floor(Math.random() * 12) + 2) // Assign a data value to a random number you can extract when clicked that won't be 1
        $('#targetDiv').append(captainImg); //append each image to a Div in your HTML
        }
    
        var counter = 0;
        var yourWins = 0;
        var yourLosses = 0;

    $(document).on("click", ".cap-images", function(event){
    

        // Determining the captain's value requires us to extract the value from the data attribute.
        // Using the $(this) keyword specifies that we should be extracting the captain value of the clicked captain.
        // Using the .attr("data-captainvalue") allows us to grab the value out of the "data-captainvalue" attribute.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

        

        var captainValue = ($(this).attr("data-captainvalue"));
        captainValue = parseInt(captainValue);
        // We then add the captainValue to the user's "counter" which is a global variable.
        // Every click, from every captain adds to the global counter.
        // Each time user clicks a Captain the counter goes up by 1
        
        counter += captainValue;
        // console.log(captainValue)

        // Output the resulting score of combined clicks
        $("#your-score").html(counter);
        // Output the value of the last click
        $("#your-guess").html(captainValue);

        // Here we created some logic to "check" if the click counter matches the targetNumber.
        // Remember, this click event will be triggered with each click.
        // With each click the counter will increase by 10 and be re-evaluated against target.
        if (counter === targetNumber) {

            // If numbers match we tell the user they won!
            yourWins++;
            $("#your-wins").html(yourWins);
            resetGame();
        }
        // Added this else if statement to tell the user they lost in the event their counter goes over the target guess
        else if (counter >= targetNumber) {
            yourLosses++;
            $("#your-losses").html(yourLosses);
            resetGame();
        }

        function resetGame() {
            counter = 0;
            targetNumber = Math.floor(Math.random() * 50);
        }

    });


});

