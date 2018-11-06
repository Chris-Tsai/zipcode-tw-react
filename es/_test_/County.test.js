import * as React from "react";
import County from "../zipcode/County";
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockStore from "../config_test/mockStore";

Enzyme.configure({adapter: new Adapter()});

function setup(fieldName, value, className, displayType, mockFn) {
  const store = mockStore({
    county: {
      fieldName: fieldName,
      value: value,
      countyClass: className,
      displayType: displayType,
      onChange: mockFn,
      dataOptions: ['台北市','新北市','桃園市','台中市']
    }
  });
  const state = store.getState();
  const props = Object.assign({}, state.county);
  const wrapper = mount(<County {...props}></County>);

  return {
    props,
    wrapper
  }
}

describe('County test', () => {
  it('test displayType= text', () => {
    const onChangeMock = jest.fn();
    const countyFieldName = 'zipName';
    const countyValue = '台北市';
    const changeCountyValue = '新北市';
    const displayType = 'text';
    const countyClass = 'form-control';
    const {wrapper} = setup(countyFieldName, countyValue, countyClass, displayType, onChangeMock);
    expect(wrapper.find('select').props().value).toEqual(countyValue);
    expect(wrapper.find('select').props().name).toEqual(countyFieldName);
    expect(wrapper.find('select').hasClass('form-control')).toBe(true);
    expect(wrapper.find('span').exists()).toBe(false);
    wrapper.find('select').simulate('change', {target: {value: changeCountyValue} });
    expect(onChangeMock).toBeCalledWith(changeCountyValue);
  });

  it('test displayType= text with no function', () => {
    const onChangeMock = undefined;
    const countyFieldName = 'zipName';
    const countyValue = '台北市';
    const changeCountyValue = '新北市';
    const displayType = 'text';
    const countyClass = 'form-control';
    const {wrapper} = setup(countyFieldName, countyValue, countyClass, displayType, onChangeMock);
    expect(wrapper.find('select').props().value).toEqual(countyValue);
    expect(wrapper.find('select').props().name).toEqual(countyFieldName);
    expect(wrapper.find('select').hasClass('form-control')).toBe(true);
    expect(wrapper.find('span').exists()).toBe(false);
    wrapper.find('select').simulate('change', {target: {value: changeCountyValue} });
  });

  it('test displayType= display', () => {
    const countyFieldName = 'zipName';
    const countyValue = '台北市';
    const displayType = 'display';
    const countyClass = 'form-control';
    const {wrapper} = setup(countyFieldName, countyValue, countyClass, displayType);
    expect(wrapper.find('select').exists()).toBe(false);
    expect(wrapper.find('span').exists()).toBe(true);
  });
});