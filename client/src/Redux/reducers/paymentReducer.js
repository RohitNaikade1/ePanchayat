import { constants } from "../actions/constants";

const initState={
    paymentRecord:{}
}

export const paymentReducer=(state=initState,action)=>{
    switch(action.type){
        
        case constants.PAY_FETCH:
            
            console.log(action.payload)
            return state={
                ...state,
                paymentRecord:action.payload.data
            }
        default:
            return state
    }
}