// *** means ideas to work on/improve if I have time

//global variables
let squareCount = 0;
let squareFill = 0
let bombArray = []
let squares = document.querySelectorAll(".square")
let grid = document.getElementById("gridID")

//create grid array to store gameMap(bombs, numbers, blanks, and game state)
// let gameMap = [[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]]]
// let gameMap = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
let gameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]

//***might try to create a grid map all in js starting with an empty array if I have time
//letGameMapTwo = []



//add number to squares
squares.forEach(square => {
    square.dataset.number = squareCount
    squareCount++
});
setGame()
//add setGame function
function setGame() {
    //randomly assign ten bombs
    
    for (let i = 0; i < 10; i++) {
        let bombCreate = Math.floor(Math.random() * 81)
        bombArray.push(bombCreate)
        console.log(bombArray)
    }

    
    for (let i = 0; i < gameMap.length; i++) {

    }
}


//add onclick to buttons
squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.id === "bomb") {
            console.log(square.id)
        } else {
            console.log("safe")
        }
    })
});

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