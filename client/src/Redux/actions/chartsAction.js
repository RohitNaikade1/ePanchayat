import {constants } from '../actions/constants';
import axiosInstance from '../../helpers/axios';

export const populationFetch=()=>{
    return async (dispatch)=>{
        const popData=await axiosInstance.get('/populate/fetch');
        if(popData.status===200){
            const {years,menCount,womenCount,childrenCount}=popData.data.data[0];
            dispatch({
                type:constants.POPULATION_FETCH,
                payload:{years,menCount,womenCount,childrenCount}
            })
        }
    }
}
export const literacyFetch=()=>{
    return async (dispatch)=>{
        const popData=await axiosInstance.get('/literate/fetch');
        if(popData.status===200){
            console.log(popData.data);
            const {years,menCount,womenCount}=popData.data.data[0];
            dispatch({
                type:constants.LITERACY_FETCH,
                payload:{years,menCount,womenCount}
            })
        }
    }
}