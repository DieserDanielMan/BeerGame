import React from "react";

import "../../styles/components/InputField.css"
import checkIfStringIsValid from "../../lib/checkIfStringIsValid";

class NumericInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        if(this.props.invalid === true)
            this.setState({error: true})
    }


    onChangeHandler(event) {
        if(!checkIfStringIsValid(event.target.value, "numeric")) {
            event.preventDefault()
            this.inputRef.current.value = event.target.value.slice(0, event.target.value.length - 1)

        }
        else {
            event.preventDefault()
            const numValue = parseInt(event)
            if(numValue > 0 && numValue < 100) {
                console.log(event.target.value)
                this.inputRef.current.value = numValue
                this.props.getValue(numValue)
            }
            else {
                this.inputRef.current.value = event.target.value.slice(0, event.target.value.length - 1)
            }
        }

    }

    componentWillUnmount() {
        this.props.getValue("")
    }

    render() {
        return (
            <div className={"input_wrapper"}>
                <input
                    className={this.state.error ? "invalid" : ""}
                    type={"number"}
                    placeholder={this.props.name}
                    name={this.props.name}
                    onChange={(event) => this.onChangeHandler(event)}
                    ref={this.inputRef}
                    min={0}
                    max={100}
                    required={true}
                />
                <p>{this.props.description}</p>
            </div>
        );
    }
}

export default NumericInput