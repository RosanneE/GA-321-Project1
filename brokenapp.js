// *** means ideas to work on/improve if I have time

//global variables
let squareCount = 0
let squareFill = 0
let clickCount = 0
let bombArray = []
let squares = document.querySelectorAll(".square")
let grid = document.getElementById("gridID")
let message = document.querySelector(".message")
let messageTwo = document.querySelector(".messageTwo")
//***Might not need?  
let gameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]

setGame()

//add number to squares for tracking
squares.forEach(square => {
    square.dataset.number = squareCount
    gameMap[squareCount] = squareCount
    squareCount++
});

//add onclick to buttons, calls function based on square id
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

//resetGame function - sets game back to initial conditions, calls clearBoard
function setGame() {
    clearBoard()
    //add bombs to random squares function
    //randomly pick 10 bomb squares
    for (let i = 0; i < 10; i++) {
        let bombCreate = Math.floor(Math.random() * 81)
        bombArray.push(bombCreate)
    }
    console.log(`bomb array: ${bombArray}`)
    Math.floor(Math.random() * 81)
    //assign bombs to gameMap squares 
    for (i = 0; i < 10; i++) {
        gameMap[bombArray[i]] = "bomb"
        squares[bombArray[i]].id = "bomb"
    }
    console.log(gameMap)
}

//explodeBomb function - sends message, calls game over
function explodeBomb(squareNo) {
    message.innerHTML = "You found the bomb - with your face.  Better luck next time"
    gameOver()
}

//countBombs function - returns number of bombs a square touches.  Calls edgeLeft and EdgeRight
function countBombs(squareNo) {
    let base = squareNo
    let bombTouchCount = 0
    //edgeCase groups
    let edgeCaseLeft = [0, 9, 18, 27, 36, 45, 54, 63, 72,]
    let edgeCaseRight = [8, 17, 26, 35, 44, 53, 62, 71, 80]

    console.log(`inside of countBombs`)

    //edge piece exception code - if it is an edgecase, it doesn't count the number before it(right) or after it (left). 
    //calls edgeRight
    edgeCaseRight.forEach(caseRight => {
        if (caseRight === squareNo) {
            console.log(`inside of countBombs--edgeCaseRight`)
            edgeRight(squareNo, bombTouchCount, base)
            return 
        }
    })
    //calls edgeLeft
    edgeCaseLeft.forEach(caseLeft => {
        if (caseLeft === squareNo) {
            console.log(`inside of countBombs--edgeCaseLeft`)
            edgeLeft(squareNo, bombTouchCount, base)
            return
        }
    })
    //regular piece calculations - looks at squares in front of and behid (i+1, i-1) and squares in rows above [] and below[-9-8-10] and below [+8+9+10]
    console.log(`inside of countBombs--counting regular squares`)
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
    console.log(bombTouchCount)
    return bombTouchCount
}
//turns safe squares a specific color
function safe(squareNo) {
    squares[squareNo].style.backgroundColor = "lightgreen"
}

//endGame function - prints message, disables buttons
function gameOver() {
    squares.forEach(square => {
        square.addEventListener('click', () => {
            messageTwo.innerHTML = `Game Over.  To start a new game, press the reset button`
        })
    })
    //disables onclick
    //squares.disabled = true
}


//win function - prints message, calls gameOver
function win() {
    message.innerHTML = "You win, no more bugs in the code!"
    gameOver()
}
//reset button - clears board,
function clearBoard() {
    //refresh IDs
    squares.forEach(square => {
        square.id = 0
    })
    //remove images
    //reset css colors
}

//called in countBombs, counts bombs touched without counting the number before it
function edgeRight(squareNo, bombTouchCount, base) {
    console.log(`inside of edgeRight`)
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
    return
}

//called in countBombs, counts bombs touched without counting the number after it. 
function edgeLeft(squareNo, bombTouchCount, base) {
    console.log(`inside of edgeRight`)
    if (gameMap[base - 1] === "bomb") {
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
    return bombTouchCount
}
