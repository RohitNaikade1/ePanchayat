import {constants } from '../actions/constants';
import axiosInstance from '../../helpers/axios';

export const committeeFetch=()=>{
    return async (dispatch)=>{
        const currCommitteeData=await axiosInstance.get('/currCommittee/readData');
        const prevCommitteeData=await axiosInstance.get('/prevCommittee/readData');
        const current=currCommitteeData.data.data[0];
        const previous=prevCommitteeData.data.data[0];
        console.log(previous,current)
        if(currCommitteeData.status===200 && prevCommitteeData.status===200){
            dispatch({
                type:constants.COMM_FETCH,
                payload:{previous,current}
            })
        }
    }
}