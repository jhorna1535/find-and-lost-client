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
import useAxiosSecure from "../components/useAxiosSecure";
const ManageItem = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const axiosSecure=useAxiosSecure();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    document.title = "Manage Items | WhereIsIt?";
  }, []);

  useEffect(() => {
 
    if (user?.email) {
      axiosSecure.get(`lost-items?email=${user.email}`,{withCredentials:true})
      .then((res) => setItems(res.data))
      .catch((error) => console.error("Error fetching items:", error))
      .finally(() => setIsLoading(false)); 

    }



  }, [user?.email]);

  const handleItemDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://whereisitserver.vercel.app
/lost-items/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((response) => {
            if (response.acknowledged) {
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
              setItems((prev) => prev.filter((item) => item._id !== id));
            } else {
              Swal.fire(
                "Error!",
                response.message || "Failed to delete the item.",
                "error"
              );
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the item.", "error");
          });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
    <div className="flex flex-col min-h-screen w-11/12 mx-auto mt-20">
      <Navbar />
      <div className="mt-20 w-11/12 mx-auto flex-grow " data-aos="fade-up">
        <h2 className="text-3xl text-center mt-20">My Items</h2>

        <div className="text-center mt-4">
          <p>Email: {user?.email || "Not logged in"}</p>
          <p>Username: {user?.displayName || "Anonymous"}</p>
        </div>

        <div className="overflow-auto mt-6 mb-10">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300 text-black">Thumbnails</th>
                <th className="p-2 border border-gray-300 text-black">Title</th>
                <th className="p-2 border border-gray-300 text-black">Category</th>
                <th className="p-2 border border-gray-300 text-black">Status</th>
                <th className="p-2 border border-gray-300 text-black">Location</th>
                <th className="p-2 border border-gray-300 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="p-2 border border-gray-300">
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={item.thumbnail || "/default-thumbnail.jpg"}
                        alt={item.title}
                      />
                    </td>
                    <td className="p-2 border border-gray-300">{item.title}</td>
                    <td className="p-2 border border-gray-300">{item.category}</td>
                    <td className="p-2 border border-gray-300">{item.status}</td>
                    <td className="p-2 border border-gray-300">{item.location}</td>
                    <td className="p-2 border border-gray-300">
                      <Link
                        to={`/updateitem/${item._id}`}
                        className="btn bg-blue-500 text-white p-2 rounded"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleItemDelete(item._id)}
                        className="btn ml-2 bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <div className="flex flex-col items-center">
                      <img
                        src="/no-data.svg"
                        alt="No Data"
                        className="w-20 h-20 mb-2"
                      />
                      <p className="text-gray-500">No items found for this user. Try adding some items!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <Footer />
    </div>

  );
};

export default ManageItem;