import React from 'react';
import Node from "./Node";
import Menu from "./Menu"
import dijkstra, {getFinalPath} from "../algorithms/dijkstra.js"
import "../fonts/font-awesome-4.7.0/css/font-awesome.css";
import menuClick from "../functions/menuClick";
import {Searching} from "./searchingContext";
// let Nodes = [];
const SCREEN_WIDTH = Math.floor(window.screen.width);
const SCREEN_HEIGHT = Math.floor(window.screen.height);
const BLOCK_DIM = Math.floor(SCREEN_HEIGHT * 0.06);
console.log(BLOCK_DIM)
const NUM_COLS = Math.floor(SCREEN_WIDTH / BLOCK_DIM);
const NUM_ROWS = Math.floor(SCREEN_HEIGHT / BLOCK_DIM);
let startNodeX = 0;
let startNodeY = 0;
console.log(BLOCK_DIM)
let endNodeX = Math.floor((SCREEN_WIDTH) / BLOCK_DIM) - 1;
let endNodeY = Math.floor((SCREEN_HEIGHT) / BLOCK_DIM) - 1;
var c;
var t;



export default class Plane extends React.Component {

    constructor(props) {
        super(props);

        this.reset = this.reset.bind(this)
        this.start = this.runDijkstra.bind(this)
        this.state = {
            mouseDown: false,
            grid: [],
            done: false,
            searching: false,
        }

    }

    componentDidMount() {
        const grid = logicalGrid();
        this.setState({grid});
    }


    reset() {
        console.log("reset")
        // let grid = logicalGrid();
        this.setState({grid: logicalGrid()}, ()=>{
            console.log(this.state.grid);
        });
        console.log(logicalGrid(), this.state.grid)
    }

    runDijkstra() {
        this.setState({searching: true})
        let addj = 0;
        const Nodes = this.state.grid;
        let searched = dijkstra(this.state.grid, this.state.grid[startNodeX][startNodeY], this.state.grid[endNodeX][endNodeY]);
        // console.log(searched)
        let elementArr = [];
        const pathFound = !(searched[searched.length - 1].isEnd);
        for (let p = 0; p < searched.length; p++) {
            addj++;

            const {x, y} = searched[p];
            if (searched[p].visited) {
                let flag = false;
                let xF;
                let yF;
                for (let i = 0; i < Nodes.length; i++) {
                    for (let j = 0; j < Nodes[i].length; j++) {
                        if (i === x && j === y) {
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
                    if (p === searched.length - 1) {
                        this.shortestPath();
                    }

                    if (!searched[p].isEnd && !searched[p].isStart) {
                        elementArr.push((xF + " " + yF));

                        document.getElementById(xF + " " + yF).className = "node-visited";
                    }
                    if (p === searched.length - 1 && pathFound) {
                        for (let x of elementArr) {
                            // console.log(elementArr,x)
                            document.getElementById(x).className = "not-found";
                        }
                    }

                }, 10 * addj)
            }

        }

    }
    notSearching(){
        // this.setState({searching: false})
    }
    shortestPath() {
        let nodes = getFinalPath(this.state.grid[endNodeX][endNodeY]);
        for (let i = 0; i < nodes.length; i++) {
            setTimeout(() => {
                // console.log(nodes[i].x + " " + nodes[i].y)
                if (!nodes[i].isStart && !nodes[i].isEnd) {
                    document.getElementById(nodes[i].x + " " + nodes[i].y).className = "node-fin";
                }
            this.notSearching();
            }, 100 * (i ** 1));
            if (i === nodes.length - 1) {
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
        if (this.state.mouseDown && document.getElementById(x + " " + y).className === "node") {
            const wallGrid = addWalls(this.state.grid, x, y);
            this.setState({wallGrid, mouseDown: true})
        } else {
            return;
        }
    }

    render() {
        const {grid, mouseDown} = this.state;
        return (

            <Searching.Provider value={this.state.searching}>
                {/*<div id={"hamburger"} onClick={menuClick.bind(this)} className={"fa fa-bars"}>*/}
                    <Menu start={this.start} reset={this.reset} />
                {/*</div>*/}
                <div className={"node-container"}>
                    {
                        grid.map((row, id) => {
                            return row.map((node, nodeId) => {
                                    let {x, y, isStart, isEnd, wall, visited} = node;
                                    let xPos = x;
                                    let yPos = y;
                                    // console.log(x,y)

                                    return (<Node
                                        key={x + " " + y}
                                        x={x * BLOCK_DIM}
                                        y={y * BLOCK_DIM}
                                        id={x + " " + y}
                                        isStart={isStart}
                                        isEnd={isEnd}
                                        wall={wall}
                                        blockDim={BLOCK_DIM}
                                        mouseIsPressed={mouseDown}
                                        mouseDown={(xPos, yPos) => this._mouseDown(x, y)}
                                        mouseOn={(xPos, yPos) => {
                                            // console.log(x,y);
                                            this._mouseOn(x, y);
                                        }}
                                        mouseUp={() => this._mouseUp()}
                                        visited = {visited}
                                    />)
                                }
                            )
                        })
                    }
                </div>
            </Searching.Provider>
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

let logicalGrid = () => {
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
    return newGrid
}
