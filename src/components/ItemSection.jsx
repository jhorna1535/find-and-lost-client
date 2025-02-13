import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import Aos from "aos";
import axios from "axios";  
import "aos/dist/aos.css";
import Loading from "./Loading";

const ItemSection = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://whereisitserver.vercel.app/public-lost-items");
        const sortedItems = response.data.slice(0, 6); 
        setItems(sortedItems);
      } catch (error) {
        console.error("Error fetching lost & found items:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchItems();
  }, []);
  
  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="hero px-4 md:px-8 min-h-screen flex flex-col mb-10  bg-slate-300"
      
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-black mt-10" data-aos="fade-up">Latest Find & Lost Items</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-10 mt-10 pb-10">
    
        {items.slice(0, 6).map((item) => (
          <div
            key={item._id}
            className="card card-compact bg-Card w-full sm:w-80 md:w-96 shadow-xl"
            data-aos="fade-up"
          >
            <figure>
              <img
                className="w-full h-48 object-cover"
                src={item.thumbnail || "https://via.placeholder.com/150"}
                alt={item.title || "Item"}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-center text-white">{item.title || "Untitled"}</h2>
              <p className="text-white">{item.description || "No description provided."}</p>
              <p className="text-white">
                <strong className="text-white">Category:</strong> {item.category || "Unknown"}
              </p>
              <p className="text-white">
                <strong>Location:</strong> {item.location || "Not specified"}
              </p>
              <p className="text-white">
                <strong>Date Lost:</strong> {item.dateLost ? new Date(item.dateLost).toLocaleDateString() : "Unknown"}
              </p>
              <Link to={`/items/${item._id}`}
                className="btn bg-bgforRecent text-white "
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
       
        <Link to="/allitems" className="btn bg-Buttons text-white mb-10">
          See All
        </Link>
      </div>
    </div>
  );
}; 

export default ItemSection;