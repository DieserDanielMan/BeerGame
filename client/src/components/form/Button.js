import React from "react";
import { Link } from "react-router-dom"

import "../../styles/components/Button.css"

class Button extends React.Component {

    onClickHandler(event) {
        event.preventDefault()
        this.props.onClick()
    }

    render() {
        if(this.props.linkTo !== undefined) {
            return (
                <button>
                    <Link to={this.props.linkTo}>
                        {this.props.children}
                    </Link>
                </button>
            )
        }
        else {
            return (
                <button onClick={(event) => this.onClickHandler(event)}>
                    {this.props.children}
                </button>
            );
        }
    }
}

export default Button