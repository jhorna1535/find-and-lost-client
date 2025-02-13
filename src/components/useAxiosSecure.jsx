import axios from 'axios';
import React from 'react';
const axiosInstance =axios.create({
    baseURL:'https://whereisitserver.vercel.app',
    withCredentials:true,

})
const useAxiosSecure = () => {
    return axiosInstance;
     
   
};

export default useAxiosSecure;