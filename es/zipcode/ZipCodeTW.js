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
      'handleChangeZipCode', 'handleBlurZipCode', 'findCountyAndDistrict']);
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

  componentWillReceiveProps(nextProps) {

  }

  handleChangeCounty(county) {
    const districts = Object.keys(RawData[county]).map((d) => d, []);
    let district = districts[0];
    let zipCode = RawData[county][districts[0]];
    this.setState({
      county: county,
      districts: districts,
      district: district,
      zipCode: zipCode,
    });
    !!this.props.handleChangeCounty && this.props.handleChangeCounty(county);
    !!this.props.handleChangeDistrict && this.props.handleChangeDistrict(district);
    !!this.props.handleChangeZipCode && this.props.handleChangeZipCode(zipCode);
  }

  handleChangeDistrict(district){
    let zipCode = RawData[this.state.county][district];
    this.setState({
      district: district,
      zipCode: zipCode,
    });
    !!this.props.handleChangeDistrict && this.props.handleChangeDistrict(district);
    !!this.props.handleChangeZipCode && this.props.handleChangeZipCode(zipCode);
  }

  handleChangeZipCode(zipCode){
    this.setState({
      zipCode: zipCode,
    });
    !!this.props.handleChangeZipCode && this.props.handleChangeZipCode(zipCode);
  }

  handleBlurZipCode(zipCode){
    const { county, district } = this.findCountyAndDistrict(zipCode);
    const districts = Object.keys(RawData[county]).map((d) => d, []);
    this.setState({county: county, district: district, districts: districts});
    !!this.props.handleBlurZipCode && this.props.handleBlurZipCode({
      county,district,zipCode
    });
  }

  findCountyAndDistrict(zipCode){
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
    return (
        <>
          {this.props.displayType === 'display' ?
              <ZipCode fieldName={this.props.zipCodeFieldName}
                       value={this.props.zipCodeValue}
                       zipClass={this.props.zipClass}
                       zipStyle={this.props.zipStyle}
                       placeholder={this.props.zipCodePlaceholder}
                       displayType={this.props.displayType}
                       onChange={this.props.handleChangeZipCode}
                       onBlur={this.props.handleBlurZipCode}
              /> : ''
          }

          <County fieldName={this.props.countyFieldName}
                  value={this.props.countyValue}
                  countyStyle={this.props.countyStyle}
                  countyClass={this.props.countyClass}
                  dataOptions={this.state.counties}
                  displayType={this.props.displayType}
                  onChange={this.handleChangeCounty}
          />
          <District fieldName={this.props.districtFieldName}
                    value={this.state.district}
                    districtClass={this.props.districtClass}
                    districtStyle={this.props.districtStyle}
                    displayType={this.props.displayType}
                    dataOptions={this.state.districts}
                    onChange={this.handleChangeDistrict}
          />
          {this.props.displayType === 'text' ?
            <ZipCode fieldName={this.props.zipCodeFieldName}
                     value={this.state.zipCode}
                     zipClass={this.props.zipClass}
                     zipStyle={this.props.zipStyle}
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
  displayType: PropTypes.oneOf(['text', 'display']),
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
  countyClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  countyStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  districtClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  districtStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  zipClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  zipStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
};