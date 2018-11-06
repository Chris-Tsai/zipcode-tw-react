import * as React from "react";
import PropTypes from "prop-types";

/**
 * 縣市
 *
 * @author Chris Tsai
 */
export default class County extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange = (e) =>{
    let value = e.target.value;
    let {onChange} = this.props;
    if(typeof (onChange) == 'function'){
      onChange(value);
    }
  }

  render() {
    const {
      dataOptions, fieldName, countyClass, countyStyle, value, displayType
    } = this.props;

    const counties = !!dataOptions && dataOptions.map((op) =>
        <option key={op} value={op}>{op}</option>);
    return (
        <>
          {!!displayType && displayType === 'text' ?
              <select name={fieldName}
                      className={countyClass}
                      style={countyStyle}
                      onChange={this.handleChange}
                      value={value}
              >
                {counties}
              </select>
              :
              <>
                <span className={countyClass}
                      style={countyStyle}
                      readOnly={true}
                      disabled={true}
                >{value}</span>
                <input type="hidden" name={fieldName} value={value}/>
              </>
          }
        </>
    );
  }
}

County.propTypes = {
  /**
   * 顯示樣式
   */
  displayType: PropTypes.oneOf(['text', 'display']),
  /**
   * 欄位名稱
   */
  fieldName: PropTypes.string.isRequired,

  /**
   * 欄位值
   */
  value: PropTypes.string,

  /**
   * onChange callback function
   */
  onChange: PropTypes.func,

  /**
   * dataOptions
   */
  dataOptions: PropTypes.arrayOf(PropTypes.string),

  /**
   * class
   */
  countyClass: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.array, PropTypes.object]),

  /**
   * style
   */
  countyStyle: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.array, PropTypes.object]),
};