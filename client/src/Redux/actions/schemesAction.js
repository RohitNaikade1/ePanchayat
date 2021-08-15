import {constants} from '../actions/constants';
import axiosInstance from '../../helpers/axios';

export const fetchSchemes=()=>{
    return async (dispatch)=>{
        const schemeData=await axiosInstance.get('/schemes/view');
        if(schemeData.status===200){
            const data=schemeData.data.data;
            dispatch({
                type:constants.SCHEMES_FETCH,
                payload:data
            })
        }
    }
}