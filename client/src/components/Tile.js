import React from "react";

import "../styles/components/Tile.css"

class Tile extends React.Component {

    onClickHandler() {
        this.props.getValue(this.props.idKey)
    }

    render() {
        if(this.props.idKey === this.props.currentSelected)
        {
            return (
                <div className={"tile selected"} onClick={() => this.onClickHandler()}>
                    <img src={this.props.imgSrc} className={"selected"} alt={this.props.imgAlt} />
                    <span>{this.props.children}</span>
                </div>
            );
        }
        else
        {
            return (
                <div className={"tile"} onClick={() => this.onClickHandler()}>
                    <img src={this.props.imgSrc} alt={this.props.imgAlt}/>
                    <span>{this.props.children}</span>
                </div>
            );
        }
    }
}

export default Tile