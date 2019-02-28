import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidatedInput from '../Inputs/ValidatedInput';

export class ContactForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            message: '',
        }
    }
    

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        name: PropTypes.string,
        message: PropTypes.string,
    }
    

    handleChange = ({ name, value }) => {
        this.setState({
            [name]: value
        });
    }

    get getValidation () {
        const { name, message } = this.state;
        const nameLength = name.length;
        const messageLength = message.length;


        if (nameLength > 0 && messageLength > 0) {
            return false;
        } else {
            return true;
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const { name, message } = this.state;
        this.props.onSubmit({
            name,
            message,
        });
    }
    
    render() {
        return (
            <div>
                <form className="contact-form" onSubmit={this.onSubmit}>
                    <ValidatedInput
                        label="Name" 
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        textArea={false}
                        validate={val => (val ? false : 'Name is Required')}
                    />
                    <ValidatedInput
                        label="Message" 
                        name="message"
                        type="text"
                        placeholder="Message"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        textArea={false}
                        validate={val => (val ? false : 'Message is Required')}
                    />
                    <button type="submit" className="btn btn-primary" disabled={this.getValidation}>{this.props.title}</button>
                </form>
            </div>
        );
    }
}



export default ContactForm;