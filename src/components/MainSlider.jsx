import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Aos from "aos";
import "aos/dist/aos.css";

const MainSlider = () => {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    duration: 1000, 
    slides: {
      perView: 1, 
    },
    created: (sliderInstance) => {
      setInterval(() => {
        sliderInstance.next();
      }, 2000);
    },
  });

  const slides = [
    {
      id: 1,
      backgroundImage: "https://img.freepik.com/free-vector/detective-following-footprints-concept-illustration_114360-15386.jpg?t=st=1736578311~exp=1736581911~hmac=9100e2cb338f2ef3cd101b301d85575613470091dda9c64157d0df9b7f926026&w=996",
      title: "Reconnect with What’s Lost",
      description:
        "Our platform helps you recover lost belongings with the power of community and technology.",
    },
    {
      id: 2,
      backgroundImage: "https://img.freepik.com/free-vector/detective-following-footprints-concept-illustration_114360-17638.jpg?t=st=1736578451~exp=1736582051~hmac=269201b2328a25de5b8ae9deeebc04bad795d9df36ee41749d19e1d6c876a6cf&w=740",
      title: "Empowering Kindness Through Connection",
      description:
        "Report lost items or browse found belongings to make a difference in someone’s day.",
    },
    {
      id: 3,
      backgroundImage: "https://img.freepik.com/free-vector/house-searching-concept-landing-page_52683-28268.jpg?t=st=1736578358~exp=1736581958~hmac=4f12e7e3a824c4d70403a79a5cf9c8bbf72d41a7ecb32a82c82f1234fd4d407d&w=996",
      title: "Lost But Not Gone Forever",
      description:
        "We’re here to help you reconnect with your missing treasures—join the journey today.",
    },
    {
      id: 4,
      backgroundImage: "https://img.freepik.com/free-vector/flashlight-concept-illustration_114360-2490.jpg?t=st=1736578397~exp=1736581997~hmac=0b655cf06451406c847d2b7855d6494f6fc18f275461bfcff2f54d3c7418ac51&w=996",
      title: "A Community Built on Trust",
      description:
        "Together, we can ensure every lost item finds its way home.",
    },
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
    document.title = "Home | CrowdCube";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="keen-slider w-11/12 mx-auto  bg-no-repeat bg-center"
      ref={sliderRef}
    >
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="keen-slider__slide bg-no-repeat bg-cover  bg-center"
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
          }}
        >
          <div className="relative sm:min-h-[50vh] md:min-h-[80vh] h-[40vh] flex flex-col justify-center items-center text-center text-white px-4">
          
            <div className="absolute inset-0 bg-black opacity-40"></div>
           
            <div className="relative z-10">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold " data-aos="fade-up">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base mb-4" data-aos="fade-up">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainSlider;