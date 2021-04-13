import React from "react";
import EventListener, {withOptions} from "react-event-listener";

import "../css/connector.scss";

export default class Main extends React.Component{
    constructor(props){
        super(props);

        this.boxRef = React.createRef();

        this.state = {
            currentRotationY: 0,
            isAllowed: true,
            boxStyle: {},
            linkToGithub: "https://github.com/SKupisz/RoyalCastleStory"
        };

        this.turnTheCube = this.turnTheCube.bind(this);
        this.rotateYAxis = this.rotateYAxis.bind(this);

    }
    rotateYAxis(mode){
        let operand = this.state.currentRotationY;
        if(mode === 1) operand+=90;
        else if (mode === -1) operand-=90;
        this.setState({
            currentRotationY: operand,
            boxStyle: {transform: "rotateY("+operand+"deg)"}
        }, () => {
            setTimeout(() => {
                this.setState({
                    isAllowed: true
                }, () => {});
            },1000);
        });
    }
    turnTheCube(event){
        console.log(event.key);
        if(event.key === "d" && this.state.isAllowed === true){
            this.setState({
                isAllowed: false
            }, () => {this.rotateYAxis(-1);});
        }
        else if(event.key === "a" && this.state.isAllowed === true){
            this.setState({
                isAllowed: false
            }, () => {this.rotateYAxis(1);});
        }
    }
    render(){
        return <div className="container">
            <EventListener
                target = "window"
                onKeyDown = {withOptions(this.turnTheCube,{capture: true, passive: true})}
            />
            <div className="box" ref = {this.boxRef} style = {this.state.boxStyle}>
                <div className="box-sides front">
                    <div className="content">
                        <header className="welcome-header block-center">Hello</header>
                        <div className="describe block-center">Today, let me show you some history of the Royal Castle in Warsaw</div>
                        <footer className="instructions block-center">Use A and D keys to navigate</footer>
                    </div>
                </div>
                <div className="box-sides back">
                <div className="content">
                        <header className="nowadays-header block-center">Royal Castle nowadays</header>
                        <div className="story block-center">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum at dolor ullam doloremque nostrum repudiandae nesciunt alias voluptas dicta, nobis natus cumque culpa laudantium optio assumenda, officia placeat sunt porro?
                        </div>
                    </div>
                </div>
                <div className="box-sides left">
                    <div className="content">
                        <header className="credits-header block-center">Credits</header>
                        <span className="author-span block-center">Made by Simon G. Kupisz 2021</span>
                        <a href={this.state.linkToGithub} className = "github-link">{this.state.linkToGithub}</a>
                    </div>
                </div>
                <div className="box-sides right">
                    <div className="content">
                        <header className="describe-header block-center">Short history</header>
                        <div className="story block-center">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum at dolor ullam doloremque nostrum repudiandae nesciunt alias voluptas dicta, nobis natus cumque culpa laudantium optio assumenda, officia placeat sunt porro?
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}