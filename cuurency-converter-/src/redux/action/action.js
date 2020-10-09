import * as actionTypes from './actionTypes';

export const getCurrencyData = response => ({
    type: actionTypes.GET_CURRENCY_DATA,
    payload: response
});

export const getCurrencyConversion = (response,data) => ({
    type: actionTypes.GET_CURRENCY_CONVERSION_DATA,
    payload: response,
    componentData : data
});

export const toggleError = (payload) => ({
    type: actionTypes.TOGGLE_ERROR,
    payload: payload
});

export const changeHandler = (payload) => ({
    type: actionTypes.CHANGE_HANDLER,
    payload: payload
});
