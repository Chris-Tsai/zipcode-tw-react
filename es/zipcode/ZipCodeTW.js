import * as React from "react";
import PropTypes from "prop-types";
import District from "./District";
import County from "./County";
import ZipCode from "./ZipCode";
import RawData from '../data/RawData';

/**
 * 組合元件
 *
 * @author Chris Tsai
 */
export default class ZipCodeTW extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countyFieldName: 'county',
      districtFieldName: 'district',
      zipCodeFieldName: 'zipCode',
      county: 'county',
      counties: [],
      district: 'district',
      districts: [],
      zipCode: 'zipCode',
      zipCodePlaceholder: '',
    };
  }

  componentDidUpdate(prevProps) {
    const {
      countyValue,
      districtValue,
      zipCodeValue
    } = this.props;
    if(prevProps.countyValue !== countyValue
        || prevProps.districtValue !== districtValue
        || prevProps.zipCodeValue !== zipCodeValue) {
      this.initData();
    }
  }

  componentDidMount() {
    this.initData();
  }

  initData = () =>{
    const counties = Object.keys(RawData);
    const {
      countyValue,
      districtValue,
      zipCodeValue,
      countyFieldName,
      districtFieldName,
      zipCodeFieldName
    } = this.props;
    const county = (countyValue === '') ? counties[0] : countyValue;
    let district;
    let zipCode = typeof(zipCodeValue) == 'undefined' ?  '' : zipCodeValue;
    let countyRaw = RawData[county];
    const districts = typeof(countyRaw) == 'undefined'  ? [] : Object.keys(countyRaw).map((d) => d, []);

    if(typeof(districts) != 'undefined' && districts.length > 0){
      if (districtValue === '') {
        district = districts[0];
      } else if (districts.indexOf(districtValue) > -1) {
        district = districtValue;
      } else {
        district = districts[0];
      }
      zipCode = RawData[county][district];
    }

    const nowCountyFieldName = typeof (countyFieldName) != 'undefined' && countyFieldName !== '' ? countyFieldName: 'county';
    const nowDistrictFieldNam = typeof (districtFieldName) != 'undefined' && districtFieldName !== '' ? districtFieldName: 'district';
    const nowZipCodeFieldName = typeof (zipCodeFieldName) != 'undefined' && zipCodeFieldName !== '' ? zipCodeFieldName: 'zipCode';

    this.setState({
      county, district, zipCode,
      counties, districts,
      countyFieldName: nowCountyFieldName,
      districtFieldName: nowDistrictFieldNam,
      zipCodeFieldName: nowZipCodeFieldName
    });
  }

  handleChangeCounty = (county) => {
    const districts = Object.keys(RawData[county]).map((d) => d, []);
    let district = districts[0];
    let zipCode = RawData[county][districts[0]];
    let {handleChangeCounty} = this.props;
    let {countyFieldName, districtFieldName, zipCodeFieldName} = this.state;
    this.setState({
      county: county,
      districts: districts,
      district: district,
      zipCode: zipCode,
    }, () => {
      if(typeof (handleChangeCounty) == 'function'){
        handleChangeCounty({
          'countyFieldName':countyFieldName, 'countyValue': county,
          'districtFieldName':districtFieldName, 'districtValue': district,
          'zipFieldName':zipCodeFieldName,'zipValue':zipCode
        });
      }
    });
  }

  handleChangeDistrict = (district) =>{
    let zipCode = RawData[this.state.county][district];
    let {handleChangeDistrict} = this.props;
    let {countyFieldName, districtFieldName, zipCodeFieldName} = this.state;
    this.setState({
      district: district,
      zipCode: zipCode,
    }, () => {
      if(typeof (handleChangeDistrict) == 'function'){
        handleChangeDistrict({
          'countyFieldName': countyFieldName, 'countyValue': this.state.county,
          'districtFieldName':districtFieldName, 'districtValue': district,
          'zipFieldName':zipCodeFieldName,'zipValue':zipCode
        });
      }
    });
  }

  handleChangeZipCode = (zipCode) =>{
    let {handleChangeZipCode} = this.props;
    let {zipCodeFieldName} = this.state;
    this.setState({
      zipCode: zipCode,
    }, () =>{
      if(typeof (handleChangeZipCode) == 'function'){
        handleChangeZipCode({
          'zipFieldName':zipCodeFieldName,'zipValue':zipCode
        });
      }
    });
  }

  handleBlurZipCode = (zipCode) =>{
    const { countyN, districtN } = this.findCountyAndDistrictByZipCode(zipCode);
    let {handleZipCodeNotExists, handleBlurZipCode} = this.props;
    let {countyFieldName, districtFieldName, zipCodeFieldName} = this.state;
    if(typeof(countyN) != 'undefined' && typeof(districtN) != 'undefined'){
      const districts = Object.keys(RawData[countyN]).map((d) => d, []);
      this.setState({
        county: countyN, district: districtN, districts: districts
      }, () =>{
        if(typeof (handleBlurZipCode) == 'function'){
          handleBlurZipCode({
            'countyFieldName':countyFieldName, 'countyValue': countyN,
            'districtFieldName':districtFieldName, 'districtValue': districtN,
            'zipFieldName':zipCodeFieldName,'zipValue':zipCode
          });
        }
      });
    }else{
      this.setState({
        county: '', district: '', districts: [], zipCode: ''
      }, () =>{
        if(typeof (handleZipCodeNotExists) == 'function'){
          handleZipCodeNotExists({
            'countyFieldName':countyFieldName, 'countyValue': '',
            'districtFieldName':districtFieldName, 'districtValue': '',
            'zipFieldName':zipCodeFieldName,'zipValue':'', 'origZipValue': zipCode
          });
        }
      });
    }
  }

  findCountyAndDistrictByZipCode = (zipCode) =>{
    let rtn = {}
    Object.keys(RawData).forEach((countyN) => {
      Object.keys(RawData[countyN]).forEach((districtN) => {
        if (RawData[countyN][districtN] === zipCode.toString()) {
          rtn = {
            countyN,
            districtN,
          };
        }
      });
    });
    return rtn;
  }

  render() {
    const {zipStyle, countyStyle, districtStyle, zipClass, countyClass, districtClass, displayType, zipCodePositionLast} = this.props;
    const {fullAddress, address, addressClass, addressStyle} = this.props;
    const displayTypeFlag = (displayType === 'display') ? true : false;
    const nowZipCodePositionLast = typeof (zipCodePositionLast) != 'undefined' ? zipCodePositionLast : true;
    const nowCountyStyle = typeof (countyStyle) != 'undefined' ? countyStyle: nowZipCodePositionLast ? {} : {marginLeft:'5px'};
    const nowDistrictStyle =
        typeof (districtStyle) != 'undefined' ? districtStyle: displayTypeFlag ? {} : {marginLeft:'5px', minWidth:'107px', paddingRight:'0px'};
    const nowZipStyle =
        typeof (zipStyle) != 'undefined' ? zipStyle: (!displayTypeFlag && !nowZipCodePositionLast) ? {width: '50px'} :  {marginLeft:'5px', width: '50px'};
    const nowCountyClass =
        typeof (countyClass) != 'undefined' ? countyClass: 'form-control';
    const nowDistrictClass =
        typeof (districtClass) != 'undefined' ? districtClass: 'form-control';
    const nowZipClass =
        typeof (zipClass) != 'undefined' ? zipClass: 'form-control';
    const nowAddressClass =
        typeof (addressClass) != 'undefined' ? addressClass: 'form-control';


    return (
        <>
          {displayTypeFlag || (!displayTypeFlag && !nowZipCodePositionLast)  ?
              <ZipCode fieldName={this.state.zipCodeFieldName}
                       value={this.props.zipCodeValue}
                       zipClass={nowZipClass}
                       zipStyle={nowZipStyle}
                       placeholder={this.props.zipCodePlaceholder}
                       displayType={displayType}
                       onChange={this.handleChangeZipCode}
                       onBlur={this.handleBlurZipCode}
              /> : ''
          }

          {typeof (fullAddress) != 'undefined' && fullAddress !== '' && displayTypeFlag ?
              <span className={nowAddressClass} style={addressStyle}
                    readOnly={true}
                    disabled={true}
              >{fullAddress}</span> : <>
                <County fieldName={this.state.countyFieldName}
                        value={this.props.countyValue}
                        countyClass={nowCountyClass}
                        countyStyle={nowCountyStyle}
                        dataOptions={this.state.counties}
                        displayType={displayType}
                        onChange={this.handleChangeCounty}
                />
                <District fieldName={this.state.districtFieldName}
                          value={this.props.districtValue}
                          districtClass={nowDistrictClass}
                          districtStyle={nowDistrictStyle}
                          displayType={displayType}
                          dataOptions={this.state.districts}
                          onChange={this.handleChangeDistrict}
                />
                {!displayTypeFlag && nowZipCodePositionLast ?
                    <ZipCode fieldName={this.state.zipCodeFieldName}
                             value={this.props.zipCodeValue}
                             zipClass={nowZipClass}
                             zipStyle={nowZipStyle}
                             placeholder={this.props.zipCodePlaceholder}
                             displayType={displayType}
                             onChange={this.handleChangeZipCode}
                             onBlur={this.handleBlurZipCode}
                    /> : ''
                }
                {typeof (address) != 'undefined' && address !== '' && displayTypeFlag ?
                    <span className={nowAddressClass} style={addressStyle}
                          readOnly={true}
                          disabled={true}>{address}</span> : ''
                }
              </>
          }
        </>
    );
  }
}

ZipCodeTW.propTypes = {
  displayType: PropTypes.oneOf(['text', 'display']).isRequired,
  fullAddress: PropTypes.string,
  zipCodePositionLast: PropTypes.bool,
  address: PropTypes.string,
  countyFieldName: PropTypes.string,
  countyValue: PropTypes.string,
  districtFieldName: PropTypes.string,
  districtValue: PropTypes.string,
  zipCodeFieldName: PropTypes.string,
  zipCodeValue: PropTypes.string,
  zipCodePlaceholder: PropTypes.string,
  handleChangeCounty: PropTypes.func,
  handleChangeDistrict: PropTypes.func,
  handleChangeZipCode: PropTypes.func,
  handleBlurZipCode: PropTypes.func,
  handleZipCodeNotExists: PropTypes.func,
  countyClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  countyStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  districtClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  districtStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  zipClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  zipStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  addressClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  addressStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
};