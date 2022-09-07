const dfsBtn = document.querySelector('.dfs');
dfsBtn.addEventListener('click', async function(){
    loadArray();
    disableClearBtn();
    disableSearchBtn();
    disableSizeSlider();
    await solveDfs(array, [0, 0], [arraySize.value - 1, arraySize.value - 1]);
    enableClearBtn();
    enableSearchBtn();
    enableSizeSlider();
})

async function solveDfs(array, startPoint, exitPoint) {
  let start = new Node(startPoint[0], startPoint[1]);
  let end = new Node(exitPoint[0], exitPoint[1]);
  let tree = new dfsTree(start, end, array);
  if(await tree.grow(tree.root)) {
    await tree.solution_path();
  } else {
    alert("No solution found!");
  }
}

class dfsTree {
  constructor (root, end, array) {
    this.root = root;
    this.end = end;
    this.stack = new Stack();
    this.array = array;
    this.solved = false;
  }

  async grow(currentPos) {
    this.stack.push(currentPos);
    if (currentPos.x == this.end.x && currentPos.y == this.end.y) {
      console.log("solved");
      this.solved = true;
      return true;
    } else {
      if (currentPos.y < this.array.length && currentPos.x < this.array.length) {
        await waitforme(delay);
        container.children[currentPos.y * this.array.length + currentPos.x].style.backgroundColor = "blue";
        fixed();
      }
      //checks if next node is free

      //down
      if (currentPos.y + 1 < this.array.length && currentPos.y + 1 >= 0) {
        if (this.array[currentPos.y + 1][currentPos.x] == 1) {
          currentPos.down = new Node(currentPos.y + 1, currentPos.x);
          this.array[currentPos.down.y][currentPos.down.x] = 2;
          if(await this.grow(currentPos.down)) {
            return true;
          }
        }
      }   
      
      //right
      if (currentPos.x + 1 < this.array.length && currentPos.x + 1 >= 0) {
        if (this.array[currentPos.y][currentPos.x + 1] == 1) {
          currentPos.right = new Node(currentPos.y, currentPos.x + 1);
          this.array[currentPos.right.y][currentPos.right.x] = 2;
          if(await this.grow(currentPos.right)) {
            return true;
          }
        }
      }
      
      //up
      if (currentPos.y - 1 < this.array.length && currentPos.y - 1 >= 0) {
        if (this.array[currentPos.y - 1][currentPos.x] == 1) {
          currentPos.up = new Node(currentPos.y - 1, currentPos.x);
          this.array[currentPos.up.y][currentPos.up.x] = 2;
          if(await this.grow(currentPos.up)) {
            return true;
          }
        }
      }
      //left
      if (currentPos.x - 1 < this.array.length && currentPos.x - 1 >= 0) {
        if (this.array[currentPos.y][currentPos.x - 1] == 1) {
          currentPos.left = new Node(currentPos.y, currentPos.x - 1);
          this.array[currentPos.left.y][currentPos.left.x] = 2;
          if(await this.grow(currentPos.left)) {
            return true;
          }
        }
      }
      this.stack.pop();
      this.array[currentPos.y][currentPos.x] = 2;
      container.children[currentPos.y * this.array.length + currentPos.x].style.backgroundColor = "cyan";
      fixed();
      await waitforme(delay)
      return false;
    }
  }
  
  async solution_path() {
    while(!this.stack.isEmpty()) {
      await waitforme(delay/4);
      let currentPos = this.stack.pop();
      console.log(currentPos);
      container.children[currentPos.y * this.array.length + currentPos.x].style.backgroundColor = "green";
    }
  }
}