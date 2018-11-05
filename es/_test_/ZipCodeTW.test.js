import * as React from "react";
import ZipCodeTW from "../zipcode/ZipCodeTW";
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockStore from "../config_test/mockStore";

Enzyme.configure({adapter: new Adapter()});

function setup(countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue, zipCodePositionLast, displayType, mockFn, mockBlur) {
  const store = mockStore({
    zipCodeTW: {
      countyFieldName: countyFieldName,
      countyValue: countyValue,
      districtFieldName: districtFieldName,
      districtValue: districtValue,
      zipCodeFieldName: zipFieldName,
      zipCodeValue: zipValue,
      zipCodePositionLast: zipCodePositionLast,
      displayType: displayType,
      handleChangeCounty: mockFn,
      handleBlurZipCode: mockBlur
    }
  });
  const state = store.getState();
  const props = Object.assign({}, state.zipCodeTW);
  const wrapper = mount(<ZipCodeTW {...props}></ZipCodeTW>);

  return {
    props,
    wrapper
  }
}

describe('ZipCodeTW test', () => {
  it('test displayType= text', () => {
    const onChangeMock = jest.fn();
    const onBlurMock = jest.fn();
    const countyFieldName = 'zipName';
    const countyValue = '台北市';
    const districtFieldName = 'district';
    const districtValue = '中正區';
    const zipFieldName = 'zipCode';
    const zipValue = '100';
    const changeValue = '新北市';
    const displayType = 'text';
    const zipCodePositionLast = false;
    const {wrapper} = setup(countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue, zipCodePositionLast, displayType, onChangeMock, onBlurMock);
    expect(wrapper.find('select[name=\''+countyFieldName+'\']').props().value).toEqual(countyValue);
    expect(wrapper.find('select[name=\''+countyFieldName+'\']').props().name).toEqual(countyFieldName);
    expect(wrapper.find('select[name=\''+countyFieldName+'\']').hasClass('form-control')).toBe(true);

    expect(wrapper.find('select[name=\''+districtFieldName+'\']').props().value).toEqual(districtValue);
    expect(wrapper.find('select[name=\''+districtFieldName+'\']').props().name).toEqual(districtFieldName);
    expect(wrapper.find('select[name=\''+districtFieldName+'\']').hasClass('form-control')).toBe(true);

    expect(wrapper.find('input[name=\''+zipFieldName+'\']').props().value).toEqual(zipValue);
    expect(wrapper.find('input[name=\''+zipFieldName+'\']').props().name).toEqual(zipFieldName);
    expect(wrapper.find('input[name=\''+zipFieldName+'\']').hasClass('form-control')).toBe(true);
    wrapper.find('select[name=\''+countyFieldName+'\']').simulate('change', {target: {value: changeValue} });
    expect(onChangeMock).toBeCalledWith({"countyFieldName": "zipName", "countyValue": "新北市", "districtFieldName": "district", "districtValue": "萬里區", "zipFieldName": "zipCode", "zipValue": "207"
    });
  });

  it('test displayType= display', () => {
    const countyFieldName = 'zipName';
    const countyValue = '台北市';
    const districtFieldName = 'district';
    const districtValue = '中正區';
    const zipFieldName = 'zipCode';
    const zipValue = '100';
    const displayType = 'display';
    const zipCodePositionLast = undefined;
    const {wrapper} = setup(countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue, zipCodePositionLast, displayType);
    expect(wrapper.find('select[name=\''+countyFieldName+'\']').exists()).toBe(false);
  });
});