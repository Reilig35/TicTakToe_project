//Tracking whos turn it is
let activePlayer = "X";

//Array used to store moves and to determine win conditions
let selectedSquares = [];

//Place X on a square
function placeXOrO(squareNumber) {
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber); 
        if (activePlayer === 'X') {
            select.style.backgroundImage = "url('images/x.png')";
        
    } else {
        select.style.backgroundImage = "url('images/o.png')"
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
        
        //This will play if the gamee ends in a tie
        audio("./media/tie.mp3");

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