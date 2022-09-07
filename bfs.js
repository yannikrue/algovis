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
    let tree = new dfsTree(start, end, array);
    if(await tree.grow(tree.root)) {
      await tree.solution_path();
    } else {
      alert("No solution found!");
    }
}

class bfsTree {
    
}