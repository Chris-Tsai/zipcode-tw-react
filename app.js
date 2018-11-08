import React from 'react';
import ReactDOM from 'react-dom';
import ZipCodeTW from "./es/zipcode/ZipCodeTW";

class ZipCodeTWTest extends React.Component {

  constructor() {
    super();
    this.state = {
      county: '',
      district: '',
      zipCode: '',
    }
  }

  // 變更地址資訊
  handleZipCodeChange = (e) =>{
    const {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue} = e;
    this.setState({
      [zipFieldName]: zipValue,
      [countyFieldName]: countyValue,
      [districtFieldName]: districtValue,
    });
  }

  render() {
    return (
        <div style={{width:'50%', margin: 'auto'}}>
          <h1> Example </h1>
          <div style={{
            display: 'inline-block',
            width: 'auto',
            verticalAlign: 'middle'
          }}>
            <ZipCodeTW displayType='text'
                       countyValue={this.state.county}
                       districtValue={this.state.district}
                       zipCodeValue={this.state.zipCode}
                       countyStyle={{width: '100px', display: 'inline'}}
                       districtStyle={{
                         width: '100px',
                         marginLeft: '5px',
                         display: 'inline'
                       }}
                       zipStyle={{
                         width: '60px',
                         marginLeft: '5px',
                         display: 'inline'
                       }}
                       handleChangeCounty={this.handleZipCodeChange}
                       handleChangeDistrict={this.handleZipCodeChange}
                       handleChangeZipCode={this.handleZipCodeChange}
                       handleBlurZipCode={this.handleZipCodeChange}
                       handleZipCodeNotExists={this.handleZipCodeChange}
            ></ZipCodeTW>
          </div>
        </div>
    );
  }
}

window.app = {};

app.create = (dom) => {
  ReactDOM.render(
    <ZipCodeTWTest/>,
    dom
  )
};