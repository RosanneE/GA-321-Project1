//global variables
// let rowOne = 
// let rowTwo = 
let squareCount = 0;
let squares = document.querySelectorAll(".square")
let gameMap = document.getElementById("gridID")
console.log(squares)



//add number to squares
squares.forEach(square => {
    square.dataset.number = squareCount
    squareCount++
});


//create grid array to store gameMap(bombs, numbers, blanks, and game state)


//add onclick to buttons

//add explode function

//add countBombs function

//add empty function

//add endGame function

//add win function

//add reset button

//add bombs to random squares function

// -MVP
// -beginner size grid (9x9) with 10 mines - Is starter template
// -square on click is empty, a mine, or contains the number of mines the square touches
// -squares with mines end game
// - reset button

//stretch
//add board size function
//add blankExplode function