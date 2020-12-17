import React from 'react';
import Node from "./Node";
import dijkstra, {getFinalPath} from "../dijkstra.js"
// import {getFinalPath} from "../dijkstra.js"

// let Nodes = [];
const SCREEN_WIDTH = Math.floor(window.screen.width);
const SCREEN_HEIGHT = Math.floor(window.screen.height);
const BLOCK_DIM = Math.floor(SCREEN_HEIGHT*0.05);
const NUM_COLS = Math.floor(SCREEN_WIDTH/BLOCK_DIM);
const NUM_ROWS = Math.floor(SCREEN_HEIGHT/BLOCK_DIM);
let startNodeX = 0;
let startNodeY = 0;
console.log(BLOCK_DIM)
let endNodeX = Math.floor((SCREEN_WIDTH)/BLOCK_DIM)-1;
let endNodeY = Math.floor((SCREEN_HEIGHT)/BLOCK_DIM)-1;
export default class Plane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseDown: false,
            grid: [],
            done: false
        }

    }

    componentDidMount() {
        const grid = logicalGrid();
        this.setState({grid});
    }

    // genNodes(){
    //     let Nodes = [];
    //     for (let x = 0; x < 900; x+=30){
    //         let row = []
    //         for (let y = 0; y < 900; y+=30){
    //             if(x === 0 && y === 0){
    //                 row.push(<Node id={x + "" + y} down={true} x={x} y={y} />)
    //             }
    //             else if(this.state.mouseDown){
    //                 row.push(<Node id={x + "" + y} down={true} x={x} y={y} />)
    //             }else{
    //                 row.push(<Node id={x + "" + y} down={false} x={x} y={y} />)
    //             }
    //             if(this.state.mouseUp){
    //                 row.push(<Node id={x + "" + y} down={false} x={x} y={y} />)
    //             }
    //
    //         }
    //         Nodes.push(row);
    //     }
    //     return Nodes
    // }


    runDijkstra() {
        let addj = 0;
        const Nodes = this.state.grid;
        let searched = dijkstra(this.state.grid, this.state.grid[startNodeX][startNodeY], this.state.grid[endNodeX][endNodeY]);
        // console.log(searched)
        // console.log(searched);
        console.log(searched)
        for (let node of searched) {
            addj++;
            const {x, y} = node;
            if (node.visited) {
                let flag = false;
                let xF;
                let yF;
                for (let i = 0; i < Nodes.length; i++) {
                    for (let j = 0; j < Nodes[i].length; j++) {
                        if (i  === x && j  === y) {
                            flag = true;
                            xF = i;
                            yF = j;
                            break;
                        }

                    }
                    if (flag) {
                        break;
                    }
                }
                setTimeout(() => {
                    // console.log(xF*30, yF*30)

                    document.getElementById(xF  + " " + yF ).className = "node-visited";
                }, 10 * addj)
            }

        }
        this.shortestPath();
    }

    shortestPath() {
        let nodes = getFinalPath(this.state.grid[endNodeX][endNodeY]);
        for (let i = 0; i < nodes.length; i++) {
            setTimeout(() => {
                console.log(nodes[i].x + " " + nodes[i].y)
                document.getElementById(nodes[i].x + " " + nodes[i].y).className = "node-fin";
            }, 500 * (i ** 0.85));
            if(i === nodes.length-1){
                this.setState({done: true});
            }
        }

    }

    _mouseDown() {
        this.setState({mouseDown: true})
    }

    _mouseUp() {
        this.setState({mouseDown: false})
    }

    _mouseOn(x, y) {
        if (this.state.mouseDown) {
            const wallGrid = addWalls(this.state.grid, x, y);
            this.setState({wallGrid, mouseDown: true})
        } else {
            return;
        }
    }

    render() {
        const {grid, mouseDown} = this.state;
        return (
            <div>

                <div>
                    {
                        grid.map((row, id) => {
                            return row.map((node, nodeId) => {
                                    let {x, y, isStart, isEnd, wall} = node;
                                    let xPos = x;
                                    let yPos = y;
                                    // console.log(x,y)

                                    return (<Node
                                        x={x*BLOCK_DIM}
                                        y={y*BLOCK_DIM}
                                        id={x + " " + y}
                                        isStart={isStart}
                                        isEnd={isEnd}
                                        wall={wall}
                                        mouseIsPressed={mouseDown}
                                        mouseDown={(xPos, yPos) => this._mouseDown(x, y)}
                                        mouseOn={(xPos, yPos) => {
                                            // console.log(x,y);
                                            this._mouseOn(x, y);
                                        }}
                                        mouseUp={() => this._mouseUp()}
                                    />)
                                }
                            )
                        })
                    }
                </div>
                <button style={{position: "absolute", right: 100, top: 100}}
                        onClick={this.runDijkstra.bind(this)}>Start
                </button>
            </div>
        );
    }


}

const logicalNode = (x, y) => {
    return ({
        x,
        y,
        isStart: x === startNodeX && y === startNodeY,
        isEnd: x === endNodeX && y === endNodeY,
        visited: false,
        wall: false,
        prevNode: null,
        distance: Infinity,
    });

}
const logicalGrid = () => {
    let grid = [];
    for (let k = 0; k < NUM_COLS; k += 1) {
        let row = []
        for (let p = 0; p < NUM_ROWS; p += 1) {
            row.push(logicalNode(k, p))
        }
        grid.push(row);
    }
    return grid;
}

function addWalls(grid, x, y) {
    const newGrid = grid.slice();
    let node = newGrid[x][y];
    let newNode = {
        ...node,
        wall: true
    }
    newGrid[x][y] = newNode;
    // return grid[x][y] = {
    //     ...grid[x][y],
    //     wall: true
    // }
    return newGrid
}