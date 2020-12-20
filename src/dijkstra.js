export default function dijkstra(grid, start, end){
    // console.log(start);
    // console.log(grid);
    let visitedNodes = []
    start.distance = 0;
    const flattenedGrid = flatten(grid);

    // console.log(flattenedGrid);

    while(flattenedGrid.length > 0){
        // console.log(flattenedGrid.length);
        sortNodesByClosest(flattenedGrid);
        const closestNeighbour =  flattenedGrid.shift();
        // console.log(closestNeighbour)
        // console.log(closestNeighbour);
        // console.log(visitedNodes);
        if(closestNeighbour.wall){
            continue;
        }
        if(closestNeighbour.distance === Infinity){
            return visitedNodes;
        }
        closestNeighbour.visited = true;
        visitedNodes.push(closestNeighbour);
        if(closestNeighbour === end){
            return visitedNodes;
        }
        updateUnvisited(closestNeighbour, grid);
    }
}

function flatten(grid){
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}
function sortNodesByClosest(grid){

     grid.sort((nodeOne, nodeTwo) => nodeOne.distance -nodeTwo.distance)
}
function updateUnvisited(close, grid){
    let unvisited = getUnvisitedClose(close, grid);
    for(let neighbor of unvisited){
        neighbor.distance = close.distance + 1;
        // console.log(neighbor.distance);
        neighbor.prevNode = close;
    }
}
function getUnvisitedClose(close, grid){
    let neighbors = [];
    const {x,y} = close;
    // console.log(close);
    // console.log(grid);
    if(x > 0){
        neighbors.push(grid[x-1][y]);
    }
    if(x < grid.length- 1){
        neighbors.push(grid[x+1][y]);
    }
    if(y > 0){
        neighbors.push(grid[x][y-1]);
    }
    if(y < grid[0].length- 1){
        neighbors.push(grid[x][y+1]);
    }
    // console.log(neighbors)
    return neighbors.filter(neighbor => !neighbor.visited);
}

export function getFinalPath(end){
    const nodes = []
    let curr = end;
    while(curr !== null){
        // console.log(curr.prevNode)
        nodes.unshift(curr);
        curr = curr.prevNode;
    }
    return nodes;
}