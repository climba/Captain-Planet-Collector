// JavaScript function that wraps everything
$(document).ready(function() {

    // Get links for playing music
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/captainplanet24.mp3");        

    // theme buttons
    // Play button
    $(".theme-button").on("click", function() {
        audioElement.play();
    })
    // Pause button
    $(".pause-button").on("click", function() {
        audioElement.pause();
    });
    
    // Establish a target number that user has to reach each game
    // We set this number at the start of the game
    var targetNumber = Math.floor(Math.random() * 80) + 20;

    // Set the number-to-guess div in the HTML to match the generated targetNumber
    // This allows changes the HTML to match the value in the javascript everytime it is generated
    $("#number-to-guess").text(targetNumber);

    // Here we create an array of images that will be pushed into a dynamically generated HTML div called cap-images
    var captainArray = ['assets/images/one.gif', 'assets/images/two.gif', 'assets/images/three.gif', 'assets/images/four.gif'];
        // We loop throught the array one time for each item in the array
        for(var i = 0; i < captainArray.length; i++){
        // Create new image element
        var captainImg = $("<img>"); 
        // Make the src attr point to each image in the array
        captainImg.attr("src", captainArray[i]); 
        // Add a class attribute to each image 
        captainImg.attr('class', 'cap-images');
        // Set the height to resize each image
        captainImg.attr('height', '89px');
        // Add the data-captainvalue attribute to each image and insert a randomly generated number as a string that wont be 1
        captainImg.attr('data-captainvalue', Math.floor(Math.random() * 12) + 2) 
        //append each image to the targetDiv in the HTML
        $('#targetDiv').append(captainImg); 
        }
    
        // Begin by creating the variables and assigning them a score of 0 to start
        var captainValue = 0;
        var counter = 0;
        var yourWins = 0;
        var yourLosses = 0;


     // Determining the captain's value requires us to extract the value from the data attribute.
     // Using the $(document) keyword specifies that we should be waiting for the click event 
    $(document).on("click", ".cap-images", function(event){
    

        // Using the .attr("data-captainvalue") allows us to grab the value out of the "data-captainvalue" attribute.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
        var captainValue = ($(this).attr("data-captainvalue"));
        captainValue = parseInt(captainValue);
        
        // We then add the captainValue to the user's "counter" which is a global variable.
        // Every click, from every captain adds to the global counter.
        // Each time user clicks a Captain the counter goes up by the number that was assigned to that captain in that game
        counter += captainValue;

        // Renders the resulting score of combined clicks into the HTML element with id your-score
        $("#your-score").html(counter);
        // Renders the last clicks value into the HTML element with id your-guess
        $("#your-guess").html(captainValue);

        // Here we create and if statement to "check" if the click counter matches the targetNumber.
        // Remember, this click event will be triggered with each click.
        // With each click the counter will increase by the value that was assigned to that captain in that game 
        //          and be re-evaluated against target.
        if (counter === targetNumber) {

            // If numbers match we tell the user they won! + we add that win to the HTML element with id of your-wins
            yourWins++;
            $("#your-wins").html(yourWins);
            resetGame();
        }
        // This else if statement tells the user they lost in the event their counter went over the target guess
        // Adds the number of losses to the HTML element with id your-losses
        else if (counter >= targetNumber) {
            yourLosses++;
            $("#your-losses").html(yourLosses);
            resetGame();
        }

        // Resets the game by returning the counter to 0
        function resetGame() {
            counter = 0;

        }

    });


});

