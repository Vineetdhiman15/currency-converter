import axios from 'axios';
import {
getCurrencyData,
getCurrencyConversion
} from './action';

import {
  AJAX_METHOD_GET,
	GET_COMPONENTS_DATA_URL
} from '../../constants/constants';

export function getCurrencyDataOnLoad(){
	return function (dispatch) {
		return axios({
      method: AJAX_METHOD_GET,
			url: GET_COMPONENTS_DATA_URL,
		})
      .then(response => {
				dispatch(getCurrencyData(response.data));
			})
      .catch(error => {console.log('Error : ', error.message)});
	};
}

export function getCurrencyConversionData(data){
  let URL = `https://api.exchangeratesapi.io/latest?base=${
        data.fromCurrency
      }&symbols=${data.toCurrency}`
	return function (dispatch) {
		return axios({
      method: AJAX_METHOD_GET,
			url: URL,
		})
      .then(response => {
				dispatch(getCurrencyConversion(response.data,data));
			})
      .catch(error => {console.log('Error : ', error.message)});
	};
}
