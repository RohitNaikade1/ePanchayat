import {constants} from './constants';
import axiosInstance from '../../helpers/axios';

export const login=(user)=>{
    return async (dispatch)=>{
        const res=await axiosInstance.post('/user/signin',{
            ...user
        });
        if(res.status===200){
            const {token,user}=res.data;
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));
            dispatch({
                type:constants.LOGIN_SUCCESS,
                payload:{token,user}
            });
        }else{
            if(res.status===400){
                dispatch({
                    type:constants.LOGIN_FAILURE,
                    payload:{
                        error:res.data.error
                    }
                })
            }
        }
    }
}
