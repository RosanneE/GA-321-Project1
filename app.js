// *** means ideas to work on/improve if I have time

//global variables
let squareCount = 0
let squareFill = 0
let winCount = 0
let level = 0
let bombTouchCount = 0
let isEdge = false
let bombArray = []
    //edgecase groups
let edgeCaseLeft = [0, 9, 18, 27, 36, 45, 54, 63, 72,]
let edgeCaseRight = [8, 17, 26, 35, 44, 53, 62, 71, 80]
let caseCheck = [-1,1,-10,10,-9,9,-8,8]
let caseCheckRight = []
let caseCheckLeft = []
let squares = document.querySelectorAll(".square")
let grid = document.getElementById("gridID")
let message = document.querySelector(".message")
let messageTwo = document.querySelector(".messageTwo")
let reset = document.querySelector(".reset")
//***Might not need? Only for Debugging?
let gameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]

//add number to squares
squares.forEach(square => {
    square.dataset.number = squareCount
    gameMap[squareCount] = squareCount
    squareCount++
});
//add onclick to buttons
squares.forEach(square => {
    square.addEventListener('click', () => {
        isEdge = false
        if (square.id === "bomb") {
            explodeBomb(square)
            //(gameMap[square.dataset.number])
        } else {
            // safe(square)
            // countBombs(square)
            safe(gameMap[square.dataset.number],square)
            countBombs(gameMap[square.dataset.number])
                if (bombTouchCount != 0) {
                    square.style.color = "purple"
                    square.innerHTML = bombTouchCount
                }else if (bombTouchCount === 0){
                    explodingSafe(square.dataset.number)
                }
        }
    })
})

//reset button calls setGame
reset.addEventListener("click", function () {
    setGame()
})
//setGame original call, sets new game on page load/refresh
setGame()

//setGame sets up new game, calls clearBoard
function setGame() {
    //resets squares to start condition
    clearBoard()
    //add bombs to random squares function
    //randomly pick 10 bomb squares
    for (let i = 0; i < 10; i++) {
        let bombCreate = Math.floor(Math.random() * 81)
        bombArray.push(bombCreate)
    }
    //assign bombs to gameMap squares 
    for (i = 0; i < 10; i++) {
        gameMap[bombArray[i]] = "bomb"
        squares[bombArray[i]].id = "bomb"
    }
    // fill in Game map with touches
    //setMap()
    //log bomb array and gameMap for debugging
    console.log(`bomb array ' ${bombArray}`)
    console.log(gameMap)
}

//changes color of squares that touch no bombs, calles explodingSafe
function safe(squareNo) {
    squares[squareNo].style.backgroundColor = "lightgreen"
}

// countBombs looks at squares in front of and behid (i+1, i-1) and squares in rows above[-9-8-10] and below [+8+9+10]. It adds the number of bombs a square touches to its' innerHTML.  Calls edgeLeft and EdgeRight
function countBombs(squareNo) {
    let base = squareNo
    bombTouchCount = 0
    //edge piece exception code - if it is an edgecase, it doesn't count the number before it(right) or after it (left). 
    //calls edgeLeft
    edgeCaseLeft.forEach(caseLeft => {
        if (caseLeft === squareNo) {
            edgeLeft(squareNo, bombTouchCount, base)
            return
        }
    })
    //calls edgeRight
    edgeCaseRight.forEach(caseRight => {
        if (caseRight === squareNo) {
            edgeRight(squareNo, bombTouchCount, base)
            return
        }
    })
    //regular piece calculations - verifies if it edgecase is false, if so, it looks at squares in front of and behid (i+1, i-1) and squares in rows above [] and below[-9-8-10] and below [+8+9+10]
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
    }
    //checks for win status
    isWin()
    return
}

//called in countBombs, counts bombs touched [bomb -8,-9,+1+,9,+10]
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
    return bombTouchCount
}

//called in countBombs, counts bombs touched [bomb -10,-9,+1,+9,+8]
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
    return bombTouchCount
}

//sets message innerHTML to explode message, calls endGame function
function explodeBomb(squareNo) {
   // console.log(squareNo)
    message.innerHTML = `You found the bomb - with your face.  Better luck next time.`// bombArray: ${bombArray}`
    squareNo.classList.add("bombHit")
    gameOver()
}

//checks for win condition
function isWin() {
    squares.forEach(square => {
        if (square.style.backgroundColor === "lightgreen") {
            winCount++
        }
        if (winCount === 70) {
            win()
        }
    });
    winCount = 0
}

//win function - prints message, calls gameOver
function win() {
    message.innerHTML = "You win, no more bugs in the code!"
    gameOver()
}

//clears board of all changes to state made durring the game
function clearBoard() {
    squares.forEach(square => {
        //refresh IDs
        square.id = 0
        //reset css colors
        square.style.backgroundColor = "grey"
        //remove innerHTML
        square.innerHTML = ""
        //remove messages
        message.innerHTML = ""
        messageTwo.innerHTML = ""
    })
    squares.forEach(square => {
        square.disabled = false
    })

}

//prints message, disables buttons
function gameOver() {
    messageTwo.innerHTML = "Game Over. To play again, hit Reset!"
    // squares.forEach(square => {
    //     square.disabled = true
    // })
}
// function explodingSafe(squareNo) {

// }
//creates a ripple effect reveiling all touching squares that are safe and have no bomb touches
function explodingSafe(squareNo) {
    //check all squares touching the current safe square to see if they are also safe
    caseCheck.forEach(touches => {  
        checkNext = parseInt(squareNo) + touches 
        console.log(checkNext)
        //check that the square exists on the game map
        if (checkNext < gameMap.length && checkNext > 0){
            countBombs(checkNext)
            //for non edge cases
            if(isEdge === false){
            console.log(bombTouchCount)
            //revel square if it has no touchCount and is not a bomb
                if (squares[checkNext].id != "bomb" && bombTouchCount === 0){
                    safe(checkNext)
                    //explodingSafe(checkNext)
                    //console.log(squares[checkNext])
                }
            } else {
                //check Right edge
                console.log(isEdge)
                //check Left edge
            }
        }
    });
        //itterate through checkCase and make it specific to the current square 
} 

//sets map state at game start
// function setMap(){
//     gameMap.forEach(slot => {  
//         let i = 0
//         if (gameMap[i] != "bomb"){
//             console.log("inside")
//             countBombs(i)
//             slot = bombTouchCount
//             console.log(bombTouchCount)
//             i++
//         }
//         i++
//     });
// }


//calculates which squares to check for touching and wether it is an edge pice or not
function touchSquares() {

}

//add flags
function addFlag(squareNo){

}

//formats board and board properties based on level selection
// function boardLevel (){
//     if (level = 0){
        
//     }else if(level === 1 || level === 2){


//     }else{
//         console.log()
//     }
// }

// function findEdges(){
// let boardSize = gameMap.length +1
// let edgesize = boardSize.sqrt
// }