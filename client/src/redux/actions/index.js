import axios from 'axios'

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL'
export const CHANGE_FILTER_VALUE = 'CHANGE_FILTER_VALUE'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'


function createActivityAction(postData) {
  return axios.post('http://localhost:3001/activities', postData)
}

export const getAllCountries = () => {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/countries`)
          .then(r =>r.json())
          .then(json => {
            dispatch({
              type: GET_ALL_COUNTRIES,
              payload: json
            })
          })
      };
}

export const getCountryDetail = (id) => {
  return async function (dispatch) {
      return fetch(`http://localhost:3001/countries/${id}`)
        .then(r =>r.json())
        .then(json => {
          dispatch({
            type: GET_COUNTRY_DETAIL,
            payload: json
          })
        })
    };
}

export const changeFilterValue = (value) => {
  return async function (dispatch) {
      dispatch({
          type: CHANGE_FILTER_VALUE,
          payload: value
      })
  };
};

export const createActivity = (postData) => {
  return () => {
    createActivityAction(postData)
      .then(response => {
        console.log(response.data)
      })
  }
}