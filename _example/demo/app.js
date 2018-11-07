import React from 'react';
import ReactDOM from 'react-dom';
import {Panel, Table} from "react-bootstrap";
import {ZipCodeTW} from "zipcode-tw-react"
import swal from 'sweetalert2';
import './css/demo.css';

class ZipCodeTWTest extends React.Component {

  constructor() {
    super();
    this.state = {
      displayType: 'text',
      countyName1: 'countyValue1',
      countyValue1: '台北市',
      districtName1: 'districtValue1',
      districtValue1: '中山區',
      zipCodeName1: 'zipCodeValue1',
      zipCodeValue1: '104',
      address: '敬業三路20號',
      countyClass: 'form-control',
      countyStyle: undefined,
      districtClass: 'form-control',
      districtStyle: undefined,
      zipCodeClass: 'form-control',
      zipCodeStyle: undefined,
      countyStyleStr: '',
      districtStyleStr: 'marginLeft:\'5px\', minWidth:\'107px\', paddingRight:\'0px\'',
      zipCodeStyleStr: 'marginLeft:\'5px\', width: \'50px\'',
      handleCountyChange: {},
      handleDistrictChange: {},
      handleZipCodeChange: {},
      handleZipCodeBlur: {},
      handleZipCodeNotExists: {},
      addressClass: 'form-control',
      addressStyle: undefined,
      addressStyleStr: '',
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleChangeObj = (e) => {
    let name = e.target.name;
    try {
      this.setState({
        [name.substring(0, name.indexOf('Str'))]: eval(
            '({' + e.target.value + '})'), [e.target.name]: e.target.value
      });
    } catch (ex) {
      this.setState({[e.target.name]: e.target.value});
    }
  }

  handleClick = (e) => {
    let show = this.state.show;
    let displayType = this.state.displayType;
    this.setState({
      show: !show,
      displayType: displayType === 'display' ? 'text' : 'display'
    });
  }

  handleCountyChange = (e) => {
    const {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue} = e;
    this.setState({
      [zipFieldName]: zipValue,
      [countyFieldName]: countyValue,
      [districtFieldName]: districtValue,
      handleCountyChange: e,
      handleDistrictChange: {},
      handleZipCodeChange: {},
      handleZipCodeBlur: {},
      handleZipCodeNotExists: {}
    });
  }

  handleDistrictChange = (e) => {
    const {districtFieldName, districtValue, zipFieldName, zipValue} = e;
    this.setState({
      [zipFieldName]: zipValue,
      [districtFieldName]: districtValue,
      handleDistrictChange: e,
      handleCountyChange: {},
      handleZipCodeChange: {},
      handleZipCodeBlur: {},
      handleZipCodeNotExists: {}
    });
  }

  handleZipCodeChange = (e) => {
    this.setState({
      [e.zipFieldName]: e.zipValue,
      handleZipCodeChange: e,
      handleDistrictChange: {},
      handleCountyChange: {},
      handleZipCodeBlur: {},
      handleZipCodeNotExists: {}
    });
  }

  handleZipCodeBlur = (e) => {
    const {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue} = e;
    this.setState({
      [zipFieldName]: zipValue,
      [countyFieldName]: countyValue,
      [districtFieldName]: districtValue,
      handleZipCodeBlur: e,
      handleDistrictChange: {},
      handleCountyChange: {},
      handleZipCodeChange: {},
      handleZipCodeNotExists: {}
    });
  }

  handleZipCodeNotExists = (e) => {
    const {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue, origZipValue} = e;
    this.setState({
      [zipFieldName]: zipValue,
      [countyFieldName]: countyValue,
      [districtFieldName]: districtValue,
      handleZipCodeNotExists: e,
      handleZipCodeBlur: {},
      handleDistrictChange: {},
      handleCountyChange: {},
      handleZipCodeChange: {}
    });

    swal('郵遞區號不存在: ' + origZipValue, '', 'error');
  }

  render() {
    let countyRtn = JSON.stringify(this.state.handleCountyChange);
    let districtRtn = JSON.stringify(this.state.handleDistrictChange);
    let zipCodeRtn = JSON.stringify(this.state.handleZipCodeChange);
    let zipBlurRtn = JSON.stringify(this.state.handleZipCodeBlur);
    let zipNotExistsRtn = JSON.stringify(this.state.handleZipCodeNotExists);
    let fullAddress = this.state.countyValue1 + this.state.districtValue1
        + this.state.address;
    let addressShow = this.state.displayType === 'display' ? 'none' : 'inline';
    return (
        <div style={{width: '50%', margin: 'auto'}}>
          <div className="form-inline">
            <div style={{
              fontSize: '36px',
            }}> Live Demo
              <div className="pull-right" style={{
                fontSize: '14px', marginTop: '30px'
              }}>
                <a href="https://github.com/Chris-Tsai/zipcode-tw-react">Github</a>
                <a href="https://www.npmjs.com/package/zipcode-tw-react"
                   style={{marginLeft: '10px'}}>Npmjs</a>
              </div>
            </div>
          </div>
          <Panel bsStyle="primary">
            <Panel.Heading>ZipCodeTW with Bootstrap CSS </Panel.Heading>
            <Panel.Body>
              <h4>DisplayType: 'text'</h4>
              <div className="form-inline">
                <ZipCodeTW displayType={this.state.displayType}
                           countyFieldName={this.state.countyName1}
                           countyValue={this.state.countyValue1}
                           districtFieldName={this.state.districtName1}
                           districtValue={this.state.districtValue1}
                           zipCodeFieldName={this.state.zipCodeName1}
                           zipCodeValue={this.state.zipCodeValue1}
                           countyClass={this.state.countyClass}
                           countyStyle={this.state.countyStyle}
                           districtClass={this.state.districtClass}
                           districtStyle={this.state.districtStyle}
                           zipClass={this.state.zipCodeClass}
                           zipStyle={this.state.zipCodeStyle}
                           handleChangeCounty={this.handleCountyChange}
                           handleChangeDistrict={this.handleDistrictChange}
                           handleChangeZipCode={this.handleZipCodeChange}
                           handleBlurZipCode={this.handleZipCodeBlur}
                           handleZipCodeNotExists={this.handleZipCodeNotExists}
                />
                <label style={{marginLeft: '15px'}}>address</label>
                <input name="address" value={this.state.address}
                       className="form-control"
                       placeholder="輸入地址"
                       style={{
                         marginLeft: '5px',
                         width: '300px',
                         display: addressShow
                       }}
                       onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label>Use zipCodePositionLast: false</label>
                <div className="form-inline">
                  <ZipCodeTW displayType={this.state.displayType}
                             countyFieldName={this.state.countyName1}
                             countyValue={this.state.countyValue1}
                             districtFieldName={this.state.districtName1}
                             districtValue={this.state.districtValue1}
                             zipCodeFieldName={this.state.zipCodeName1}
                             zipCodeValue={this.state.zipCodeValue1}
                             countyClass={this.state.countyClass}
                             countyStyle={this.state.countyStyle}
                             districtClass={this.state.districtClass}
                             districtStyle={this.state.districtStyle}
                             zipClass={this.state.zipCodeClass}
                             zipStyle={this.state.zipCodeStyle}
                             handleChangeCounty={this.handleCountyChange}
                             handleChangeDistrict={this.handleDistrictChange}
                             handleChangeZipCode={this.handleZipCodeChange}
                             handleBlurZipCode={this.handleZipCodeBlur}
                             handleZipCodeNotExists={this.handleZipCodeNotExists}
                             zipCodePositionLast={false}
                  />
                </div>
              </div>
              <div className="form-group">
                <h4>DisplayType: 'display'</h4>
                <label>No use address</label>
                <div className="form-inline">
                  <ZipCodeTW displayType='display'
                             countyFieldName={this.state.countyName1}
                             countyValue={this.state.countyValue1}
                             districtFieldName={this.state.districtName1}
                             districtValue={this.state.districtValue1}
                             zipCodeFieldName={this.state.zipCodeName1}
                             zipCodeValue={this.state.zipCodeValue1}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Use address</label>
                <div className="form-inline">
                  <ZipCodeTW displayType='display'
                             countyFieldName={this.state.countyName1}
                             countyValue={this.state.countyValue1}
                             districtFieldName={this.state.districtName1}
                             districtValue={this.state.districtValue1}
                             zipCodeFieldName={this.state.zipCodeName1}
                             zipCodeValue={this.state.zipCodeValue1}
                             address={this.state.address}
                             addressClass={this.state.addressClass}
                             addressStyle={this.state.addressStyle}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Use fullAddress</label>
                <div className="form-inline">
                  <ZipCodeTW displayType='display'
                             countyFieldName={this.state.countyName1}
                             countyValue={this.state.countyValue1}
                             districtFieldName={this.state.districtName1}
                             districtValue={this.state.districtValue1}
                             zipCodeFieldName={this.state.zipCodeName1}
                             zipCodeValue={this.state.zipCodeValue1}
                             fullAddress={fullAddress}
                             addressClass={this.state.addressClass}
                             addressStyle={this.state.addressStyle}
                  />
                </div>
              </div>

              <h4><label> You can change CSS or Style</label></h4>
              <Table striped bordered condensed>
                <thead>
                <tr>
                  <th style={{width: '50px'}}>Prop</th>
                  <th>Value</th>
                  <th style={{width: '50px'}}>Prop</th>
                  <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>countyClass</td>
                  <td><input type="text" className="form-control"
                             name="countyClass" value={this.state.countyClass}
                             onChange={this.handleChange}/>
                  </td>
                  <td>countyStyle</td>
                  <td><input type="text" className="form-control"
                             name="countyStyleStr"
                             value={this.state.countyStyleStr}
                             onChange={this.handleChangeObj}/>
                  </td>
                </tr>
                <tr>
                  <td>districtClass</td>
                  <td><input type="text" className="form-control"
                             name="districtClass"
                             value={this.state.districtClass}
                             onChange={this.handleChange}/>
                  </td>
                  <td>districtStyle</td>
                  <td><input type="text" className="form-control"
                             name="districtStyleStr"
                             value={this.state.districtStyleStr}
                             onChange={this.handleChangeObj}/>
                  </td>
                </tr>
                <tr>
                  <td>zipCodeClass</td>
                  <td><input type="text" className="form-control"
                             name="zipCodeClass" value={this.state.zipCodeClass}
                             onChange={this.handleChange}/>
                  </td>
                  <td>zipCodeStyle</td>
                  <td><input type="text" className="form-control"
                             name="zipCodeStyleStr"
                             value={this.state.zipCodeStyleStr}
                             onChange={this.handleChangeObj}/>
                  </td>
                </tr>
                <tr>
                  <td>addressClass</td>
                  <td><input type="text" className="form-control"
                             name="addressClass" value={this.state.addressClass}
                             onChange={this.handleChange}/>
                  </td>
                  <td>addressStyle</td>
                  <td><input type="text" className="form-control"
                             name="addressStyleStr"
                             value={this.state.addressStyleStr}
                             onChange={this.handleChangeObj}/>
                  </td>
                </tr>
                </tbody>
              </Table>

              <h4><label>Function And Return Object</label></h4>
              <label>handleCountyChange</label>
              <div>
                <pre>{countyRtn}</pre>
              </div>
              <label>handleDistrictChange</label>
              <div>
                <pre>{districtRtn}</pre>
              </div>
              <label>handleZipCodeChange</label>
              <div>
                <pre>{zipCodeRtn}</pre>
              </div>
              <label>handleZipCodeBlur</label>
              <div>
                <pre>{zipBlurRtn}</pre>
              </div>
              <label>handleZipCodeNotExists</label>
              <div>
                <pre>{zipNotExistsRtn}</pre>
              </div>
            </Panel.Body>
          </Panel>
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