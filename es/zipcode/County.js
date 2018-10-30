import * as React from "react";
import PropTypes from "prop-types";
import es6BindAll from "es6bindall";

/**
 * 縣市
 *
 * @author Chris Tsai
 */
export default class County extends React.Component {

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
    const {dataOptions, fieldName, countyClass, countyStyle, value, displayType
    } = this.props;

    const counties = !!dataOptions && dataOptions.map((op) =>
        <option key={ op } value={ op }>{op}</option>);
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
              <span className={countyClass}
                    style={countyStyle}>{value}</span>
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
  countyClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),

  /**
   * style
   */
  countyStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
};