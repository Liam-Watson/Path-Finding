import React, {Component} from 'react';
import "./Node.css"
import "./Menu.css"
export default class Menu extends Component{
    constructor(props) {
        super(props);
    }
    render() {
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