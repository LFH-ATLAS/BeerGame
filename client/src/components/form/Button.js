import React from "react";
import { Link } from "react-router-dom"

import "../../styles/components/Button.css"

class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }
    onClickHandler(event) {
        console.log("Button OnClick called")
        event.preventDefault()
        this.props.onClick()
    }

    render() {
        if(this.props.linkTo !== undefined) {
            return (
                <button disabled = {this.props.disabled}>
                    <Link to={this.props.linkTo}>
                        {this.props.children}
                    </Link>
                </button>
            )
        }
        else {
            return (
                <button onClick={(event) => this.onClickHandler(event)}
                        disabled = {this.props.disabled}>
                    {this.props.children}
                </button>
            );
        }
    }
}

export default Button