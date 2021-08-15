import {constants} from '../actions/constants';
import axiosInstance from '../../helpers/axios';

export const readApplicants=()=>{
    return async (dispatch)=>{
        const applicantData=await axiosInstance.get('residence/readApplicants');
        if(applicantData.status===200){
            const data=applicantData.data;
            // console.log(data)
            dispatch({
                type:constants.APP_FETCH,
                payload:data
            })
        }
    }
}