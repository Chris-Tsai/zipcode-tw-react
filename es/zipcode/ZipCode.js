import * as React from "react";
import PropTypes from "prop-types";
import es6BindAll from "es6bindall";

/**
 * 郵遞區號
 *
 * @author Chris Tsai
 */
export default class ZipCode extends React.Component {

  constructor(props) {
    super(props);
    es6BindAll(this, ['handleChange', 'handleBlur']);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  handleChange(e) {
    let value = e.target.value;
    !!this.props.onChange && this.props.onChange(value);
  }

  handleBlur(e) {
    let value = e.target.value;
    !!this.props.onBlur && this.props.onBlur(value);
  }

  render() {
    const {fieldName, zipClass, zipStyle, value, displayType, placeholder
    } = this.props;

    const defaultStyle = !!zipStyle ? zipStyle: {width:'40px'};
    return (
        <>
          {!!displayType && displayType === 'text' ?
              <input type="text"
                     name={fieldName}
                     className={zipClass}
                     style={defaultStyle}
                     onChange={this.handleChange}
                     onBlur={this.handleBlur}
                     value={value}
                     placeholder={placeholder}
              />
              :
              <span className={zipClass}
                    style={zipStyle}>{value}</span>
          }
        </>
    );
  }
}

ZipCode.propTypes = {
  /**
   * 顯示樣式
   */
  displayType: PropTypes.oneOf(['text', 'display']),
  /**
   * 欄位名稱
   */
  fieldName: PropTypes.string.isRequired,

  /**
   * 欄位描述
   */
  placeholder: PropTypes.string,

  /**
   * 欄位值
   */
  value: PropTypes.string,

  /**
   * onChange callback function
   */
  onChange: PropTypes.func,

  /**
   * onBlur callback function
   */
  onBlur: PropTypes.func,

  /**
   * class
   */
  zipClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),

  /**
   * style
   */
  zipStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
};