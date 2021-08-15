import { constants } from "../actions/constants"

const initState={
    popYears:[],
    popMenCount:[],
    popWomenCount:[],
    popChildrenCount:[],
    litYears:[],
    litMenCount:[],
    litWomenCount:[]
}

export const chartsReducer=(state=initState,action)=>{
    switch(action.type){
        
        case constants.POPULATION_FETCH:
            return state={
                ...state,
                popYears:action.payload.years,
                popMenCount:action.payload.menCount,
                popWomenCount:action.payload.womenCount,
                popChildrenCount:action.payload.childrenCount

            }
        case constants.LITERACY_FETCH:
            return state={
                ...state,
                litYears:action.payload.years,
                litMenCount:action.payload.menCount,
                litWomenCount:action.payload.womenCount
            }
        default:
            return state
    }
}