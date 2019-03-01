import React from 'react';
import { ValidatedInput } from '../../../components/Inputs/ValidatedInput';
import { shallow } from 'enzyme';

describe('<ValidatedInput />', () => {
    it('should render ValidatedInput as an input', () => {
        const onChange = jest.fn();
        const validate = jest.fn();
        const wrapper = shallow(
            <ValidatedInput 
                label="Name" 
                name="name"
                type="text"
                placeholder="Name"
                value=''
                textArea={false}
                validate={validate}
                onChange={onChange}
            />
        ); 
        expect(wrapper).toMatchSnapshot();
    })

    it('should render ValidatedInput as a textarea', () => {
        const onChange = jest.fn();
        const validate = jest.fn();
        const wrapper = shallow(
            <ValidatedInput 
                label="Message" 
                name="message"
                type="text"
                placeholder="Message"
                value=''
                textArea={true}
                validate={validate}
                onChange={onChange}
            />
        ); 
        expect(wrapper).toMatchSnapshot();
    })

    it('should throw error if name is empty', () => {
        const onChange = jest.fn();
        const name = 'name'
        const value = '';
        const wrapper = shallow(
            <ValidatedInput
                label="Name" 
                name={name}
                type="text"
                placeholder="Name"
                value={value}
                validate={val => (val ? false : 'Name is Required')}
                onChange={onChange}
            />
        ); 
        wrapper.find('input').simulate('change', {
        target: { name, value }
        });
        expect(wrapper.state('error')).toBe('Name is Required');
    })

    it('should not error if name is not empty', ()=> {
        const onChange = jest.fn();
        const name = 'name'
        const value = 'Aaron Rodgers';
        const wrapper = shallow(
            <ValidatedInput
                label="Name" 
                name={name}
                type="text"
                placeholder="First Name"
                value={value}
                validate={val => (val ? false : 'Name is Required')}
                onChange={onChange}
            />
        ); 
        wrapper.find('input').simulate('change', {
          target: { name, value }
        });
        expect(wrapper.state('error')).toBe(false);
    });
});