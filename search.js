function disableSearchBtn() {
    document.querySelector(".dfs").disabled = true;
    document.querySelector(".bfs").disabled = true;
}

function enableSearchBtn() {
    document.querySelector(".dfs").disabled = false;
    document.querySelector(".bfs").disabled = false;
}

function disableSizeSlider(){
    document.querySelector("#arr_sz").disabled = true;
}

function enableSizeSlider(){
    document.querySelector("#arr_sz").disabled = false;
}

function disableClearBtn(){
    document.querySelector(".clear").disabled = true;
}

function enableClearBtn(){
    document.querySelector(".clear").disabled = false;
}

function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
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

class Node {
    constructor (y, x) {
      this.left = null;
      this.right = null;
      this.up = null;
      this.down = null;
      this.x = x;
      this.y = y;
    }
}
  
class dfsTree {
    constructor (root, end, array) {
      this.root = root;
      this.end = end;
      this.stack = new Stack();
      this.array = array;
    }
  
    async grow(currentPos) {
        await waitforme(delay);
        if (currentPos.x == this.end.x && currentPos.y == this.end.y) {
            console.log("solved");
            return true;
        } else {
            if (currentPos.y < this.array.length && currentPos.x < this.array.length) {
                this.stack.push(currentPos);
                console.log(currentPos)
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
            this.array[currentPos.y][currentPos.x] = 2;
            container.children[currentPos.y * this.array.length + currentPos.x].style.backgroundColor = "cyan";
            return false;
        }
    }
}


let delay = 260;

let delayElement = document.querySelector('#speed_input');

delayElement.addEventListener('input', function(){
    console.log(delayElement.value, typeof(delayElement.value));
    delay = 320 - parseInt(delayElement.value);
});




const container = document.querySelector('#can');
const color = "black";
const bcolor = "#9da9c1";
const resetBtn = document.querySelector('.clear');
let arraySize = document.querySelector('#arr_sz');

let draw = false;
let running = false;


function populate() {
    container.style.setProperty('--size', arraySize.value);
    for (let i = 0; i < arraySize.value * arraySize.value; i++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        
        div.addEventListener('mouseover', function(){
            if(!draw || running) return;
            if (div.style.backgroundColor == "black") {
                div.style.backgroundColor = bcolor;
            } else {
                div.style.backgroundColor = color;
            }
            fixed();
        })
        div.addEventListener('mousedown', function(){
            if(running) return;
            if (div.style.backgroundColor == "black") {
                div.style.backgroundColor = bcolor;
            } else {
                div.style.backgroundColor = color;
            }
            fixed(); 
        })
        container.appendChild(div);
    }
    fixed();
}

function fixed() {
    container.children[0].style.backgroundColor = "green";
    container.children[arraySize.value * arraySize.value - 1].style.backgroundColor = "red";
}

window.addEventListener("mousedown", function(){
    draw = true;
})
window.addEventListener("mouseup", function(){
    draw = false;
})

function reset(){
    container.innerHTML = '';
    populate(arraySize.value);
}

resetBtn.addEventListener('click', function(){
    reset();
})

arraySize.addEventListener('input', function(){
    console.log(arraySize.value, typeof(arraySize.value));
    createNewArray(parseInt(arraySize.value));
});

let array = [];

createNewArray();

function createNewArray() {
    reset();
    array = []
}

function loadArray() {
 
    let i = 0;
    array = []

    for (let y = 0; y < arraySize.value; y++) {
        array[y] = [];
        for (let x = 0; x < arraySize.value; x++) {
            if (container.children[i].style.backgroundColor == "black") {
                array[y][x] = 0;
            } else {
                array[y][x] = 1;
            }
            i++;
        }
    }
    console.log(array);
}
