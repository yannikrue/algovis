height = 25;
width = 25;

let graphArr = [];

for(let y = 0; y < height; y++) {
    graphArr[y] = [];
    for(let x = 0; x < width; x++) {
        graphArr[y][x] = 0;
    }
}

console.log(graphArr);

/*
const can = document.querySelector("#can");
let i = 0;

for(let y = 0; y < height; y++) {
    const row = document.createElement("div");
    for(let x = 0; x < width; x++) {
        const pix = document.createElement("div");
        i++;
        pix.style.height = `25px`;
        pix.style.width = `25px`;
        pix.style.background = "#6f8bca";
        pix.style.margin = `1px`;
        pix.style.borderColor = "black";
        pix.classList.add('pix');
        pix.classList.add('flex-item');
        pix.classList.add(`pixNo${i}`);
        row.appendChild(pix);
    }
    can.appendChild(row);
}
*/
