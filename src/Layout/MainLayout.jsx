
import { useEffect } from 'react';
import ItemSection from '../components/ItemSection';
import MainPage from '../components/MainPage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomerReview from '../components/CustomerReview';
import MainSlider from '../components/MainSlider';

const MainLayout = () => {
     useEffect(() => {
        window.scrollTo(0, 0);
       
        document.title = "Home | WhereIsIt";
       
      }, []);
    return (
        <div className=''>
          <div className='  mx-auto w-11/12'>
          <Navbar></Navbar>
          </div>
       
            <div className='mx-auto'>
            
            
            <MainPage></MainPage>
            <MainSlider></MainSlider>
            <ItemSection></ItemSection>
            <CustomerReview></CustomerReview>

            </div>
           <Footer></Footer>
        </div>
    );
};

export default MainLayout;