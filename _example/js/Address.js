import React from "react";
import swal from "sweetalert2";
import {ZipCodeTW} from "zipcode-tw-react"

class Address extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayType: 'text',
      county: '台北市',
      district: '中山區',
      zipCode: '104',
      address: '敬業三路20號'
    }
  }

  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value});
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

  // 處理郵遞區號不存在
  handleZipCodeNotExists = (e) =>{
    const {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue, origZipValue} = e;
    this.setState({
      [zipFieldName]: zipValue,
      [countyFieldName]: countyValue,
      [districtFieldName]: districtValue
    });

    swal('郵遞區號不存在: ' + origZipValue, '', 'error');
  }

  render() {
    let addressShow = this.state.displayType === 'display' ? 'none' : 'inline';
    let fullAddress = this.state.county+this.state.district+this.state.address;
    return (
        <>
          <div className="form-group">
            <label>DisplayType: 'text'</label>
            <div className="form-inline">
              <ZipCodeTW displayType={this.state.displayType}
                         countyValue={this.state.county}
                         districtValue={this.state.district}
                         zipCodeValue={this.state.zipCode}
                         handleChangeCounty={this.handleZipCodeChange}
                         handleChangeDistrict={this.handleZipCodeChange}
                         handleChangeZipCode={this.handleZipCodeChange}
                         handleBlurZipCode={this.handleZipCodeChange}
                         handleZipCodeNotExists={this.handleZipCodeNotExists}
              />
              <label style={{marginLeft:'15px'}}>address</label>
              <input name="address" value={this.state.address}
                     className="form-control"
                     placeholder="輸入地址"
                     style={{marginLeft:'5px', width: '300px', display: addressShow}}
                     onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Use zipCodePositionLast: false</label>
            <div className="form-inline">
              <ZipCodeTW displayType={this.state.displayType}
                         countyValue={this.state.county}
                         districtValue={this.state.district}
                         zipCodeValue={this.state.zipCode}
                         handleChangeCounty={this.handleZipCodeChange}
                         handleChangeDistrict={this.handleZipCodeChange}
                         handleChangeZipCode={this.handleZipCodeChange}
                         handleBlurZipCode={this.handleZipCodeChange}
                         handleZipCodeNotExists={this.handleZipCodeNotExists}
                         zipCodePositionLast={false}
              />
            </div>
          </div>
          <br/>
          <div className="form-group">
            <h4>DisplayType: 'display'</h4>
            <label>No use address</label>
            <div className="form-inline">
              <ZipCodeTW displayType='display'
                         countyValue={this.state.county}
                         districtValue={this.state.district}
                         zipCodeValue={this.state.zipCode}
              />
            </div>
          </div>
          <br/>
          <div className="form-group">
            <label>Use address</label>
            <div className="form-inline">
              <ZipCodeTW displayType='display'
                         countyValue={this.state.county}
                         districtValue={this.state.district}
                         zipCodeValue={this.state.zipCode}
                         address={this.state.address}
              />
            </div>
          </div>

          <br/>
          <div className="form-group">
            <label>Use fullAddress</label>
            <div className="form-inline">
              <ZipCodeTW displayType='display'
                         countyValue={this.state.county}
                         districtValue={this.state.district}
                         zipCodeValue={this.state.zipCode}
                         fullAddress={fullAddress}
              />
            </div>
          </div>
        </>
    );
  }
}

export default Address;