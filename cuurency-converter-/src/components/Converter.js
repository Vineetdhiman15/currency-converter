import React from 'react';
import axios from 'axios';
import {
  connect
} from 'react-redux';
import {
  getCurrencyData,
  toggleError,
  changeHandler
} from '../redux/action/action';
import {
  getCurrencyDataOnLoad,
  getCurrencyConversionData
} from '../redux/action/index';
import {
AMOUNT_ERROR_MESSAGE,
SAME_CURRENCY_ERROR_MESSAGE
} from '../constants/constants'

var valid = true;
var currencyList;
var resultMessage;

class Converter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputValue: '',
        currencyArray: [],
        error: false,
        errorMessage: '',
        result: null,
        fromCurrency: 'EUR',
        toCurrency: 'INR',
        blurValidFail: false
      };
    }

    componentDidMount() {
      this.props.getCurrencyDataOnLoad()
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.inputValue != this.props.inputValue || nextProps.toCurrency != this.props.toCurrency || nextProps.fromCurrency != this.props.fromCurrency) {
        valid = false
      }
      currencyList = nextProps.currencyArray.map(currency => (
        <option key = {currency} > {currency} < /option>
      ))
    }

    blurHandler = () => {
      if (this.props.inputValue == 0 || this.props.inputValue === null) {
        this.props.toggleError(true)
        this.setState({
          blurValidFail: true,
          errorMessage: AMOUNT_ERROR_MESSAGE
        })
      }
    };

    changeHandler = event => {
      let fromCurrency, toCurrency, inputValue;
      valid = false
      this.setState({
        [event.target.id]: event.target.value
      }, () => {
        valid = true
        let data = {
          fromCurrency: this.state.fromCurrency,
          toCurrency: this.state.toCurrency,
          inputValue: this.state.inputValue
        }
        this.props.changeHandler(data)
      })
    };

    resultHandler = () => {
      valid = true
      if (this.props.inputValue > 0 && this.props.inputValue != '' && this.state.fromCurrency !== this.state.toCurrency) {
        this.props.toggleError(false)
        let fromCurrency, toCurrency, inputValue;
        let data = {
          fromCurrency: this.state.fromCurrency,
          toCurrency: this.state.toCurrency,
          inputValue: this.state.inputValue
        }
        this.props.getCurrencyConversionData(data)
        resultMessage = `Converted Currency Value from ${this.props.fromCurrency} to ${this.props.toCurrency} is`
      } else {
        this.props.toggleError(true)
        if ((this.state.inputValue == 0 || this.state.inputValue === null) && this.state.fromCurrency == this.state.toCurrency) {
          this.setState({
            errorMessage: `${AMOUNT_ERROR_MESSAGE} ${SAME_CURRENCY_ERROR_MESSAGE}`})
        } else if (this.state.inputValue == 0 || this.state.inputValue === null) {
          this.setState({
            errorMessage: AMOUNT_ERROR_MESSAGE
          });
        } else {
          this.setState({
            errorMessage: SAME_CURRENCY_ERROR_MESSAGE
          });
        }
      }
    };

    render() {
      return (
        <React.Fragment >
        <h1 className = 'title' > Currency Converter < /h1> {
        valid ? this.props.error == true && < div className = 'result error' > {
          this.state.errorMessage
        } < /div>: null}
        <div className = 'inputContainer' >
        <label htmlFor = 'inputValue' > Amount : < /label>
        <input id = 'inputValue'
        type = 'number'
        value = {this.props.inputValue}
        onChange = {event => this.changeHandler(event)}
        placeholder = 'eg. 30'
        onBlur = {this.blurHandler}
        /> < /div >
        <div className = 'currencyDropdown' >
        <label > From: < /label>
        <select id = 'fromCurrency'
        onChange = {event => this.changeHandler(event)}
        value = {this.state.fromCurrency} > {currencyList}
        </select>
        <label > To: < /label>
        <select id = 'toCurrency'
        onChange = {event => this.changeHandler(event)}
        value = {this.state.toCurrency} > {currencyList}
        </select>
        < /div >
        <div className = 'buttonContainer' >
        <button onClick = {this.resultHandler} > Convert < /button>
        < /div >
        {valid ? this.props.error == false && this.props.result && < div > < span className = 'result' > {resultMessage}
         < span className = 'resultValue' > {this.props.result} < /span></span ></div> : null}
         </React.Fragment >
        );
      }
    }

    const mapStateToProps = state => ({
      error: state.error,
      result: state.result,
      inputValue: state.inputValue,
      toCurrency: state.toCurrency,
      fromCurrency: state.fromCurrency,
      currencyArray: state.currencyArray,
    })

    const mapDispatchToProps = dispatch => ({
      toggleError: (data) => dispatch(toggleError(data)),
      changeHandler: (data) => dispatch(changeHandler(data)),
      getCurrencyDataOnLoad: () => dispatch(getCurrencyDataOnLoad()),
      getCurrencyConversionData: (data) => dispatch(getCurrencyConversionData(data))
    })

    export default connect(mapStateToProps, mapDispatchToProps)(Converter);
