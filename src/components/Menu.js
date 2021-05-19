import React, {Component} from 'react';
import "./Node.css"
import "./Menu.css"
import {Searching} from "./searchingContext";
export default class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searching: false,
        }
    }
    static contextType = Searching;

    render() {
        if(this.context){
            return (
                <div className={"menu-bar "} id={"options"} aria-disabled={"true"}>
                    {/*     <div className={"option"} aria-disabled={"true"}>
                        <h1>Dijkstra</h1>
                    </div>
                    <div className={"option"} aria-disabled={"true"}>
                        <h1>Search 2</h1>
                    </div>
                    <div className={"option"}>
                        <h1>Search 3</h1>
                    </div >
                    */}<div className={"option"}>
                        <h1 onClick={this.props.reset.bind(this)}>Reset</h1>
                    </div>{/*
                    <div className={"option"} aria-disabled={"true"}>
                        <h1>Settings</h1>
                    </div>*/}
                    <div className={"option"} onClick={this.props.start.bind(this)} aria-disabled={"true"}>
                        <h1>Start</h1>
                    </div>
                </div>
            );
        }else{
            return (
                <div className={"menu-bar "} id={"options"}>
                 {/*   <div className={"option"}>
                        <h1>Dijkstra</h1>
                    </div>

                    <div className={"option"}>
                        <h1>Search 2</h1>
                    </div>
                    <div className={"option"}>
                        <h1>Search 3</h1>
                    </div >

                   */ }<div className={"option"}>
                        <h1 onClick={this.props.reset.bind(this)}>Reset</h1>
                    </div>{/*
                    <div className={"option"}>
                        <h1>Settings</h1>
                    </div>
                    */}
                    <div className={"option"} onClick={this.props.start.bind(this)}>
                        <h1>Start</h1>
                    </div>
                </div>
            );
        }
        return (
            <div className={"menu-bar "} id={"options"}>
                <div className={"option"}>
                    <h1>Dijkstra</h1>
                </div>
                <div className={"option"}>
                    <h1>Search 2</h1>
                </div>
                <div className={"option"}>
                    <h1>Search 3</h1>
                </div >
                <div className={"option"}>
                    <h1 onClick={this.props.reset.bind(this)}>Reset</h1>
                </div>
                <div className={"option"}>
                    <h1>Settings</h1>
                </div>
                <div className={"option"} onClick={this.props.start.bind(this)}>
                    <h1>Start</h1>
                </div>
            </div>
        );
    }
}