import { constants } from "../actions/constants"

const initState={
    data:[]
}

export const schemeReducer=(state=initState,action)=>{
    switch(action.type){
        case constants.SCHEMES_FETCH:
            return state={
                data:action.payload
            }
        default:
            return state
    }
}