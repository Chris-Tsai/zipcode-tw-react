import React from 'react';
import ReactDOM from 'react-dom';
import es6BindAll from "es6bindall";
import {Panel, Table} from "react-bootstrap";
import ZipCodeTW from "./es/zipcode/ZipCodeTW";
import swal from 'sweetalert2';

class ZipCodeTWTest extends React.Component {

  constructor() {
    super();
    this.state = {
      displayType: 'text',
      countyName1: 'countyValue1',
      countyValue1: '台北市',
      districtName1: 'districtValue1',
      districtValue1: '中正區',
      zipCodeName1: 'zipCodeValue1',
      zipCodeValue1: '100',
      address: '',
      countyClass: 'form-control',
      countyStyle: undefined,
      districtClass: 'form-control',
      districtStyle: undefined,
      zipCodeClass: 'form-control',
      zipCodeStyle: undefined,
      countyStyleStr:'',
      districtStyleStr:'marginLeft:\'5px\', minWidth:\'107px\', paddingRight:\'0px\'',
      zipCodeStyleStr:'marginLeft:\'5px\', width: \'50px\'',
      handleCountyChange: {},
      handleDistrictChange: {},
      handleZipCodeChange: {},
      handleZipCodeBlur: {},
      handleZipCodeNotExists: {}
    };
    es6BindAll(this, ['handleClick', 'handleCountyChange', 'handleDistrictChange'
      , 'handleZipCodeChange', 'handleZipCodeBlur', 'handleChange', 'handleChangeObj', 'handleZipCodeNotExists']);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleChangeObj(e){
    let name = e.target.name;
    try{
      this.setState({[name.substring(0, name.indexOf('Str'))]: eval('({' + e.target.value + '})'), [e.target.name]:e.target.value});
    }catch (ex) {
      this.setState({[e.target.name]:e.target.value});
    }
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
    const { countyFieldName, countyValue,districtFieldName, districtValue, zipFieldName, zipValue } = e;
    this.setState({[zipFieldName]: zipValue, [countyFieldName]:countyValue, [districtFieldName]:districtValue, handleCountyChange:e, handleDistrictChange:{}, handleZipCodeChange: {}, handleZipCodeBlur:{}, handleZipCodeNotExists: {}});
  }

  handleDistrictChange(e) {
    const {districtFieldName, districtValue, zipFieldName, zipValue } = e;
    this.setState({[zipFieldName]: zipValue, [districtFieldName]:districtValue, handleDistrictChange:e, handleCountyChange:{}, handleZipCodeChange: {}, handleZipCodeBlur:{}, handleZipCodeNotExists: {}});
  }

  handleZipCodeChange(e) {
    this.setState({[e.zipFieldName]:e.zipValue, handleZipCodeChange:e, handleDistrictChange:{}, handleCountyChange:{}, handleZipCodeBlur:{}, handleZipCodeNotExists: {}});
  }

  handleZipCodeBlur(e) {
    const { countyFieldName, countyValue,districtFieldName, districtValue, zipFieldName, zipValue } = e;
    this.setState({[zipFieldName]: zipValue, [countyFieldName]:countyValue, [districtFieldName]:districtValue, handleZipCodeBlur:e, handleDistrictChange:{}, handleCountyChange:{}, handleZipCodeChange: {}, handleZipCodeNotExists: {}});
  }

  handleZipCodeNotExists(e){
    const { countyFieldName, countyValue,districtFieldName, districtValue, zipFieldName, zipValue, origZipValue } = e;
    this.setState({[zipFieldName]: zipValue, [countyFieldName]:countyValue, [districtFieldName]:districtValue, handleZipCodeNotExists:e, handleZipCodeBlur:{}, handleDistrictChange:{}, handleCountyChange:{}, handleZipCodeChange: {}});

    swal('郵遞區號不存在: '+origZipValue,'' ,'error');
  }

  render() {
    let countyRtn = JSON.stringify(this.state.handleCountyChange);
    let districtRtn = JSON.stringify(this.state.handleDistrictChange);
    let zipCodeRtn = JSON.stringify(this.state.handleZipCodeChange);
    let zipBlurRtn = JSON.stringify(this.state.handleZipCodeBlur);
    let zipNotExistsRtn = JSON.stringify(this.state.handleZipCodeNotExists);
    let fullAddress = this.state.countyValue1+this.state.districtValue1+this.state.address;
    let addressShow = this.state.displayType === 'display' ? 'none' : 'inline';
    return (
        <div style={{width:'50%', margin: 'auto'}}>
          <h1> Live Demo </h1>
          <Panel bsStyle="primary">
            <Panel.Heading>ZipCodeTW with Bootstrap CSS </Panel.Heading>
            <Panel.Body>
              <label> ZipCodeTW with {'<div className="form-inline">'}</label>
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
                           fullAddress={fullAddress}
                           address={this.state.address}
                />
                <input name="address" value={this.state.address}
                       className="form-control"
                       placeholder="輸入地址"
                       style={{marginLeft:'5px', width: '300px', display: addressShow}}
                       onChange={this.handleChange}
                />
              </div>
              <br/>
              <div>
                <button className="btn-xs btn-success" onClick={this.handleClick}>Change DisplayType</button>
              </div>

              <h4><label> You can change CSS or Style</label></h4>
              <Table striped bordered condensed>
                <thead>
                <tr>
                  <th>Prop</th>
                  <th>Value</th>
                  <th>Prop</th>
                  <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>countyClass</td>
                  <td><input type="text" className="form-control" name="countyClass"  value={this.state.countyClass} onChange={this.handleChange} />
                  </td>
                  <td>countyStyle</td>
                  <td><input type="text" className="form-control" name="countyStyleStr"  value={this.state.countyStyleStr} onChange={this.handleChangeObj} />
                  </td>
                </tr>
                <tr>
                  <td>districtClass</td>
                  <td><input type="text" className="form-control" name="districtClass"  value={this.state.districtClass} onChange={this.handleChange} />
                  </td>
                  <td>districtStyle</td>
                  <td><input type="text" className="form-control" name="districtStyleStr"  value={this.state.districtStyleStr} onChange={this.handleChangeObj} />
                  </td>
                </tr>
                <tr>
                  <td>zipCodeClass</td>
                  <td><input type="text" className="form-control" name="zipCodeClass"  value={this.state.zipCodeClass} onChange={this.handleChange} />
                  </td>
                  <td>zipCodeStyle</td>
                  <td><input type="text" className="form-control" name="zipCodeStyleStr"  value={this.state.zipCodeStyleStr} onChange={this.handleChangeObj} />
                  </td>
                </tr>
                </tbody>
              </Table>

              <h4><label>Function And Return Object</label></h4>
              <label>handleCountyChange</label>
              <div><pre>{countyRtn}</pre></div>
              <label>handleDistrictChange</label>
              <div><pre>{districtRtn}</pre></div>
              <label>handleZipCodeChange</label>
              <div><pre>{zipCodeRtn}</pre></div>
              <label>handleZipCodeBlur</label>
              <div><pre>{zipBlurRtn}</pre></div>
              <label>handleZipCodeNotExists</label>
              <div><pre>{zipNotExistsRtn}</pre></div>
            </Panel.Body>
            <Panel.Footer>
              <div style={{textAlign: 'center'}}>
                <a href="https://github.com/Chris-Tsai/zipcode-tw-react">Github</a>
                <a href="https://www.npmjs.com/package/zipcode-tw-react" style={{marginLeft:'10px'}}>Npmjs</a>
              </div>
            </Panel.Footer>
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