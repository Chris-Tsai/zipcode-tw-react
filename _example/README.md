# zipcode-tw-react-example

## Useage

程式參考: [Address.js](https://github.com/Chris-Tsai/zipcode-tw-react/blob/master/_example/js/Address.js "Address.js")

## Installation

In zipcode-tw-react
```bash
$ cd _example
$ npm install
$ npm run build
```

Open index.html and you will see

![pic](example.png)

#### No use address
```javascript
<div className="form-inline">
  <ZipCodeTW displayType='display'
             countyValue={this.state.county}
             districtValue={this.state.district}
             zipCodeValue={this.state.zipCode}
  />
</div>
```

#### Use address
```javascript
<div className="form-inline">
  <ZipCodeTW displayType='display'
             countyValue={this.state.county}
             districtValue={this.state.district}
             zipCodeValue={this.state.zipCode}
             address={this.state.address}
  />
</div>
```
#### Use fullAddress
```javascript
<div className="form-inline">
  <ZipCodeTW displayType='display'
             countyValue={this.state.county}
             districtValue={this.state.district}
             zipCodeValue={this.state.zipCode}
             fullAddress={fullAddress}
  />
</div>
```
