const container = document.querySelector('#can');
const sizeEl = document.querySelector('#arr_sz');
let size = sizeEl.value;
const color = "#000000";
const resetBtn = document.querySelector('.btn');

let draw = false;

function populate(size) {
  container.style.setProperty('--size', size);
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('pixel');

    div.addEventListener('mouseover', function(){
        if(!draw) return;
        div.style.backgroundColor = color;
    })
    div.addEventListener('mousedown', function(){
        div.style.backgroundColor = color;
    })

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
    populate(size);
}

sizeEl.addEventListener('keyup', function(){
    size = sizeEl.value;
    reset();
})

populate(size);