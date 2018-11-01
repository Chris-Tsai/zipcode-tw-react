# zipcode-tw-react

## Demo
Tyr it online: https://chris-tsai.github.io/

![pic](demo.png)

## Installation

```bash
npm install zipcode-tw-react --save
```
or use package.json

```bash
"dependencies": {
      ...
    + "zipcode-tw-react": "^1.0.0",
 },
```

## Usage

```javascript
import {ZipCodeTW} from "zipcode-tw-react";

<ZipCodeTW displayType="text"
          ...
/>
```
Example : [Address.js](https://github.com/Chris-Tsai/zipcode-tw-react/tree/master/_example) 

## Prop

###### Field

 Name | Type | Default | Description
:--- | :--- | :--- | :---
displayType| one of: 'text', 'display' | 'text' | displayType = display時，以span顯示且包含readOnly & disabled屬性
countyFieldName | string |'county' |
countyValue | string | |
districtFieldName | string |'district' |
districtValue | string | |
zipCodeFieldName | string |'zipCode' |
zipCodeValue | string | |
countyClass | string | |
countyStyle | object | {marginLeft:'5px'} |
districtClass | string | |
districtStyle | object | {marginLeft:'5px', minWidth: '60px'} |
zipClass | string | |
zipStyle | object | {marginLeft:'5px', width: '50px'}|
zipCodePlaceholder | string | |

###### Method

 Name | Return | Description
 :---  | :--- | :--- 
 handleChangeCounty | {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue}
 handleChangeDistrict | {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue}
 handleChangeZipCode | {zipFieldName, zipValue}
 handleBlurZipCode | {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue}
 handleZipCodeNotExists | {countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue, origZipCode}

## Stargazers over time

[![Stargazers over time](https://starcharts.herokuapp.com/Chris-Tsai/zipcode-tw-react.svg)](https://starcharts.herokuapp.com/Chris-Tsai/zipcode-tw-react)
      
