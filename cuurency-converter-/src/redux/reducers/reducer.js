import * as actionType from '../action/actionTypes'

const initialState = {
  inputValue: null,
  fromCurrency: null,
  toCurrency: null,
  currencyArray: [],
  result: null,
  error: null
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_CURRENCY_DATA: {
      let currencyAr = ['EUR'];
      for (const key in action.payload.rates) {
        currencyAr.push(key);
      };
      return {
        ...state,
        currencyArray: [...currencyAr],
      };
    }
    case actionType.GET_CURRENCY_CONVERSION_DATA: {
      let result = action.componentData.inputValue * action.payload.rates[action.componentData.toCurrency];
      result = result.toFixed(2);
      return {
        ...state,
        inputValue: action.componentData.inputValue,
        fromCurrency: action.componentData.fromCurrency,
        toCurrency: action.componentData.toCurrency,
        result: result,
      };
    }
    case actionType.TOGGLE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case actionType.CHANGE_HANDLER: {
      return {
        ...state,
        inputValue: action.payload.inputValue,
        fromCurrency: action.payload.fromCurrency,
        toCurrency: action.payload.toCurrency,
      };
    }
    default:
      return state;
  }
};

export default dataReducer;
