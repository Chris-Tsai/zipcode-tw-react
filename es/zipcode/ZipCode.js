import * as React from "react";
import PropTypes from "prop-types";

/**
 * 郵遞區號
 *
 * @author Chris Tsai
 */
export default class ZipCode extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange = (e) =>{
    let value = e.target.value;
    let {onChange} = this.props;
    if((value == '' || /^\d+$/.test(value)) && value.length <= 3
        && typeof (onChange) == 'function'){
      onChange(value);
    }
  }

  handleBlur = (e) =>{
    let value = e.target.value;
    let {onBlur} = this.props;
    if(typeof (onBlur) == 'function'){
      onBlur(value);
    }
  }

  render() {
    const {fieldName, zipClass, zipStyle, value, displayType, placeholder
    } = this.props;

    const nowStyle = typeof(zipStyle) == 'undefined' ? {width:'40px'} : zipStyle;
    return (
        <>
          {!!displayType && displayType === 'text' ?
              <input type="text"
                     pattern='[0-9]{0,3}'
                     name={fieldName}
                     className={zipClass}
                     style={nowStyle}
                     onChange={this.handleChange}
                     onBlur={this.handleBlur}
                     value={value}
                     placeholder={placeholder}
              />
              :
              <>
                <span className={zipClass}
                      style={nowStyle}
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