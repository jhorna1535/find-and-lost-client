import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import useAxiosSecure from "../components/useAxiosSecure";

const RecoveredItem = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCardView, setIsCardView] = useState(true); 
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    document.title = "Recovered Items | WhereIsIt?";
    if (user?.email) {
      axiosSecure
        .get(`/recovered-items?email=${user.email}`, { withCredentials: true })
        .then((res) => setItems(res.data))
        .catch((error) => console.error("Error fetching recovered items:", error))
        .finally(() => setIsLoading(false));
    }
  }, [user?.email]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col min-h-screen w-11/12 mx-auto mt-20">
        <Navbar />
        <div className="mt-20 w-11/12 mx-auto flex-grow " data-aos="fade-up">
          <h2 className="text-3xl text-center mt-20">My Recovered Items</h2>

          <div className="text-center mt-4">
            <p>Email: {user?.email || "Not logged in"}</p>
            <p>Username: {user?.displayName || "Anonymous"}</p>
          </div>

       
          <div className="flex justify-center items-center my-4">
            <label className="flex items-center gap-2">
              <span>Card View</span>
              <input
                type="checkbox"
                className="toggle"
                checked={isCardView}
                onChange={() => setIsCardView(!isCardView)}
              />
              <span>Table View</span>
            </label>
          </div>

       
          {isCardView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {items.length > 0 ? (
                items.map((item) => (
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
                      <h2 className="card-title text-center text-white">{item.recoveredLocation || "Untitled"}</h2>
                      <p className="text-white">{item.recoveredByName || "No description provided."}</p>
                 
                      <p className="text-white">
                        <strong>Date:</strong> {new Date(item.recoveredAt).toLocaleDateString()}
                      </p>
                      <p className="text-white">
                        <strong>Status:</strong>{" "}
                        {item.status}
                      </p>
                      
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No items found.</p>
              )}
            </div>
          ) : (
            <div className="overflow-auto mt-6 mb-10">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border border-gray-300 text-black">Location</th>
                    <th className="p-2 border border-gray-300 text-black">Recovered By</th>
                    <th className="p-2 border border-gray-300 text-black">Recovery Date</th>
                    <th className="p-2 border border-gray-300 text-black">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-100">
                        <td className="p-2 border border-gray-300">{item.recoveredLocation}</td>
                        <td className="p-2 border border-gray-300">{item.recoveredByName}</td>
                        <td className="p-2 border border-gray-300">
                          {new Date(item.recoveredAt).toLocaleDateString()}
                        </td>
                        <td className="p-2 border border-gray-300">{item.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No recovered items found for this user. Try recovering some items!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecoveredItem;