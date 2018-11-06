import React from 'react';
import ReactDOM from 'react-dom';
import Address from "./js/Address";

class ZipCodeTWTest extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
        <div style={{width:'50%', margin: 'auto'}}>
          <h1> Example </h1>
          <Address/>
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