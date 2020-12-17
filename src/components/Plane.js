import React from 'react';
import Node from "./Node";
import dijkstra, {getFinalPath} from "../dijkstra.js"
// import {getFinalPath} from "../dijkstra.js"

// let Nodes = [];
let startNodeX = 180;
let startNodeY = 180;
let endNodeX = 600;
let endNodeY = 600;
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
        let searched = dijkstra(this.state.grid, this.state.grid[6][6], this.state.grid[20][20]);
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
                        if (i * 30 === x && j * 30 === y) {
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
                    console.log(xF*30, yF*30)

                    document.getElementById(xF * 30 + "" + yF * 30).className = "node-visited";
                }, 10 * addj)
            }

        }
        this.shortestPath();
    }

    shortestPath() {
        let nodes = getFinalPath(this.state.grid[20][20]);
        for (let i = 0; i < nodes.length; i++) {
            setTimeout(() => {
                // console.log()
                document.getElementById(nodes[i].x + "" + nodes[i].y).className = "node-fin";
            }, 500 * (i ** 0.85))
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
        // this.genNodes();
        // let Nodes = [];
        const {grid, mouseDown} = this.state;
        // for (let x = 0; x < 900; x+=30){
        //     for (let y = 0; y < 900; y+=30){
        //         if(x === 0 && y === 0){
        //             Nodes.push(<Node id={x + "" + y} down={true} x={x} y={y} />)
        //         }
        //         else if(this.state.mouseDown){
        //             Nodes.push(<Node id={x + "" + y} down={true} x={x} y={y} />)
        //         }else{
        //             Nodes.push(<Node id={x + "" + y} down={false} x={x} y={y} />)
        //         }
        //         if(this.state.mouseUp){
        //             Nodes.push(<Node id={x + "" + y} down={false} x={x} y={y} />)
        //         }
        //
        //     }
        // }
        return (
            <div>
                {/*<div onMouseDown={this._mouseDown.bind(this)} onMouseUp={this._mouseUp.bind(this)}onMouseDown={this._mouseDown.bind(this)} onMouseUp={this._mouseUp.bind(this)>*/}
                <div>
                    {
                        grid.map((row, id) => {
                            return row.map((node, nodeId) => {
                                    let {x, y, isStart, isEnd, wall} = node;
                                    // console.log(x,y)
                                    return (<Node
                                        x={x}
                                        y={y}
                                        id={x + "" + y}
                                        isStart={isStart}
                                        isEnd={isEnd}
                                        wall={wall}
                                        mouseIsPressed={mouseDown}
                                        mouseDown={(x, y) => this._mouseDown(x, y)}
                                        mouseOn={(x, y) => {
                                            this._mouseOn(x, y);
                                        }}
                                        mouseUp={() => this._mouseUp()}
                                    />)
                                }
                            )
                        })
                    }
                    {/*{Nodes}*/}

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
    for (let k = 0; k < 900; k += 30) {
        let row = []
        for (let p = 0; p < 900; p += 30) {
            row.push(logicalNode(k, p))
        }
        grid.push(row);
    }
    return grid;
}

function addWalls(grid, x, y) {
    const newGrid = grid.slice();
    let node = newGrid[x/30][y/30];
    let newNode = {
        ...node,
        wall: true
    }
    newGrid[x/30][y/30] = newNode;
    // return grid[x][y] = {
    //     ...grid[x][y],
    //     wall: true
    // }
    return newGrid
}