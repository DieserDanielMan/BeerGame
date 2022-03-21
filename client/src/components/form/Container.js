import React from "react";

import "../../styles/components/Container.css"

export default class Container extends React.Component {

    settings = {
        id: "",
        mode: {
            grid: "",
            gridRows: "",
            gridColumns: ""
        },
        style: {
            white: "",
            padding: 0
        }
    }

    componentDidMount() {
        this.vars = this.props.settings
        if(this.vars !== undefined)
        {
            if(this.vars.id !== undefined)
            {
                this.settings.id = this.vars.id
            }
            if(this.vars.mode !== undefined)
            {
                if(this.vars.mode.grid !== undefined)
                {
                    this.settings.mode.grid = "grid"

                    if(this.vars.mode.gridRows !== undefined)
                    {
                        this.settings.mode.gridRows = this.vars.mode.gridRows
                    }
                    if(this.vars.mode.gridColumns !== undefined)
                    {
                        this.settings.mode.gridColumns = this.vars.mode.gridColumns
                    }
                }
            }
            if(this.vars.style !== undefined)
            {
                if(this.vars.style.white !== undefined)
                {
                    this.settings.style.white = "white"
                }
                if(this.vars.style.padding !== undefined)
                {
                    this.settings.style.padding = this.vars.style.padding
                }
            }
        }
    }

    render() {
        return (
            <div
                className={`
                    container 
                    ${this.settings.mode.grid}
                    ${this.settings.style.white}`
                }
                style={{
                    gridArea: this.settings.id,
                    padding: this.settings.style.padding + 'px',
                    gridTemplateRows: this.settings.mode.gridRows,
                    gridTemplateColumns: this.settings.mode.gridColumns ? this.settings.mode.gridColumns : <></>
                }}>
                { this.props.children }
            </div>
        );
    }
}