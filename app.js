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
    let countySort = {
      "基隆市": 2,
      "台北市": 1,
      "新北市": 3,
      "桃園市": 4,
      "新竹市": 5,
      "新竹縣": 6,
      "苗栗縣": 7,
      "台中市": 8,
      "彰化縣": 9,
      "南投縣": 10,
      "雲林縣": 11,
      "嘉義市": 12,
      "嘉義縣": 13,
      "台南市": 14,
      "高雄市": 15,
      "屏東縣": 16,
      "台東縣": 17,
      "花蓮縣": 18,
      "宜蘭縣": 19,
      "澎湖縣": 20,
      "金門縣": 21,
      "連江縣": 22
    };
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
                       countySort={countySort}
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