import React from "react";

import "../../styles/components/Container.css"

export default class InnerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: ""
        }
    }

    componentDidMount() {
        if(this.props.classes !== undefined)
        {
            this.setState({classes: this.props.classes})
        }
    }

    render() {
        return (
            <div className={`container ${this.state.classes}`} style={{gridArea: this.props.id}}>
                { this.props.children }
            </div>
        );
    }
}