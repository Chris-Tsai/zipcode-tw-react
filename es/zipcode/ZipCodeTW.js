import * as React from "react";
import PropTypes from "prop-types";
import es6BindAll from "es6bindall";
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
      county: '',
      counties: [],
      district: '',
      districts: [],
      zipCode: '',
      zipCodePlaceholder: '',
    };
    es6BindAll(this, ['handleChangeCounty', 'handleChangeDistrict',
      'handleChangeZipCode', 'handleBlurZipCode', 'findCountyAndDistrictByZipCode']);
  }

  componentDidMount() {
    const counties = Object.keys(RawData);
    const {
      countyValue,
      districtValue,
      zipCodeValue
    } = this.props;
    const county = (countyValue === '') ? counties[0] : countyValue;
    let district;
    let zipCode = !!zipCodeValue ? zipCodeValue : '';

    const districts = !!RawData[county] ? Object.keys(RawData[county]).map((d) => d, []): [];

    if(!!districts && districts.length > 0){
      if (districtValue === '') {
        district = districts[0];
      } else if (districts.indexOf(districtValue) > -1) {
        district = districtValue;
      } else {
        district = districts[0];
      }

      zipCode = RawData[county][district];
    }

    this.setState({
      county,
      counties,
      district,
      districts,
      zipCode,
    });
  }

  handleChangeCounty(county) {
    const districts = Object.keys(RawData[county]).map((d) => d, []);
    let district = districts[0];
    let zipCode = RawData[county][districts[0]];
    let {countyFieldName, districtFieldName, zipCodeFieldName} = this.props;
    this.setState({
      county: county,
      districts: districts,
      district: district,
      zipCode: zipCode,
    });
    !!this.props.handleChangeCounty && this.props.handleChangeCounty({
      'countyFieldName':countyFieldName, 'countyValue': county,
      'districtFieldName':districtFieldName, 'districtValue': district,
      'zipFieldName':zipCodeFieldName,'zipValue':zipCode
    });
  }

  handleChangeDistrict(district){
    let zipCode = RawData[this.state.county][district];
    let {zipCodeFieldName, districtFieldName} = this.props;
    this.setState({
      district: district,
      zipCode: zipCode,
    });
    !!this.props.handleChangeDistrict && this.props.handleChangeDistrict({
      'districtFieldName':districtFieldName, 'districtValue': district,
      'zipFieldName':zipCodeFieldName,'zipValue':zipCode
    });
  }

  handleChangeZipCode(zipCode){
    let zipCodeFieldName = this.props.zipCodeFieldName;
    this.setState({
      zipCode: zipCode,
    });
    !!this.props.handleChangeZipCode && this.props.handleChangeZipCode({
      'zipFieldName':zipCodeFieldName,'zipValue':zipCode
    });
  }

  handleBlurZipCode(zipCode){
    const { county, district } = this.findCountyAndDistrictByZipCode(zipCode);
    const districts = Object.keys(RawData[county]).map((d) => d, []);
    let {countyFieldName, districtFieldName, zipCodeFieldName} = this.props;

    this.setState({county: county, district: district, districts: districts});
    !!this.props.handleBlurZipCode && this.props.handleBlurZipCode({
      'countyFieldName':countyFieldName, 'countyValue': county,
      'districtFieldName':districtFieldName, 'districtValue': district,
      'zipFieldName':zipCodeFieldName,'zipValue':zipCode
    });
  }

  findCountyAndDistrictByZipCode(zipCode){
    let rtn = {}
    Object.keys(RawData).forEach((county) => {
      Object.keys(RawData[county]).forEach((district) => {
        if (RawData[county][district] === zipCode.toString()) {
          rtn = {
            county,
            district,
          };
        }
      });
    });
    return rtn;
  }

  render() {
    const {zipStyle, countyStyle, districtStyle} = this.props;
    const nowCountyStyle = !!countyStyle ? countyStyle:{marginLeft:'5px'};
    const nowDistrictStyle = !!districtStyle ? districtStyle:{marginLeft:'5px', minWidth: '60px'};
    const nowZipStyle = !!zipStyle ? zipStyle:{marginLeft:'5px', width: '50px'};
    return (
        <>
          {this.props.displayType === 'display' ?
              <ZipCode fieldName={this.props.zipCodeFieldName}
                       value={this.props.zipCodeValue}
                       zipClass={this.props.zipClass}
                       zipStyle={nowZipStyle}
                       placeholder={this.props.zipCodePlaceholder}
                       displayType={this.props.displayType}
                       onChange={this.props.handleChangeZipCode}
                       onBlur={this.props.handleBlurZipCode}
              /> : ''
          }

          <County fieldName={this.props.countyFieldName}
                  value={this.props.countyValue}
                  countyClass={this.props.countyClass}
                  countyStyle={nowCountyStyle}
                  dataOptions={this.state.counties}
                  displayType={this.props.displayType}
                  onChange={this.handleChangeCounty}
          />
          <District fieldName={this.props.districtFieldName}
                    value={this.state.district}
                    districtClass={this.props.districtClass}
                    districtStyle={nowDistrictStyle}
                    displayType={this.props.displayType}
                    dataOptions={this.state.districts}
                    onChange={this.handleChangeDistrict}
          />
          {this.props.displayType === 'text' ?
            <ZipCode fieldName={this.props.zipCodeFieldName}
                     value={this.state.zipCode}
                     zipClass={this.props.zipClass}
                     zipStyle={nowZipStyle}
                     placeholder={this.props.zipCodePlaceholder}
                     displayType={this.props.displayType}
                     onChange={this.handleChangeZipCode}
                     onBlur={this.handleBlurZipCode}
            /> : ''
          }
        </>
    );
  }
}

ZipCodeTW.propTypes = {
  displayType: PropTypes.oneOf(['text', 'display']).isRequired,
  countyFieldName: PropTypes.string.isRequired,
  countyValue: PropTypes.string,
  districtFieldName: PropTypes.string.isRequired,
  districtValue: PropTypes.string,
  zipCodeFieldName: PropTypes.string.isRequired,
  zipCodeValue: PropTypes.string,
  zipCodePlaceholder: PropTypes.string,
  handleChangeCounty: PropTypes.func,
  handleChangeDistrict: PropTypes.func,
  handleChangeZipCode: PropTypes.func,
  handleBlurZipCode: PropTypes.func,
  countyClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  countyStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  districtClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  districtStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  zipClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  zipStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
};