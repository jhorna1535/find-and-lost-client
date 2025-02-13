
import Aos from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
      Aos.init({ duration: 1000 });
  }, []);
  
  return (
      <div 
        className="relative min-h-screen bg-cover bg-center bg-fixed " 
        style={{ backgroundImage: `url('./assets/background.jpg')` }}
      >
       
        <div className="absolute inset-0 bg-black opacity-50"></div>

       
        <div className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 px-6 lg:px-24 text-center lg:text-left min-h-screen">
          <img
            src="./assets/LostFound.png"
            className="w-5/6 lg:w-1/2 rounded-lg z-5 mt-60 md:mt-40"
            alt="Lost and Found"
          />
          <div className="z-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-white md:mt-10" data-aos="fade-left">
              WhereIsIt - Find What’s Missing
            </h1>
            <p className="py-6 text-white text-sm lg:text-base" data-aos="fade-right">
              Reconnect with your lost belongings through WhereIsIt, the ultimate lost and found platform. Report missing items, browse found listings, and interact with others to recover what’s yours. Where technology meets empathy, WhereIsIt is designed to bridge the gap between lost and found.
            </p>
            <Link 
              to='/allitems' 
              className="btn bg-gradient-to-r from-bgButton1 to-bgButton2 text-black border-black mb-10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
  );
};

export default MainPage;