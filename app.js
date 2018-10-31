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
      countyName: 'countyValue',
      countyValue: '',
      districtName: 'districtValue',
      districtValue: '',
      zipCodeName: 'zipCodeValue',
      zipCodeValue: '',
      countyName1: 'countyValue1',
      countyValue1: '',
      districtName1: 'districtValue1',
      districtValue1: '',
      zipCodeName1: 'zipCodeValue1',
      zipCodeValue1: '',
      countyClass: 'form-control',
      countyStyle: {width: '100px'},
      districtClass: 'form-control',
      districtStyle: {width: '100px'},
      zipCodeClass: 'form-control',
      zipCodeStyle: {width: '100px'},
      countyStyleStr:'width: \'100px\'',
      districtStyleStr:'width: \'100px\'',
      zipCodeStyleStr:'width: \'100px\'',
      handleCountyChange: {},
      handleDistrictChange: {},
      handleZipCodeChange: {},
      handleZipCodeBlur: {},
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
    this.setState({[zipFieldName]: zipValue, [countyFieldName]:countyValue, [districtFieldName]:districtValue, handleCountyChange:e});
  }

  handleDistrictChange(e) {
    const {districtFieldName, districtValue, zipFieldName, zipValue } = e;
    this.setState({[zipFieldName]: zipValue, [districtFieldName]:districtValue, handleDistrictChange:e});
  }

  handleZipCodeChange(e) {
    this.setState({[e.zipFieldName]:e.zipValue, handleZipCodeChange:e});
  }

  handleZipCodeBlur(e) {
    const { countyFieldName, countyValue,districtFieldName, districtValue, zipFieldName, zipValue } = e;
    this.setState({[zipFieldName]: zipValue, [countyFieldName]:countyValue, [districtFieldName]:districtValue, handleZipCodeBlur:e});
  }

  handleZipCodeNotExists(e){
    const { countyFieldName, countyValue,districtFieldName, districtValue, zipFieldName, zipValue } = e;
    this.setState({[zipFieldName]: zipValue, [countyFieldName]:countyValue, [districtFieldName]:districtValue});

    swal('郵遞區號不存在: '+zipValue,'' ,'error');
  }

  render() {
    let countyRtn = JSON.stringify(this.state.handleCountyChange);
    let districtRtn = JSON.stringify(this.state.handleDistrictChange);
    let zipCodeRtn = JSON.stringify(this.state.handleZipCodeChange);
    let zipBlurRtn = JSON.stringify(this.state.handleZipCodeBlur);
    return (
        <div style={{width:'50%', margin: 'auto'}}>
          <h1> DEMO </h1>

          <Panel>
            <Panel.Heading>Without CSS & STYLE</Panel.Heading>
            <Panel.Body>
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
                         handleZipCodeNotExists={this.handleZipCodeNotExists}
              />
              <br/>
              <div>
              <Table striped bordered condensed style={{overflowX:'scroll'}}>
                <thead>
                <tr>
                  <th style={{width:'120px'}}>Prop</th>
                  <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>displayType</td>
                  <td>{this.state.displayType}</td>
                </tr>
                <tr>
                  <td>countyValue</td>
                  <td>{this.state.countyValue}</td>
                </tr>
                <tr>
                  <td>districtValue</td>
                  <td>{this.state.districtValue}</td>
                </tr>
                <tr>
                  <td>zipCodeValue</td>
                  <td>{this.state.zipCodeValue}</td>
                </tr>
                </tbody>
              </Table>
              </div>
            </Panel.Body>
          </Panel>
          <div>
            <button className="btn-xs btn-success" onClick={this.handleClick}>Change DisplayType</button>
          </div>
          <br/>
          <Panel>
            <Panel.Heading>With CSS </Panel.Heading>
            <Panel.Body>

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

              <label> with div form-inline</label>
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
              </div>
              <br/>
              <Table striped bordered condensed>
                <thead>
                <tr>
                  <th style={{width:'120px'}}>Prop</th>
                  <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>displayType</td>
                  <td>{this.state.displayType}</td>
                </tr>
                <tr>
                  <td>countyValue</td>
                  <td>{this.state.countyValue1}</td>
                </tr>
                <tr>
                  <td>districtValue</td>
                  <td>{this.state.districtValue1}</td>
                </tr>
                <tr>
                  <td>zipCodeValue</td>
                  <td>{this.state.zipCodeValue1}</td>
                </tr>
                </tbody>
              </Table>
              <label>Return Object</label><br/>
              <label>handleCountyChange</label>
              <div><pre>{countyRtn}</pre></div>
              <label>handleDistrictChange</label>
              <div><pre>{districtRtn}</pre></div>
              <label>handleZipCodeChange</label>
              <div><pre>{zipCodeRtn}</pre></div>
              <label>handleZipCodeBlur</label>
              <div><pre>{zipBlurRtn}</pre></div>
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