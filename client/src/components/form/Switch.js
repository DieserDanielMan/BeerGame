import "../../styles/components/Switch.css"

export default function Switch(props) {

    function onChangeHandler(event) {
        props.getValue(event.target.checked)
    }

    return (
        <div className={"switch_wrapper"}>
            <label className={"switch"}>
                <input id={props.id} name={props.id} type="checkbox" onChange={onChangeHandler} checked={props.value}/>
                <span className={"slider_round"} />
            </label>
            { props.children }
        </div>
    )
}