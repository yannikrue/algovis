const dfsBtn = document.querySelector('.dfs');
dfsBtn.addEventListener('click', function(){
    loadArray();
    let a = solveShort(array, [0, 0], [arraySize.value - 1, arraySize.value - 1]);
    //console.log(a);
})

async function solveShort(array, startPoint, exitPoint) {
  let start = new Node(startPoint[0], startPoint[1]);
  let end = new Node(exitPoint[0], exitPoint[1]);
  let tree = new dfsTree(start, end, array);
  await tree.grow(tree.root);
}
