import React from "react";

import "../../styles/components/Button.css"

class Button extends React.Component {

    onClickHandler(event) {
        event.preventDefault()
        this.props.onClick()
    }

    render() {
        return (
            <button onClick={(event) => this.onClickHandler(event)}>
                {this.props.children}
            </button>
        );
    }
}

export default Button