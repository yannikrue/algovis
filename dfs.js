
function isSafe(maze,x,y)
{
    // if (x, y outside maze) return false
        return (x >= 0 && x < arraySize.value && y >= 0
                && y < arraySize.value && maze[x][y] == 1);
}
 
/* This function solves the Maze problem using
    Backtracking. It mainly uses solveMazeUtil()
    to solve the problem. It returns false if no
    path is possible, otherwise return true and
    prints the path in the form of 1s. Please note
    that there may be more than one solutions, this
    function prints one of the feasible solutions.*/
async function solveMaze(maze) {
    let sol = new Array(arraySize.value);
    for(let i=0;i<arraySize.value;i++) {
        sol[i]=new Array(arraySize.value);
        for(let j=0;j<arraySize.value;j++)
        {
            sol[i][j]=0;
        }
    }
  
        if (await solveMazeUtil(maze, 0, 0, sol) == false) {
            document.write("Solution doesn't exist");
            return false;
        }
  
        console.log(sol);
        return true;
}
/* A recursive utility function to solve Maze
    problem */
async function solveMazeUtil(maze,x,y,sol) {
    await waitforme(1000);

    // if (x, y is goal) return true
    if (x == arraySize.value - 1 && y == arraySize.value - 1
        && maze[x][y] == 1) {
            sol[x][y] = 1;
            return true;
        }
        
        // Check if maze[x][y] is valid
        if (isSafe(maze, x, y) == true) {
            // Check if the current block is already part of solution path.  
            if (sol[x][y] == 1) {
                return false;
            }
            
            // mark x, y as part of solution path
            sol[x][y] = 1;
            container.children[x * arraySize.value + y].style.backgroundColor = "cyan";
            
            /* Move forward in x direction */
            if (await solveMazeUtil(maze, x + 1, y, sol))
            return true;
            
            /* If moving in x direction doesn't give
            solution then Move down in y direction */
            if (await solveMazeUtil(maze, x, y + 1, sol))
            return true;
            
            /* If moving in y direction doesn't give
            solution then Move backwards in x direction */
            if (await solveMazeUtil(maze, x - 1, y, sol))
            return true;
            
            /* If moving backwards in x direction doesn't give
            solution then Move upwards in y direction */
            if (await solveMazeUtil(maze, x, y - 1, sol))
            return true;
            
            /* If none of the above movements works then
            BACKTRACK: unmark x, y as part of solution
            path */
            sol[x][y] = 0;
            container.children[x * arraySize.value + y].style.backgroundColor = "#9da9c1";
        return false;
    }

    return false;
}

const dfsBtn = document.querySelector('.dfs');
dfsBtn.addEventListener('click', function(){
    loadArray();
    solveMaze(array);
})