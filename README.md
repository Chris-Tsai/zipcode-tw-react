# zipcode-tw-react

## Installation

```bash
npm install zipcode-tw-react --save
```

## Usage

```javascript
import {ZipCodeTW} from "zipcode-tw-react";

this.state = {
   displayType: 'text',
   countyName: 'county',
   countyValue: '',
   districtName: 'district',
   districtValue: '',
   zipCodeName: 'zipCode',
   zipCodeValue: '',
};

<ZipCodeTW displayType={this.state.displayType}
          countyFieldName={this.state.countyName}
          countyValue={this.state.countyValue}
          districtFieldName={this.state.districtName}
          districtValue={this.state.districtValue}
          zipCodeFieldName={this.state.zipCodeName}
          zipCodeValue={this.state.zipCodeValue}
          countyClass=""
          countyStyle=""
          districtClass=""
          districtStyle=""
          zipClass=""
          zipStyle=""
          zipCodePlaceholder=""
          handleChangeCounty={this.handleCountyChange}
          handleChangeDistrict={this.handleDistrictChange}
          handleChangeZipCode={this.handleZipCodeChange}
          handleBlurZipCode={this.handleZipCodeBlur}
/>
```

## Prop

####Field
Name | Type | Default | Description
--- | --- | --- | ---
displayType| one of: 'text', 'display' | 'text' | 
countyFieldName | string | |
countyValue | string | |
districtFieldName | string | |
districtValue | string | |
zipCodeFieldName | string | |
zipCodeValue | string | |

####Method
Name | Return | Description
---  | --- | ---
handleChangeCounty | {county, district, zipCode}
handleChangeDistrict | {district, zipCode}
handleChangeZipCode | zipCode
handleBlurZipCode | {county, district, zipCode}