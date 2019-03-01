import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../components/Form';

jest.mock('axios', () => {
    return {
      post: jest.fn(() => Promise.resolve('success!')),
    };
}); 

const axios = require('axios');

describe('<Form />', () => {
    it('should render the Form correctly', () => {
        const wrapper = shallow(<Form />);
        expect(wrapper).toMatchSnapshot();
    });
      
    it('should disable button for invalid form submission', () => {
        const wrapper = shallow(<Form />);
        wrapper.find('form').simulate('submit', {
          preventDefault: () => { }
        });
        expect(wrapper.find('button').props().disabled).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should set name on an input change', () => {
        const wrapper = shallow(<Form />);
        const name = 'name'
        const value = 'Aaron Rodgers';
        wrapper.find('ValidatedInput').at(0).simulate('change', {
          name, value 
        });
        expect(wrapper.state('name')).toBe(value);
    });
    
    it('should set message on an input change', () => {
        const wrapper = shallow(<Form />);
        const name = 'message'
        const value = 'say cheese!';
        wrapper.find('ValidatedInput').at(1).simulate('change', {
          name, value 
        });
        expect(wrapper.state('message')).toBe(value);
    });
    
    it("should call onSubmit prop for valid form submission", async (done) => {

        const wrapper = shallow(<Form />);
        
        wrapper.find('ValidatedInput').at(0).simulate('change', {
            name: 'name', 
            value: 'Aaron Rodgers'
        });
        wrapper.find('ValidatedInput').at(1).simulate('change', {
            name: 'message', 
            value: 'say cheese!'
        });
        expect(wrapper.find('button').props().disabled).toBe(false);
        wrapper.find('form').simulate('submit' , {
            preventDefault: () => { }
        });
        expect(axios.post).toHaveBeenCalled();
        done();
        expect(wrapper.state('name')).toEqual('');
        expect(wrapper.state('message')).toEqual('');
    });
})