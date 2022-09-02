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



const container = document.querySelector('#can');
const color = "black";
const resetBtn = document.querySelector('.clear');
let arraySize = document.querySelector('#arr_sz');

let draw = false;
let running = false;

function fixed(i, arraySize, div) {
    if (i == 0) {
        div.style.backgroundColor = "green";
    } else if (i == arraySize.value * arraySize.value - 1){
        div.style.backgroundColor = "red";        
    }
}

function populate() {
  container.style.setProperty('--size', arraySize.value);
  for (let i = 0; i < arraySize.value * arraySize.value; i++) {
    const div = document.createElement('div');
    div.classList.add('pixel');
    
    div.addEventListener('mouseover', function(){
        if(!draw || running) return;
        div.style.backgroundColor = color;
        fixed(i, arraySize, div);
    })
    div.addEventListener('mousedown', function(){
        if(running) return;
        div.style.backgroundColor = color;
        fixed(i, arraySize, div);
    })
    
    fixed(i, arraySize, div);    
    container.appendChild(div);
  }
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

let delay = 260;

let delayElement = document.querySelector('#speed_input');

delayElement.addEventListener('input', function(){
    console.log(delayElement.value, typeof(delayElement.value));
    delay = 320 - parseInt(delayElement.value);
});

let array = [];

createNewArray();

function createNewArray() {
    reset();
    array = []
}

function loadArray() {
    let walls = [];
    for (let i = 0; i < arraySize.value * arraySize.value -1; i++) {
        if (container.children[i].style.backgroundColor == "black") {
            walls.push(i);
        }
    }

    for(let y = 0; y < arraySize.value; y++) {
        array[y] = []
        for(let x = 0; x < arraySize.value; x++) {
            if (x + 1 <= arraySize - 1) {
                array[y][x + 1] = 1;
                array[x + 1][y] = 1;

            } else if (x - 1 >= 0) {
                array[y][x - 1] = 1;
                array[x - 1][y] = 1;

            } else if (y + 1 <= arraySize - 1) {
                array[y + 1][x] = 1;
                array[x][y + 1] = 1;

            } else if (y - 1 >= 0) {
                array[y - 1][x] = 1;
                array[x][y - 1] = 1;
            }
            
            if (x == y) {
            }
            
            if (walls.includes(y) || walls.includes(x)) {
                array[y][x] = 0;
                array[x][y] = 0;
            }


        }
    }
    
    console.log(walls);
}

