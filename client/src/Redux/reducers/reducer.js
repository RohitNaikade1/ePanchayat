import {chartsReducer} from './chartsReducer';
import {schemeReducer} from './schemeReducer';
import {committeeReducer} from './committeeReducer';
import {residenceReducer} from './ResidenceReducer';
import {revenueReducer} from './revenueReducer';
import {paymentReducer} from './paymentReducer';

import { combineReducers } from 'redux';


const rootReducer=combineReducers({
    // oAuthReducer,
    chartsData:chartsReducer,
    schemes:schemeReducer,
    committee:committeeReducer,
    residence:residenceReducer,
    revenue:revenueReducer,
    payments:paymentReducer
});
export default rootReducer;