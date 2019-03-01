import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';

export class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guests: []
        }
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/api/guestbook');
            this.setState({
                guests: res.data.posts
            })
        } catch(e) {
            console.log(e);
        }
        
    }

    get guestbookList() {
        return this.state.guests.map(guest => (
            <div>
                <h3>{guest.name}</h3>
                <p>{guest.message}</p>
            </div>
        ));
    }

    render() {
        return (
            <div>
            <Link href="/">Guest Form</Link>
            {this.guestbookList}
            </div>
        )
    }
    
}

export default Feed;