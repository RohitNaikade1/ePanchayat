import { constants } from "../actions/constants"

const initState={
    previous:{},
    current:{}
}

export const committeeReducer=(state=initState,action)=>{
    switch(action.type){
        case constants.COMM_FETCH:
            return state={
                ...state,
                previous:action.payload.previous,
                current:action.payload.current
            }
        default:
            return state
    }
}