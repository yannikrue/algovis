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
  if(!await tree.grow(new Stack())) {
    alert("No solution found!");
  }
}

// Stack class
class Stack {
  
  // Array is used to implement stack
  constructor() {
      this.items = [];
  }

  push(element) {
      this.items.push(element);
  }

  pop() {
      if (this.items.length == 0)
          return "Underflow";
      return this.items.pop();
  }

  peek() {
      return this.items[this.items.length - 1];
  }

  isEmpty() {
      return this.items.length == 0;
  }
  
  printStack() {
      var str = "";
      for (var i = 0; i < this.items.length; i++)
          str += this.items[i] + " ";
      return str;
  }
}

class dfsTree {
  constructor (root, end, array) {
    this.root = root;
    this.end = end;
    this.array = array;
  }

  async grow(stack) {
    let currentPos = null;
    if (stack.isEmpty()) {
      currentPos = this.root;
    } else {
      currentPos = stack.pop();
    }
    
    if (currentPos.x == this.end.x && currentPos.y == this.end.y) {
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
          stack.push(currentPos.down);
          if(await this.grow(stack)) {
            return true;
          }
        }
      }   
      
      //right
      if (currentPos.x + 1 < this.array.length && currentPos.x + 1 >= 0) {
        if (this.array[currentPos.y][currentPos.x + 1] == 1) {
          currentPos.right = new Node(currentPos.y, currentPos.x + 1);
          this.array[currentPos.right.y][currentPos.right.x] = 2;
          stack.push(currentPos.right);
          if(await this.grow(stack)) {
            return true;
          }
        }
      }
      
      //up
      if (currentPos.y - 1 < this.array.length && currentPos.y - 1 >= 0) {
        if (this.array[currentPos.y - 1][currentPos.x] == 1) {
          currentPos.up = new Node(currentPos.y - 1, currentPos.x);
          this.array[currentPos.up.y][currentPos.up.x] = 2;
          stack.push(currentPos.up);
          if(await this.grow(stack)) {
            return true;
          }
        }
      }

      //left
      if (currentPos.x - 1 < this.array.length && currentPos.x - 1 >= 0) {
        if (this.array[currentPos.y][currentPos.x - 1] == 1) {
          currentPos.left = new Node(currentPos.y, currentPos.x - 1);
          this.array[currentPos.left.y][currentPos.left.x] = 2;
          stack.push(currentPos.left);
          if(await this.grow(stack)) {
            return true;
          }
        }
      }

      this.array[currentPos.y][currentPos.x] = 2;
      container.children[currentPos.y * this.array.length + currentPos.x].style.backgroundColor = "cyan";
      fixed();
      await waitforme(delay)
      return false;
    }
  }
}