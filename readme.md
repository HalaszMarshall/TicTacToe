TicTacToe by Web Dev Simplified

Notes

1. give a "div" class and id, in order to sepparate class for CSS and id for JS
2. to create a div with a "class" you can shorthand type .*class name* and for more .*class name* * amount (ex. .cell*9)
3. add "data-cell" to more easily access cell is JS without having to use the class="cell"
4. set "box-sizing" to border box for *, *::after, *::before and also body margin:0 to avoid elements not filling the entire screen
5. ".board.x .cell:not(.x):not(.circle):hover::before" = when hovering over a cell which does not have an X or circle in it, do this...
