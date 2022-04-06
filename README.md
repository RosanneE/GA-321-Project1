# GA-321-Project1

Minesweeper Game


Current Status:

Completed:
    -Wire frame


Goals:
    -create user story (goes on website - written version goes in read-me)
    -use figma to create wire frame (what it looks like) (include in ReadMe)

User Story:
    Users begin playing by clicking any square.
    Some squares are bombs - click them and the game is over.
    Clicking Squares that touch a bomb will reveal the number of bombs they touch.
    Clicking Squares that touch no bombs are blanks, and will change color

 -MVP
     -beginner size grid (9x9) with 10 mines
     -square on click is empty, a mine, or   contains the number of mines the square touches
     -squares with mines end game
     - reset button

 Stretch features:    
    -Three grid sizes/levels to choose between
    -beginner size grid (9x9) with 10 mines
    -intermediate size grid (16x16) with 40 mines
    -advanced (30x16) with 99 mines
    -Time clock (starts on first click)
    -empty square explosion (clicking an empty square reveals all touching empty squares)
    -as squares are reveled form a picture
    -top score logger
    -set possible bomb squares to flags

Pseudocode
// *** means ideas to work on/improve if I have time
//global variables
let squareCount = 0;
let squareFill = 0
let bombArray = []
let squares = squares in grid
let grid = compsit of whoe grid
let message = a heading in the HTML

//create grid array to store gameMap(bombs, numbers, blanks, and game state)
let gameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]

//***might try to create a grid map all in js starting with an empty array if I have time

//add number to each square as an id



//add setGame function that:
    //adds bombs to random squares function
    //randomly picks 10 bomb squares
    //assign bombs to gameMap squares 


//add onclick to quares


//add explode function shows bomb, changes all squares to red, has a message saying the bomb exploded




//add safe function to change colors of safe squares on click

//add bombTouch function to look at squares in front of and behid (i+1, i-1) and squares in rows above and below i+-[9,8,7] and add the number of bombs touching to the square

//add win function wher only bomb squares are still unclicked

//add reset button to clear the board and reset ids