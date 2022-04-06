// *** means ideas to work on/improve if I have time

//global variables
let squareCount = 0;
let squareFill = 0
let bombArray = []
let squares = document.querySelectorAll(".square")
let grid = document.getElementById("gridID")
let message = document.querySelector(".message")
console.log(message)

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
    clearBoard()
    //add bombs to random squares function
    //randomly pick 10 bomb squares
    for (let i = 0; i < 10; i++) {
        let bombCreate = Math.floor(Math.random() * 81)
        bombArray.push(bombCreate)
        Math.floor(Math.random() * 81)
    }
    Math.floor(Math.random() * 81)
    //assign bombs to gameMap squares 
    for (i = 0; i < 10; i++) {
        gameMap[bombArray[i]] = "bomb"
        squares[bombArray[i]].id = "bomb"
    }
    console.log(gameMap)
}


//add onclick to buttons
squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.id === "bomb") {
            console.log(square.id)
            explodeBomb(square.id)
        } else {
            console.log("safe")
            safe(square.id)
        }
    })
})

//add explode function
//https://cdn.vectorstock.com/i/1000x1000/19/14/bomb-vector-15001914.webp
function explodeBomb(squareID){
    message.innerHTML = "You found the bomb - with your face.  Better luck next time"
    
}

//add countBombs function
// look at squares in front of and behid (i+1, i-1) and squares in rows above [] and below[-9-8-7] and below [+8+9+7]

//add safe function
function checkSafe(squareID){

}

function safe(){

}

function bombTouch(){

}

//add endGame function

//add win function

//add reset button
function clearBoard(){
    //refresh IDs
    squares.forEach(square => {
        square.id = 0
    })
    //remove images
    //reset css colors
}



// -MVP
// -beginner size grid (9x9) with 10 mines - Is starter template
// -square on click is empty, a mine, or contains the number of mines the square touches
// -squares with mines end game
// - reset button

//stretch
//add board size function
//add blankExplode function