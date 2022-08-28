import { CHANGE_FILTER_VALUE, CREATE_ACTIVITY, GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL } from "../actions";


const initialState = {
    countries: [],
    countryDetail: [],
    activities: [],
    filters: {
        searchTerm: ''
    }
};
  
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            }
        case CHANGE_FILTER_VALUE:
            return {
                ...state,
                filters: {...state.filters, ...action.payload}
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            }
        default: 
            return { ...state }
    }
}

export default rootReducer;