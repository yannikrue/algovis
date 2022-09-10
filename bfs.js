const bfsBtn = document.querySelector('.bfs');
bfsBtn.addEventListener('click', async function(){
    loadArray();
    disableClearBtn();
    disableSearchBtn();
    disableSizeSlider();
    await solveBfs(array, [0, 0], [arraySize.value - 1, arraySize.value - 1]);
    enableClearBtn();
    enableSearchBtn();
    enableSizeSlider();
})

async function solveBfs(array, startPoint, exitPoint) {
    let start = new Node(startPoint[0], startPoint[1]);
    let end = new Node(exitPoint[0], exitPoint[1]);
    let tree = new bfsTree(start, end, array);
    if(!await tree.grow(new Queue())) {
      alert("No solution found!");
    }
}

class Queue {
    constructor() {
        this.items = [];
    }
    
    // add element to the queue
    enqueue(element) {
        return this.items.push(element);
    }
    
    // remove element from the queue
    dequeue() {
        if(this.items.length > 0) {
            return this.items.shift();
        }
    }
    
    // view the last element
    peek() {
        return this.items[this.items.length - 1];
    }
    
    // check if the queue is empty
    isEmpty(){
       return this.items.length == 0;
    }
   
    // the size of the queue
    size(){
        return this.items.length;
    }
 
    // empty the queue
    clear(){
        this.items = [];
    }
}

class bfsTree {
    constructor (root, end, array) {
        this.root = root;
        this.end = end;
        this.array = array;
        this.path = new Stack();
    }

    async grow(queue) {
        let currentPos = null;
        if (queue.isEmpty()) {
            currentPos = this.root;
        } else {
            currentPos = queue.dequeue();
        }

        if (currentPos.x == this.end.x && currentPos.y == this.end.y) {
            this.end = currentPos;
            this.showPath();
            return true;
        } else {
            if (currentPos.y < this.array.length && currentPos.x < this.array.length) {
                container.children[currentPos.y * this.array.length + currentPos.x].style.backgroundColor = "blue";
                fixed();
                await waitforme(delay);
            }
            //checks if next node is free

            //down
            if (currentPos.y + 1 < this.array.length && currentPos.y + 1 >= 0) {
                if (this.array[currentPos.y + 1][currentPos.x] == 1) {
                    currentPos.down = new Node(currentPos.y + 1, currentPos.x, currentPos);
                    this.array[currentPos.down.y][currentPos.down.x] = 2;
                    queue.enqueue(currentPos.down);
                }
            }
  
            //right
            if (currentPos.x + 1 < this.array.length && currentPos.x + 1 >= 0) {
                if (this.array[currentPos.y][currentPos.x + 1] == 1) {
                    currentPos.right = new Node(currentPos.y, currentPos.x + 1, currentPos);
                    this.array[currentPos.right.y][currentPos.right.x] = 2;
                    queue.enqueue(currentPos.right);                
                }
            }
            
            //up
            if (currentPos.y - 1 < this.array.length && currentPos.y - 1 >= 0) {
                if (this.array[currentPos.y - 1][currentPos.x] == 1) {
                    currentPos.up = new Node(currentPos.y - 1, currentPos.x, currentPos);
                    this.array[currentPos.up.y][currentPos.up.x] = 2;
                    queue.enqueue(currentPos.up);
                }
            }

            //left
            if (currentPos.x - 1 < this.array.length && currentPos.x - 1 >= 0) {
                if (this.array[currentPos.y][currentPos.x - 1] == 1) {
                    currentPos.left = new Node(currentPos.y, currentPos.x - 1, currentPos);
                    this.array[currentPos.left.y][currentPos.left.x] = 2;
                    queue.enqueue(currentPos.left);     
                }
            }
            await waitforme(delay)
            container.children[currentPos.y * this.array.length + currentPos.x].style.backgroundColor = "cyan";
            fixed();
            
            if (queue.isEmpty()) {
                return false;
            }
            if (!await this.grow(queue)) {
                this.array[currentPos.y][currentPos.x] = 2;
                return false;
            } else {
                return true;
            }
        }
    }
    
    async showPath() {
        let currentPos = this.end;
        while(currentPos.backtrack != null) {
            container.children[currentPos.y * this.array.length + currentPos.x].style.backgroundColor = "blue";
            fixed();
            currentPos = currentPos.backtrack;
        }
    }
}