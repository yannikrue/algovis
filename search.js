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
