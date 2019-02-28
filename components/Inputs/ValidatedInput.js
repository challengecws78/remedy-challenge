import React, { Component } from 'react'

export class ValidatedInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            error: false
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return { value: nextProps.value }
    }

    handleChange = (e) => {
        const name = this.props.name;
        const { value } = e.target
        const error = this.props.validate ? this.props.validate(value) : false;
        this.setState({ value, error });
        this.props.onChange({ name, value });
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input
                    name={this.props.name}
                    type={this.props.type}
                    className="form-control"
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.handleChange}                   
                />
                <span style={{ color: 'red' }}>{this.state.error}</span>            
            </div>
        )
    }
}

export default ValidatedInput;