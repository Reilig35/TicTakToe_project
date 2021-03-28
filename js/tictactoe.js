//Tracking whos turn it is
let activePlayer = "X";

//Array used to store moves and to determine win conditions
let selectedSquares = [];

//Place X on a square
function placeXOrO(squareNumber) {
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber); 
        if (activePlayer === 'X') {
            select.style.backgroundImage = "url('images/xlogo.png')";
        
    } else {
        select.style.backgroundImage = "url('images/ring.png')"
    }

    selectedSquares.push(squareNumber + activePlayer);

    checkWinConditions();
    //Changes the active player to O
    if (activePlayer === 'X') {
        activePlayer = 'O';
    //Changes active player back to X
    } else {
        activePlayer = 'X'
    }

    //Plays audio when a square is selected
    audio("./media/sonic-ring.mp3")

    if (activePlayer === 'O') {
        disableClick();

        setTimeout(function () { computersTurn(); }, 1000);
    }
    return true;
    
}

//Function to have the computer to select a square
    function computersTurn() {
        let success = false;

        let pickASquare;

        while(!success) {
            pickASquare = String(Math.floor(Math.random() * 9));

            if (placeXOrO(pickASquare)) {
                
                placeXOrO(pickASquare);

                success = true;

            };
        }
    }
}


function checkWinConditions() {
    //Setting up X win conditions by parsing the selectedSquares Array to search for win conditions
    //drawline is called to draw a line if  win conditions are met
    if (arrayIncludes('0X', '1X', '2X')) { drawWinline(50, 100, 558, 100); }

    else if (arrayIncludes('3X', '4X', '5X')) { drawWinline(50, 304, 558, 304); }

    else if (arrayIncludes('6X', '7X', '8X')) { drawWinline(50, 508, 558, 508); }

    else if (arrayIncludes('0X', '3X', '6X')) { drawWinline(100, 50, 100, 558); }

    else if (arrayIncludes('1X', '4X', '7X')) { drawWinline(304, 50, 304, 558); }

    else if (arrayIncludes('2X', '5X', '8X')) { drawWinline(508, 50, 508, 558); }

    else if (arrayIncludes('6X', '4X', '2X')) { drawWinline(100, 508, 510, 90); }

    else if (arrayIncludes('0X', '4X', '8X')) { drawWinline(100, 100, 520, 520); }

    //Setting up O win conditions by parsing the selectedSquares Array to search for win conditions
    
    if (arrayIncludes('0O', '1O', '20')) { drawWinline(50, 100, 558, 100); }

    else if (arrayIncludes('3O', '4O', '5O')) { drawWinline(50, 304, 558, 304); }

    else if (arrayIncludes('6O', '7O', '8O')) { drawWinline(50, 508, 558, 508); }

    else if (arrayIncludes('0O', '3O', '6O')) { drawWinline(100, 50, 100, 558); }

    else if (arrayIncludes('1O', '4O', '7O')) { drawWinline(304, 50, 304, 558); }

    else if (arrayIncludes('2O', '5O', '8O')) { drawWinline(508, 50, 508, 558); }

    else if (arrayIncludes('6O', '4O', '2O')) { drawWinline(100, 508, 510, 90); }

    else if (arrayIncludes('0O', '4O', '8O')) { drawWinline(100, 100, 520, 520); }



    else if (selectedSquares.length >= 9) {
        
        //This will play if the game ends in a tie
        audio("./media/game_over.mp3");

        setTimeout(function () { resetGame(); }, 1000);

    }
    
    
    
    function arrayIncludes(squareA, squareB, squareC) {

        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);

        if (a === true && b === true && c === true) { return true; }
    }
}

//This function makes the body element temp unclickable
function disableClick() {
    body.style.pointerEvents = "none";

    setTimeout(function() {body.style.pointerEvents = "auto";}, 1000);
}

function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

//Drawing win lines
function drawWinline( coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById("win-lines");
    const c = canvas.getContext("2d");
    let x1 = coordX1, y1 = coordY1, x2 = coordX2, y2 = coordY2, x = x1, y = y1;

    //This function interacts with the canvas
    function animateLineDrawing() {
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        
        c.clearRect(0, 0, 608, 608);
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x, y);
        c.lineWidth = 10;
        c.strokeStyle = "rgba(70, 255, 33, 0.8)";
        c.stroke();

        //Checking to see if the game is at an endpoint
        if(x1 <= x2 && y1 <= y2) {
            if (x < x2) { x += 10; }
            if (y < y2) { y += 10; }
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }

        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; } 
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        } 

    }
    //This will clear the canvas after the win line is drawn
    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }
    //This stops clicking while win sound is playing
    disableClick();

    //This plays the win sound
    audio("./media/congratulations.mp3")

    //This calls the main animation loop
    animateLineDrawing();

    //This clears the game and resests it
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

//Function to reset the game
function resetGame() {
    for(let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i));
        square.style.backgroundImage = "";
    }

    //Resetting the array so the game can start over
    selectedSquares =[];
}