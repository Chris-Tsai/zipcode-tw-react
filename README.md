# zipcode-tw-react

## Demo
https://chris-tsai.github.io/

![pic](demo.png)

## Installation

```bash
npm install zipcode-tw-react --save
```

## Usage

```javascript
import {ZipCodeTW} from "zipcode-tw-react";

this.state = {
      displayType: 'text',
      countyName: 'countyValue',
      countyValue: '',
      districtName: 'districtValue',
      districtValue: '',
      zipCodeName: 'zipCodeValue',
      zipCodeValue: '',
      countyClass: 'form-control',
      countyStyle: {width: '100px'},
      districtClass: 'form-control',
      districtStyle: {width: '100px'},
      zipCodeClass: 'form-control',
      zipCodeStyle: {width: '100px'},
};

<ZipCodeTW displayType={this.state.displayType}
          countyFieldName={this.state.countyName}
          countyValue={this.state.countyValue}
          districtFieldName={this.state.districtName}
          districtValue={this.state.districtValue}
          zipCodeFieldName={this.state.zipCodeName}
          zipCodeValue={this.state.zipCodeValue}
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
```

## Prop

###### Field

Name | Type | Default | Description
:--- | :--- | :--- | :---
displayType| one of: 'text', 'display' | 'text' | 
countyFieldName | string | |
countyValue | string | |
districtFieldName | string | |
districtValue | string | |
zipCodeFieldName | string | |
zipCodeValue | string | |
countyClass | string | |
countyStyle | object | {marginLeft:'5px'} |
districtClass | string | |
districtStyle | object | {marginLeft:'5px', minWidth: '60px'} |
zipClass | string | |
zipStyle | object | {marginLeft:'5px', width: '50px'}|

###### Method

Name | Return | Description
:---  | :--- | :--- 
handleChangeCounty | {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue}
handleChangeDistrict | {districtFieldName, districtValue, zipFieldName, zipValue}
handleChangeZipCode | {zipFieldName, zipValue}
handleBlurZipCode | {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue}
handleZipCodeNotExists | {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue}
