import * as React from "react";
import PropTypes from "prop-types";
import es6BindAll from "es6bindall";

/**
 * 行政區
 *
 * @author Chris Tsai
 */
export default class District extends React.Component {

  constructor(props) {
    super(props);
    es6BindAll(this, ['handleChange']);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  handleChange(e) {
    let value = e.target.value;
    !!this.props.onChange && this.props.onChange(value);
  }

  render() {
    const {dataOptions, fieldName, districtClass, districtStyle, value, displayType,
    } = this.props;

    const districts = !!dataOptions && dataOptions.map((op) =>
        <option key={ op } value={ op }>{op}</option>);
    return (
        <>
          {!!displayType && displayType === 'text' ?
              <select name={fieldName}
                      className={districtClass}
                      style={districtStyle}
                      onChange={this.handleChange}
                      value={value}
              >
                {districts}
              </select>
              :
              <span className={districtClass}
                    style={districtStyle}>{value}</span>
          }
        </>
    );
  }
}

District.propTypes = {

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
  districtClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),

  /**
   * style
   */
  districtStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
};