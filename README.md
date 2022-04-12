# GA-321-Project1

Bug Sweeper
A game played in the classic Style of Minesweeper!!

See screenshots for examples of game play:


![Screen Shot 2022-04-12 at 3 03 20 PM](https://user-images.githubusercontent.com/6979738/163072657-75082f04-59da-4fb3-ab09-20865e5802f3.png)
![Screen Shot 2022-04-12 at 3 19 13 PM](https://user-images.githubusercontent.com/6979738/163072783-e67ab9b7-c435-4e2e-af51-0540ddcda679.png)



User Story                
    Begin playing by clicking any square.
    Some squares contain Bugs - click them and the game is over.
    When clicked, squares that touch Bugs reveal the number of Bugs they touch.
    When clicked, squares that touch no Bugs are blank
    Expose all squares EXCEPT for the 10 containing bugs to win
    Set Trap allows you to highlight squares you believe may contain Bugs - be careful, these squares can still be clicked on and revealed
    Turn Cascade on to revel blank squares more quickly. Make sure to click inside all edges of the revealed area to show the number of bugs touched by those squares

 -MVP
     -beginner size grid (9x9) with 10 mines 
     -square on click is empty, a mine, or   contains the number of mines the square touches
    Incomplete
     -account for edge piece bomb count differences(mostly fixed, top row seems glitchy, can't pin it down. work on this near end)
     -squares with mines end game
     -reset button


 Stretch features:    
    Complete
         -falg postential bomb squares
         -CSS/design user interface
    In Progress
         -empty square explosion (clicking an empty square reveals all touching empty squares)
         STATUS: togles off and on, still a bit glitchy
    To Do
        -Three grid sizes/levels to choose between
            -beginner size grid (9x9) with 10 mines
            -intermediate size grid (16x16) with 40 mines
            -advanced (30x16) with 99 mines
        -Time clock (starts on first click)
        -Top score logger

