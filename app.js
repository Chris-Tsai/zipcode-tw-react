import React from 'react';
import ReactDOM from 'react-dom';
import es6BindAll from "es6bindall";
import District from "./es/zipcode/District";
import County from "./es/zipcode/County";
import ZipCode from "./es/zipcode/ZipCode";
import ZipCodeTW from "./es/zipcode/ZipCodeTW";

class ComponentTest extends React.Component {

  constructor() {
    super();
    this.state = {
      show: false,
      districtName: 'districtA',
      districtValue: 'ddd',
      displayType: 'text',
      countyName: 'cccc',
      countyValue: '222',
      zipCodeName: 'zip',
      zipCodeValue: '',

    };
    es6BindAll(this, ['handleClick', 'handleCountyChange', 'handleDistrictChange'
      , 'handleZipCodeChange', 'handleZipCodeBlur']);
  }

  handleClick(e) {
    let show = this.state.show;
    let displayType = this.state.displayType;
    this.setState({
      show: !show,
      displayType: displayType === 'display' ? 'text' : 'display'
    });
  }

  handleCountyChange(e) {
    this.setState({countyValue:e});
  }

  handleDistrictChange(e) {
    this.setState({districtValue:e});
  }

  handleZipCodeChange(e) {
    this.setState({zipCodeValue:e});
  }

  handleZipCodeBlur(e) {
    const { county, district, zipCode } = e;
    this.setState({zipCodeValue: zipCode, countyValue:county, districtValue:district});
  }

  render() {

    let countyOptions= ["111","222","333","444"];
    let districtOptions= ["aaa","bbb","ccc","ddd"];
    return (
        <div style={{width: "400px"}}>

          <br/>
          <ZipCodeTW displayType={this.state.displayType}
          countyFieldName={this.state.countyName}
          countyValue={this.state.countyValue}
          districtFieldName={this.state.districtName}
          districtValue={this.state.districtValue}
          zipCodeFieldName={this.state.zipCodeName}
          zipCodeValue={this.state.zipCodeValue}
                     handleChangeCounty={this.handleCountyChange}
                     handleChangeDistrict={this.handleDistrictChange}
                     handleChangeZipCode={this.handleZipCodeChange}
                     handleBlurZipCode={this.handleZipCodeBlur}
          />
          <br/>
          data:
          {this.state.countyValue}
          {this.state.districtValue}
          {this.state.zipCodeValue}
          <br/>
          <button onClick={this.handleClick}>change display</button>
        </div>
    );
  }
}


window.app = {};

app.create = (dom) => {
  ReactDOM.render(
    <ComponentTest/>,
    dom
  )
};