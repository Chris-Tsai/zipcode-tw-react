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
          handleChangeCounty={this.handleCountyChange}
          handleChangeDistrict={this.handleDistrictChange}
          handleChangeZipCode={this.handleZipCodeChange}
          handleBlurZipCode={this.handleZipCodeBlur}
/>
```
