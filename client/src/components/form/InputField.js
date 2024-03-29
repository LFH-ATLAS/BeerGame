import React from "react";


import "../../styles/components/InputField.css"
class InputField extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }

    componentDidMount() {
        if(this.props.invalid === true)
            this.setState({error: true})
    }


    onChangeHandler(event) {

        let defaultRestriciton = /[^A-Z0-9]/gi;
        let numericalRestriction = /[^0-9]/gi;
        let temp = event.target.value;
        if(this.props.restriction === "numerical")
        { 
            temp = temp.replace(numericalRestriction,"");
            event.target.value = temp;
            console.log(event.target.value)
            this.props.getValue(event.target.value)
        }
        else if(this.props.restriction === "underTenThousand"){
            temp = temp.replace(numericalRestriction,"");
            event.target.value = temp
            if(parseInt(event.target.value) > 9999){
                event.target.value = "9999"
            }
            console.log(event.target.value)
            this.props.getValue(event.target.value)
        }
        else{
            temp = temp.replace(defaultRestriciton ,"");
            event.target.value = temp;
            this.props.getValue(event.target.value)

        }
    }

    componentWillUnmount() {
        this.props.getValue("")
    }

    render() {
        if(this.props.disabled) {
            return (
                <div className={"input_wrapper"}>
                    <input
                        className={this.state.error ? "invalid" : ""}
                        id={this.props.id}
                        type={"text"}
                        placeholder={this.props.name}
                        name={this.props.name}
                        onChange={(event, category) => this.onChangeHandler(event, category)}
                        disabled = {this.props.disabled}
                        value={this.props.setValue}
                        restriction={this.props.restriction}
                    />
                    {this.props.description ?
                        <p>{this.props.description}</p>
                        :
                        <></>
                    }

                </div>
            );
        }
        else {
            return (
                <div className={"input_wrapper"}>
                    <input
                        className={this.state.error ? "invalid" : ""}
                        type={"text"}
                        placeholder={this.props.name}
                        name={this.props.name}
                        onChange={(event, category) => this.onChangeHandler(event, category)}
                        value={this.props.setValue}
                        restriction={this.props.restriction}
                    />
                    {this.props.description ?
                        <p>{this.props.description}</p>
                        :
                        <></>
                    }

                </div>
            );
        }
    }
}

export default InputField