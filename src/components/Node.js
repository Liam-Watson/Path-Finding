import React from 'react';
import "./Node.css"


export default class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // checked: false,
            // wall: false,
            // over: false,
            // move: false,
            // click: false

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
        } = this.props;
        if (this.props.isStart) {
            return <div
                style={{top: this.props.y, left: this.props.x}}
                className={"node-start"} id={this.props.id}
                onMouseDown={()=> mouseDown(x,y)}
                onMouseEnter={()=> mouseOn(x,y)}
                onMouseUp={() => mouseUp()}
            />


        } else if (this.props.isEnd) {
            return <div style={{top: this.props.y, left: this.props.x}} className={"node-end"} id={this.props.id}/>
        } else if (this.props.wall) {
            return <div
                style={{top: this.props.y, left: this.props.x}}
                className={"node-wall"}
                id={this.props.id}
                onMouseDown={()=> mouseDown(x,y)}
                onMouseEnter={()=> mouseOn(x,y)}
                onMouseUp={() => mouseUp()}
            />
        } else {
            return <div
                style={{top: this.props.y, left: this.props.x}}
                className={"node"}
                id={this.props.id}
                onMouseDown={()=> mouseDown(x,y)}
                onMouseEnter={()=> mouseOn(x,y)}
                onMouseUp={() => mouseUp()}
            />
        }
        // if(this.state.wall){
        //     return <button id={this.props.id} onMouseOver={this._mouseOver.bind(this)} onMouseMove={this._mouseMv.bind(this)} style={{backgroundColor: "aqua", left: this.props.x, top: this.props.y, width: 30, height:30, position: "absolute"}}></button>
        // }else if(this.props.x === 180 && this.props.y === 180){
        //     return <button id={this.props.id} onMouseOver={this._mouseOver.bind(this)} onMouseMove={this._mouseMv.bind(this)} style={{backgroundColor: "green", left: this.props.x, top: this.props.y, width: 30, height:30, position: "absolute"}}></button>
        // }else if(this.props.x === 600 && this.props.y === 600){
        //     return <button id={this.props.id} onMouseOver={this._mouseOver.bind(this)} onMouseMove={this._mouseMv.bind(this)} style={{backgroundColor: "red", left: this.props.x, top: this.props.y, width: 30, height:30, position: "absolute"}}></button>
        // }else if(this.state.checked){
        //     return <button id={this.props.id} onMouseOver={this._mouseOver.bind(this)} onMouseMove={this._mouseMv.bind(this)} style={{backgroundColor: "black", left: this.props.x, top: this.props.y, width: 30, height:30, position: "absolute"}}></button>
        // }else if(this.props.visited){
        //     return <button id={this.props.id} onMouseOver={this._mouseOver.bind(this)} onMouseMove={this._mouseMv.bind(this)} style={{backgroundColor: "black", left: this.props.x, top: this.props.y, width: 30, height:30}}></button>
        // }else{
        //     return (
        //         <button id={this.props.id} onMouseOver={this._mouseOver.bind(this)} onMouseMove={this._mouseMv.bind(this)} style={{ left: this.props.x, top: this.props.y, width:30, height:30, position: "absolute"}}></button>
        //     )
        // }

    }

}