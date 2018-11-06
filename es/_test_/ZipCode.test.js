import * as React from "react";
import ZipCode from "../zipcode/ZipCode";
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockStore from "../config_test/mockStore";

Enzyme.configure({adapter: new Adapter()});

function setup(fieldName, value, className, displayType, mockFn, mockBlur) {
  const store = mockStore({
    zipCode: {
      fieldName: fieldName,
      value: value,
      zipClass: className,
      displayType: displayType,
      onChange: mockFn,
      onBlur: mockBlur
    }
  });
  const state = store.getState();
  const props = Object.assign({}, state.zipCode);
  const wrapper = mount(<ZipCode {...props}></ZipCode>);

  return {
    props,
    wrapper
  }
}

describe('ZipCode test', () => {
  it('test displayType= text', () => {
    const onChangeMock = jest.fn();
    const onBlurMock = jest.fn();
    const fieldName = 'zipCode';
    const value = '100';
    const changeValue = '111';
    const displayType = 'text';
    const className = 'form-control';
    const {wrapper} = setup(fieldName, value, className, displayType, onChangeMock, onBlurMock);
    expect(wrapper.find('input').props().value).toEqual(value);
    expect(wrapper.find('input').props().name).toEqual(fieldName);
    expect(wrapper.find('input').hasClass('form-control')).toBe(true);
    expect(wrapper.find('span').exists()).toBe(false);
    wrapper.find('input').simulate('change', {target: {value: changeValue} });
    expect(onChangeMock).toBeCalledWith(changeValue);

    wrapper.find('input').simulate('blur', {target: {value: changeValue} });
    expect(onBlurMock).toBeCalledWith(changeValue);
  });

  it('test displayType= text with no function', () => {
    const onChangeMock = undefined;
    const onBlurMock = undefined;
    const fieldName = 'zipCode';
    const value = '100';
    const changeValue = '111';
    const displayType = 'text';
    const className = 'form-control';
    const {wrapper} = setup(fieldName, value, className, displayType, onChangeMock, onBlurMock);
    expect(wrapper.find('input').props().value).toEqual(value);
    expect(wrapper.find('input').props().name).toEqual(fieldName);
    expect(wrapper.find('input').hasClass('form-control')).toBe(true);
    expect(wrapper.find('span').exists()).toBe(false);
    wrapper.find('input').simulate('change', {target: {value: changeValue} });

    wrapper.find('input').simulate('blur', {target: {value: changeValue} });
  });

  it('test displayType= display', () => {
    const fieldName = 'zipCode';
    const value = '100';
    const displayType = 'display';
    const className = 'form-control';
    const {wrapper} = setup(fieldName, value, className, displayType);
    expect(wrapper.find('input[type=\'text\']').exists()).toBe(false);
    expect(wrapper.find('span').exists()).toBe(true);
  });
});