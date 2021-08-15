import {constants} from './constants';
import axiosInstance from '../../helpers/axios';

export const payAction=(user)=>{
    return async (dispatch)=>{
        const res=await axiosInstance.get('/pay/read');
        if(res.status===200){
            const paymentata=res.data;
            console.log(paymentata)
            dispatch({
                type:constants.PAY_FETCH,
                payload:paymentata
            });
        }
    }
}
