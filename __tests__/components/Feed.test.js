import React from 'react';
import { shallow, mount } from 'enzyme';
import { Feed } from '../../components/Feed';

jest.mock('axios', () => {
    const exampleGuestBook = { posts: [
      { name: 'Aaron Rodgers', message: 'cheese' }
    ]};
    
    return {
      get: jest.fn(() => Promise.resolve(exampleGuestBook)),
    };
});

const axios = require('axios');

describe('<FeedList />', () => {
    it('should render FeedList with empty message', () => {
        const wrapper = shallow(<Feed />);
        expect(wrapper).toMatchSnapshot();
    });

    it('fetch guests on componentDidMount', async (done) => {
        const wrapper = await mount(<Feed />);
          wrapper
          .instance()
          .componentDidMount()
            expect(axios.get).toHaveBeenCalled();
            expect(axios.get).toHaveBeenCalledWith('/api/guestbook');
            done()
            wrapper.update();
 
           expect(wrapper.state('guests')).toEqual([{ name: 'Aaron Rodgers', message: 'cheese' }]);
      });
})