// *** means ideas to work on/improve if I have time

//global variables
let squareCount = 0
let squareFill = 0
let isEdge = false
let bombArray = []
let squares = document.querySelectorAll(".square")
let grid = document.getElementById("gridID")
let message = document.querySelector(".message")

let gameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]

//***Might not need?  Or might try to create a grid map all in js starting with an empty array if I have time
//letGameMapTwo = []



//add number to squares
squares.forEach(square => {
    square.dataset.number = squareCount
    gameMap[squareCount] = squareCount
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
    }
    console.log(`bomb array ' ${bombArray}`)
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

            explodeBomb(gameMap[square.dataset.number])
        } else {
            countBombs(gameMap[square.dataset.number])
            safe(gameMap[square.dataset.number])
        }
    })
})

//add explode function
//https://cdn.vectorstock.com/i/1000x1000/19/14/bomb-vector-15001914.webp
function explodeBomb(squareNo) {
    message.innerHTML = "You found the bomb - with your face.  Better luck next time"


}

//add countBombs function
// look at squares in front of and behid (i+1, i-1) and squares in rows above [] and below[-9-8-10] and below [+8+9+10]
function countBombs(squareNo) {
    let base = squareNo
    let bombTouchCount = 0
    //edgecase groups
    let edgeCaseLeft = [0, 9, 18, 27, 36, 45, 54, 63, 72,]
    let edgeCaseRight = [8, 17, 26, 35, 44, 53, 62, 71, 80]

    //edge piece exception code - return if hit, don't progress to regular
    edgeCaseLeft.forEach(caseLeft => {
        if (caseLeft === squareNo) {
            edgeLeft(squareNo, bombTouchCount, base)
            return
        }
    })
    edgeCaseRight.forEach(caseRight => {
        if (caseRight === squareNo) {
            edgeRight(squareNo, bombTouchCount, base)
            return
        }
    })
    //regular piece calculations
    if (isEdge === false) {
        if (gameMap[base - 1] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base + 1] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base + 10] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base + 8] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base + 9] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base - 10] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base - 8] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base - 9] === "bomb") {
            bombTouchCount++
        }
        if (bombTouchCount != 0) {
            squares[squareNo].style.color = "purple"
            squares[squareNo].innerHTML = bombTouchCount
        }
    }
}



function safe(squareNo) {
    squares[squareNo].style.backgroundColor = "lightgreen"
}

function bombTouch() {

}

//add endGame function

//add win function

//add reset button
function clearBoard() {
    //refresh IDs
    squares.forEach(square => {
        square.id = 0
    })
    //remove images
    //reset css colors
}
function edgeLeft(squareNo, bombTouchCount, base) {

    if (gameMap[base - 9] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base - 8] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base + 1] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base + 9] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base + 10] === "bomb") {
        bombTouchCount++
    }
    if (bombTouchCount != 0) {
        squares[squareNo].style.color = "purple"
        squares[squareNo].innerHTML = bombTouchCount
    }
    isEdge = true
    return
}

function edgeRight(squareNo, bombTouchCount, base) {
    if (gameMap[base - 10] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base - 9] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base - 1] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base + 8] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base + 9] === "bomb") {
        bombTouchCount++
    }
    if (bombTouchCount != 0) {
        squares[squareNo].style.color = "purple"
        squares[squareNo].innerHTML = bombTouchCount
    }
    isEdge = true
    return
}




// -MVP
// -beginner size grid (9x9) with 10 mines - Is starter template
// -square on click is empty, a mine, or contains the number of mines the square touches
// -squares with mines end game
// - reset button

//stretch
//add board size function
//add blankExplode function