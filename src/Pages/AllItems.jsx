import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import axios from "axios"; 
import "aos/dist/aos.css";

import Loading from './../components/Loading';
import Navbar from './../components/Navbar';
import Footer from "../components/Footer";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "All Items| WhereIsIt";
  }, []);

 
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://whereisitserver.vercel.app/lost-items", { withCredentials: true });
        const sortedItems = response.data.sort((a, b) => new Date(b.dateLost) - new Date(a.dateLost));
        setItems(sortedItems);
      } catch (error) {
        console.error("Error fetching lost & found items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mt-40 w-11/12 mx-auto ">
        <Navbar />
        <div className="hero bg-white px-4 md:px-8 min-h-screen flex flex-col mb-10 mt-10" data-aos="fade-up">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-black mt-10">All Find & Lost Items</h1>
            </div>
          </div>

          <div className="search-container text-center mt-6">
            <input
              type="text"
              placeholder="Search by title or location"
              className="input input-bordered md:w-150 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-10 mt-10 pb-10">
            {filteredItems.map((item) => (
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
                  <h2 className="card-title text-center text-white">{item.title}</h2>
                  <p className="text-white">{item.description}</p>
                  <p className="text-white">
                    <strong className="text-white">Category:</strong> {item.category}
                  </p>
                  <p className="text-white">
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p className="text-white">
                    <strong>Date Lost:</strong> {new Date(item.dateLost).toLocaleDateString()}
                  </p>
                  <Link to={`/items/${item._id}`} className="btn text-white bg-bgforRecent">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllItems;