import React, { Component } from 'react';
import ValidatedInput from './Inputs/ValidatedInput';
import Link from 'next/link';
import axios from 'axios';

export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            message: '',
            status: ''
        }
    }

    handleChange = ({ name, value }) => {
        this.setState({
            [name]: value,
            status: ''
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

    handleSubmit = e => {
        e.preventDefault();
        const { name, message } = this.state;
        axios.post('/api/guestbook', { name, message });
        this.setState({
            name: '',
            message: '',
            status: 'Success!'
        });
    }
    
    render() {
        return (
            <div>
                <Link href="/guestbook">Feed</Link>
                <form className="contact-form" onSubmit={this.handleSubmit}>
                    <ValidatedInput
                        label="Name" 
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        textArea={false}
                        validate={val => (val ? false : 'Name is Required')}
                    />
                    <ValidatedInput
                        label="Message" 
                        name="message"
                        type="text"
                        placeholder="Message"
                        value={this.state.message}
                        onChange={this.handleChange}
                        textArea={true}
                        validate={val => (val ? false : 'Message is Required')}
                    />
                    <button type="submit" className="btn btn-primary" disabled={this.getValidation}>Add to Guest Book</button>
                    <span style={{ color: 'green' }}>{this.state.status}</span> 
                </form>
            </div>
        );
    }
}



export default Form;