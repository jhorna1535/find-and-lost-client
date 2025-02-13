import React from 'react';
import Error from "../../Error.json"
import Lottie from "lottie-react"
import Navbar from './../components/Navbar';
import Footer from '../components/Footer';
const ErrorPage = () => {
    return (
        <div>
            <div className='mt-10 w-11/12 mx-auto'>
                <Navbar></Navbar>
            <div style={{width:"60%",marginLeft:"25%"}} >
            <Lottie  animationData={Error}></Lottie>
        </div>
            </div>
            <Footer></Footer>
        </div>
     
    );
};

export default ErrorPage;