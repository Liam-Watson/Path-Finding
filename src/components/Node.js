import React from 'react';
import "./Node.css"


export default class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        } = this.props;
    }

    _mouseMv() {

        this.setState(past => {
                // console.log(past)
                if (past.wall) {

                    return past
                } else {
                    if (this.props.onMouseDown && past.click) {

                        return {
                            checked: false,
                            wall: true,
                            over: true,
                            move: true,
                            click: true
                        }
                    } else {
                        return (
                            {
                                checked: false,
                                wall: false,
                                move: true,
                                over: false,
                                click: false
                            }
                        )
                    }
                }

            }
        );
    }

    _mouseOver() {
        this.setState(past => {
                // console.log(past)
                if (past.wall) {
                    return past
                } else {
                    if (this.props.onMouseDown && past.over) {
                        return {
                            checked: false,
                            wall: true,
                            over: true,
                            move: true,
                            click: true
                        }
                    } else {
                        return (
                            {
                                checked: false,
                                wall: false,
                                move: false,
                                over: true,
                                click: false
                            }
                        )
                    }
                }

            }
        );
    }

    static getDerivedStateFromProps(props, state) {
        // console.log(props)
        if (props.onMouseDown) {
            return {
                checked: false,
                wall: state.wall,
                move: state.move,
                over: state.over,
                click: true
            }
        } else {
            return {
                checked: false,
                wall: state.wall,
                move: state.move,
                over: state.over,
                click: false
            }
        }

    }

    getWall() {
        return this.state.wall;
    }

    render() {
        const {
            x,
            y,
            id,
            wall,
            isStart,
            isEnd,
            mouseDown,
            mouseOn,
            mouseUp,
            blockDim,
            visited,
        } = this.props;
        if (this.props.isStart) {
            return <div
                style={{top: this.props.y, left: this.props.x, width: blockDim, height: blockDim}}
                className={"node-start"} id={this.props.id}
                onMouseDown={() => mouseDown(x, y)}
                onMouseEnter={() => mouseOn(x, y)}
                onMouseUp={() => mouseUp()}
            />


        } else if (this.props.isEnd) {
            return <div style={{top: this.props.y, left: this.props.x, width: blockDim, height: blockDim}}
                        className={"node-end"} id={this.props.id}/>
        } else if (this.props.wall) {
            return <div
                style={{top: this.props.y, left: this.props.x, width: blockDim, height: blockDim}}
                className={"node-wall"}
                id={this.props.id}
                onMouseDown={() => mouseDown(x, y)}
                onMouseEnter={() => mouseOn(x, y)}
                onMouseUp={() => mouseUp()}
            />
        } /*else if (visited) {
            return <div
                style={{top: this.props.y, left: this.props.x, width: blockDim, height: blockDim}}
                className={"node-visited"}
                id={this.props.id}
                onMouseDown={() => mouseDown(x, y)}
                onMouseEnter={() => mouseOn(x, y)}
                onMouseUp={() => mouseUp()}
            />
        }*/
         else {
            return <div
                style={{top: this.props.y, left: this.props.x, width: blockDim, height: blockDim}}
                className={"node"}
                id={this.props.id}
                onMouseDown={() => mouseDown(x, y)}
                onMouseEnter={() => mouseOn(x, y)}
                onMouseUp={() => mouseUp()}
            />
        }
    }

}