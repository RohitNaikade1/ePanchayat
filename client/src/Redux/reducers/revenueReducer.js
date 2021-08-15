import { constants } from "../actions/constants";

const initState={
    revenueData:{}
}

export const revenueReducer=(state=initState,action)=>{
    switch(action.type){
        
        case constants.APP_FETCH:
            // console.log(action.payload.data)
            return state={
                ...state,
                revenueData:action.payload.data
            }
        default:
            return state
    }
}