import * as React from "react";
import District from "../zipcode/District";
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockStore from "../config_test/mockStore";

Enzyme.configure({adapter: new Adapter()});

function setup(fieldName, value, className, displayType, mockFn) {
  const store = mockStore({
    district: {
      fieldName: fieldName,
      value: value,
      districtClass: className,
      displayType: displayType,
      onChange: mockFn,
      dataOptions: ['北區','東區','西區','南區']
    }
  });
  const state = store.getState();
  const props = Object.assign({}, state.district);
  const wrapper = mount(<District {...props}></District>);

  return {
    props,
    wrapper
  }
}

describe('District test', () => {
  it('test displayType= text', () => {
    const onChangeMock = jest.fn();
    const fieldName = 'district';
    const value = '東區';
    const changeValue = '西區';
    const displayType = 'text';
    const className = 'form-control';
    const {wrapper} = setup(fieldName, value, className, displayType, onChangeMock);
    expect(wrapper.find('select').props().value).toEqual(value);
    expect(wrapper.find('select').props().name).toEqual(fieldName);
    expect(wrapper.find('select').hasClass('form-control')).toBe(true);
    expect(wrapper.find('span').exists()).toBe(false);
    wrapper.find('select').simulate('change', {target: {value: changeValue} });
    expect(onChangeMock).toBeCalledWith(changeValue);
  });

  it('test displayType= text with no function', () => {
    const onChangeMock = undefined;
    const fieldName = 'district';
    const value = '東區';
    const changeValue = '西區';
    const displayType = 'text';
    const className = 'form-control';
    const {wrapper} = setup(fieldName, value, className, displayType, onChangeMock);
    expect(wrapper.find('select').props().value).toEqual(value);
    expect(wrapper.find('select').props().name).toEqual(fieldName);
    expect(wrapper.find('select').hasClass('form-control')).toBe(true);
    expect(wrapper.find('span').exists()).toBe(false);
    wrapper.find('select').simulate('change', {target: {value: changeValue} });
  });

  it('test displayType= display', () => {
    const fieldName = 'district';
    const value = '東區';
    const displayType = 'display';
    const className = 'form-control';
    const {wrapper} = setup(fieldName, value, className, displayType);
    expect(wrapper.find('select').exists()).toBe(false);
    expect(wrapper.find('span').exists()).toBe(true);
  });
});