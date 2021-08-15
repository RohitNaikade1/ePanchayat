import { constants } from "../actions/constants"

const initState={
    token:null,
    user:{
        firstName:'',
        lastName:'',
        email:'',
        picture:''
    },
    authenticate:false,
    authenticating:false
}
export const authReducer=(state=initState,action)=>{
    switch(action.type){
        case constants.LOGIN_REQUEST:
            state={
                ...state,
                authenticating:true
            }
            break;
        case constants.LOGIN_SUCCESS:
            state={
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                authenticate:true
            }
            break;
        case constants.LOGOUT_REQUEST:
            state={
                ...initState
            }
            break;
        default:
            state={
                ...initState
            }
            break;
    }
    return state;
}