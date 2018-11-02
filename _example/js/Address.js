import es6BindAll from "es6bindall";
import React from "react";
import swal from "sweetalert2";
import {ZipCodeTW} from "zipcode-tw-react"

class Address extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayType: 'text',
      zipName: '台北市',
      zipDistrict: '北投區',
      zipCode: '112',
    }

    es6BindAll(this,
        ['handleZipCodeChange', 'handleZipCodeNotExists']);
  }

  // 變更地址資訊
  handleZipCodeChange(e) {
    const {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue} = e;
    this.setState({
      [zipFieldName]: zipValue,
      [countyFieldName]: countyValue,
      [districtFieldName]: districtValue,
    });
  }

  // 處理郵遞區號不存在
  handleZipCodeNotExists(e) {
    const {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue, origZipValue} = e;
    this.setState({
      [zipFieldName]: zipValue,
      [countyFieldName]: countyValue,
      [districtFieldName]: districtValue
    });

    swal('郵遞區號不存在: ' + origZipValue, '', 'error');
  }

  render() {
    return (
        <>
          <div className="form-group">
            <label>DisplayType: 'text'</label>
            <div className="form-inline">
              <ZipCodeTW displayType={this.state.displayType}
                         countyFieldName="zipName"
                         countyValue={this.state.zipName}
                         districtFieldName="zipDistrict"
                         districtValue={this.state.zipDistrict}
                         zipCodeFieldName="zipCode"
                         zipCodeValue={this.state.zipCode}
                         handleChangeCounty={this.handleZipCodeChange}
                         handleChangeDistrict={this.handleZipCodeChange}
                         handleChangeZipCode={this.handleZipCodeChange}
                         handleBlurZipCode={this.handleZipCodeChange}
                         handleZipCodeNotExists={this.handleZipCodeNotExists}
              />
            </div>
          </div>
          <br/>
          <div className="form-group">
            <label>DisplayType: 'display'</label>
            <div className="form-inline">
              <ZipCodeTW displayType='display'
                         countyFieldName="zipName"
                         countyValue={this.state.zipName}
                         districtFieldName="zipDistrict"
                         districtValue={this.state.zipDistrict}
                         zipCodeFieldName="zipCode"
                         zipCodeValue={this.state.zipCode}
                         handleChangeCounty={this.handleZipCodeChange}
                         handleChangeDistrict={this.handleZipCodeChange}
                         handleChangeZipCode={this.handleZipCodeChange}
                         handleBlurZipCode={this.handleZipCodeChange}
                         handleZipCodeNotExists={this.handleZipCodeNotExists}
              />
            </div>
          </div>
        </>
    );
  }
}

export default Address;