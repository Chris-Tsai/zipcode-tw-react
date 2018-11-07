import * as React from "react";
import ZipCodeTW from "../zipcode/ZipCodeTW";
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockStore from "../config_test/mockStore";

Enzyme.configure({adapter: new Adapter()});

function setup(countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue, zipCodePositionLast,
    displayType, mockFn, mockFnD, mockFnZ, notExistsZ, mockBlur, useClass,
    useStyle, address, fullAddress) {
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
      handleChangeDistrict: mockFnD,
      handleChangeZipCode: mockFnZ,
      handleZipCodeNotExists: notExistsZ,
      handleBlurZipCode: mockBlur,
      countyClass: useClass,
      districtClass: useClass,
      zipClass: useClass,
      countyStyle: useStyle,
      districtStyle: useStyle,
      zipStyle: useStyle,
      addressClass: useClass,
      addressStyle: useStyle,
      address: address,
      fullAddress: fullAddress

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
    const onChangeMockD = jest.fn();
    const onChangeMockZ = jest.fn();
    const notExistsZ = jest.fn();
    const onBlurMock = jest.fn();
    const countyFieldName = 'zipName';
    const countyValue = '台北市';
    const districtFieldName = 'district';
    const districtValue = '中正區';
    const zipFieldName = 'zipCode';
    const zipValue = '100';
    const changeValue = '新北市';
    const changeDistrictValue = '萬里區';
    const changeZipValue = '207';
    const displayType = 'text';
    const zipCodePositionLast = false;
    const {wrapper} = setup(countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue,
        zipCodePositionLast, displayType, onChangeMock, onChangeMockD, onChangeMockZ, notExistsZ, onBlurMock);
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

    wrapper.find('select[name=\''+districtFieldName+'\']').simulate('change', {target: {value: changeDistrictValue} });
    expect(onChangeMockD).toBeCalledWith({"countyFieldName": "zipName", "countyValue": "新北市", "districtFieldName": "district", "districtValue": "萬里區", "zipFieldName": "zipCode", "zipValue": "207"
    });

    wrapper.find('input[name=\''+zipFieldName+'\']').simulate('change', {target: {value: changeZipValue} });
    expect(onChangeMockZ).toBeCalledWith({"zipFieldName": "zipCode", "zipValue": "207"
    });

    wrapper.find('input[name=\''+zipFieldName+'\']').simulate('blur', {target: {value: changeZipValue} });
    expect(onBlurMock).toBeCalledWith({"countyFieldName": "zipName", "countyValue": "新北市", "districtFieldName": "district", "districtValue": "萬里區", "zipFieldName": "zipCode", "zipValue": "207"
    });

    wrapper.find('input[name=\''+zipFieldName+'\']').simulate('blur', {target: {value: '999'} });
    expect(notExistsZ).toBeCalledWith({"countyFieldName": "zipName", "countyValue": "", "districtFieldName": "district", "districtValue": "", "zipFieldName": "zipCode", "zipValue": "", "origZipValue":"999"
    });
  });

  it('test displayType= text (undefined)', () => {
    const onChangeMock = jest.fn();
    const onChangeMockD = jest.fn();
    const onChangeMockZ = jest.fn();
    const notExistsZ = jest.fn();
    const onBlurMock = jest.fn();
    const countyFieldName = '';
    const countyValue = '';
    const districtFieldName = '';
    const districtValue = undefined;
    const zipFieldName = '';
    const zipValue = undefined;
    const changeValue = '新北市';
    const changeDistrictValue = '萬里區';
    const changeZipValue = '207';
    const displayType = 'text';
    const useClass = 'form-control';
    const useStyle = {width:'100px'};
    const zipCodePositionLast = false;
    const {wrapper} = setup(countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue,
        zipCodePositionLast, displayType, onChangeMock, onChangeMockD, onChangeMockZ, notExistsZ, onBlurMock, useClass, useStyle);
    expect(wrapper.find('select[name=\'county\']').props().value).toEqual(countyValue);
    expect(wrapper.find('select[name=\'county\']').hasClass('form-control')).toBe(true);

    expect(wrapper.find('select[name=\'district\']').props().value).toEqual(districtValue);
    expect(wrapper.find('select[name=\'district\']').hasClass('form-control')).toBe(true);

    expect(wrapper.find('input[name=\'zipCode\']').props().value).toEqual(zipValue);
    expect(wrapper.find('input[name=\'zipCode\']').hasClass('form-control')).toBe(true);

    wrapper.find('select[name=\'county\']').simulate('change', {target: {value: changeValue} });
    expect(onChangeMock).toBeCalledWith({"countyFieldName": "county", "countyValue": "新北市", "districtFieldName": "district", "districtValue": "萬里區", "zipFieldName": "zipCode", "zipValue": "207"
    });

    wrapper.find('select[name=\'district\']').simulate('change', {target: {value: changeDistrictValue} });
    expect(onChangeMockD).toBeCalledWith({"countyFieldName": "county", "countyValue": "新北市", "districtFieldName": "district", "districtValue": "萬里區", "zipFieldName": "zipCode", "zipValue": "207"
    });

    wrapper.find('input[name=\'zipCode\']').simulate('change', {target: {value: changeZipValue} });
    expect(onChangeMockZ).toBeCalledWith({"zipFieldName": "zipCode", "zipValue": "207"
    });

    wrapper.find('input[name=\'zipCode\']').simulate('blur', {target: {value: changeZipValue} });
    expect(onBlurMock).toBeCalledWith({"countyFieldName": "county", "countyValue": "新北市", "districtFieldName": "district", "districtValue": "萬里區", "zipFieldName": "zipCode", "zipValue": "207"
    });

    wrapper.find('input[name=\'zipCode\']').simulate('blur', {target: {value: '999'} });
    expect(notExistsZ).toBeCalledWith({"countyFieldName": "county", "countyValue": "", "districtFieldName": "district", "districtValue": "", "zipFieldName": "zipCode", "zipValue": "", "origZipValue":"999"
    });

  });

  it('test displayType= text not equal', () => {
    const onChangeMock = jest.fn();
    const onChangeMockD = jest.fn();
    const onChangeMockZ = jest.fn();
    const notExistsZ = jest.fn();
    const onBlurMock = jest.fn();
    const countyFieldName = '';
    const countyValue = '台北市';
    const districtFieldName = '';
    const districtValue = '';
    const zipFieldName = '';
    const zipValue = undefined;
    const displayType = 'text';
    const useClass = 'form-control';
    const useStyle = {width:'100px'};
    const zipCodePositionLast = false;
    const {wrapper} = setup(countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue,
        zipCodePositionLast, displayType, onChangeMock, onChangeMockD, onChangeMockZ, notExistsZ, onBlurMock, useClass, useStyle);
    expect(wrapper.find('select[name=\'county\']').props().value).toEqual(countyValue);
    expect(wrapper.find('select[name=\'county\']').hasClass('form-control')).toBe(true);

    expect(wrapper.find('select[name=\'district\']').props().value).toEqual(districtValue);
    expect(wrapper.find('select[name=\'district\']').hasClass('form-control')).toBe(true);

    expect(wrapper.find('input[name=\'zipCode\']').props().value).toEqual(zipValue);
    expect(wrapper.find('input[name=\'zipCode\']').hasClass('form-control')).toBe(true);

  });

  it('test props', () => {
    const onChangeMock = undefined;
    const onChangeMockD = undefined;
    const onChangeMockZ = undefined;
    const notExistsZ = undefined;
    const onBlurMock = undefined;
    const countyFieldName = '';
    const countyValue = '台北市';
    const districtFieldName = '';
    const districtValue = '';
    const zipFieldName = '';
    const zipValue = undefined;
    const changeValue = '新北市';
    const changeDistrictValue = '萬里區';
    const changeZipValue = '207';
    const displayType = 'text';
    const useClass = 'form-control';
    const useStyle = {width:'100px'};
    const zipCodePositionLast = false;
    const {wrapper} = setup(countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue,
        zipCodePositionLast, displayType, onChangeMock, onChangeMockD, onChangeMockZ, notExistsZ, onBlurMock, useClass, useStyle);
    const prevProp = Object.assign(wrapper.props(), {zipCodeValue: '999'});
    wrapper.instance().componentDidUpdate(prevProp);

    wrapper.find('select[name=\'county\']').simulate('change', {target: {value: changeValue} });

    wrapper.find('select[name=\'district\']').simulate('change', {target: {value: changeDistrictValue} });

    wrapper.find('input[name=\'zipCode\']').simulate('change', {target: {value: changeZipValue} });

    wrapper.find('input[name=\'zipCode\']').simulate('blur', {target: {value: changeZipValue} });

    wrapper.find('input[name=\'zipCode\']').simulate('blur', {target: {value: '999'} });
  });

  it('test displayType= text not equal', () => {
    const onChangeMock = jest.fn();
    const onChangeMockD = jest.fn();
    const onChangeMockZ = jest.fn();
    const notExistsZ = jest.fn();
    const onBlurMock = jest.fn();
    const countyFieldName = '';
    const countyValue = '台北縣';
    const districtFieldName = '';
    const districtValue = '';
    const zipFieldName = '';
    const zipValue = undefined;
    const displayType = 'text';
    const useClass = 'form-control';
    const useStyle = {width:'100px'};
    const zipCodePositionLast = false;
    const {wrapper} = setup(countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue,
        zipCodePositionLast, displayType, onChangeMock, onChangeMockD, onChangeMockZ, notExistsZ, onBlurMock, useClass, useStyle);
    expect(wrapper.find('select[name=\'county\']').props().value).toEqual(countyValue);
    expect(wrapper.find('select[name=\'county\']').hasClass('form-control')).toBe(true);

    expect(wrapper.find('select[name=\'district\']').props().value).toEqual(districtValue);
    expect(wrapper.find('select[name=\'district\']').hasClass('form-control')).toBe(true);

    expect(wrapper.find('input[name=\'zipCode\']').props().value).toEqual(zipValue);
    expect(wrapper.find('input[name=\'zipCode\']').hasClass('form-control')).toBe(true);

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

  it('test displayType= display with address', () => {
    const countyFieldName = 'zipName';
    const countyValue = '台北市';
    const districtFieldName = 'district';
    const districtValue = '中正區';
    const zipFieldName = 'zipCode';
    const zipValue = '100';
    const displayType = 'display';
    const zipCodePositionLast = undefined;
    const {wrapper} = setup(countyFieldName, countyValue, districtFieldName,
        districtValue, zipFieldName, zipValue,
        zipCodePositionLast, displayType, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, '中正路1號');
    expect(
        wrapper.find('select[name=\'' + countyFieldName + '\']').exists()).toBe(
        false);
  });

  it('test displayType= display with fullAddress', () => {
    const countyFieldName = 'zipName';
    const countyValue = '台北市';
    const districtFieldName = 'district';
    const districtValue = '中正區';
    const zipFieldName = 'zipCode';
    const zipValue = '100';
    const displayType = 'display';
    const zipCodePositionLast = undefined;
    const {wrapper} = setup(countyFieldName, countyValue, districtFieldName,
        districtValue, zipFieldName, zipValue,
        zipCodePositionLast, displayType, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, '台北市中正區中正路1號');
    expect(
        wrapper.find('select[name=\'' + countyFieldName + '\']').exists()).toBe(
        false);
  });
});