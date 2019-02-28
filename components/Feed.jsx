import React, { Component } from 'react';
import axios from 'axios';

class FeedList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guests: null
        }
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/api/guestbook');
            this.state = {
                guests: res.data
            }
        } catch(e) {
            console.error(e);
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
            <div>{this.guestbookList}</div>
        )
    }
    
}

export default FeedList;