import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";

const CustomerReview = () => {
  const testimonials = [
    {
      id: "george",
      name: "George",
      image: "https://www.shutterstock.com/image-photo/smiling-african-american-millennial-businessman-600nw-1437938108.jpg",
      quote: "I lost my phone then I get to know about WhereIsIt website I finally found my phone thank you <3",
    },
    {
      id: "noor",
      name: "Noor",
      image: "https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
      quote: "I still could not believe I found my lost laptop from WhereIsIt!! 5 star Website!",
    },
    {
      id: "selina",
      name: "Selina",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqbu3vikTenBD-KfH9gwGG7N_rtaCwa8rxLA&s",
      quote: "I found an iPhone on the ground and I posted on WhereIsIt. Within 1 hour I found the owner! Cool Website.",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Customer Testimonials | WhereIsIt";
    Aos.init({ duration: 1000 });
  }, []);

  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className=" py-12 mb-10">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-charm text-white mb-6">
          Customer Reviews
        </h2>

        <LayoutGroup>
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            data-aos="fade-up"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                layoutId={testimonial.id}
                onClick={() => setSelectedId(testimonial.id)}
                className="bg-Card shadow-md rounded-lg p-4 w-full md:w-1/3 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-red-900">
                  {testimonial.name}
                </h3>
                <p className="text-white italic mt-2">{testimonial.quote}</p>
              </motion.div>
            ))}

          
            {selectedId && (
              <motion.div
                layoutId={selectedId}
                className="absolute top-0 left-0 bg-Card w-full h-full flex flex-col items-center justify-center p-6 z-50"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-5 right-5 bg-gradient-to-r from-bgButton1 to-bgButton1 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
                {testimonials
                  .filter((testimonial) => testimonial.id === selectedId)
                  .map((testimonial) => (
                    <div key={testimonial.id} className="text-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                      />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {testimonial.name}
                      </h3>
                      <p className="text-white italic">{testimonial.quote}</p>
                    </div>
                  ))}
              </motion.div>
            )}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default CustomerReview;
