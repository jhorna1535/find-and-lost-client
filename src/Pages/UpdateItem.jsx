import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Swal from 'sweetalert2';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateItem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemData, setItemData] = useState(null);
  const [dateLost, setDateLost] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams(); 

  useEffect(() => {
    Aos.init({ duration: 1000 });
    document.title = "Update Lost & Found Item | WhereIsIt";

   
    fetch(`https://whereisitserver.vercel.app
/lost-items/${id}`)
      .then(res => res.json())
      .then(data => {
        setItemData(data);
        setDateLost(new Date(data.dateLost)); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleUpdateItem = (e) => {
    e.preventDefault();

    const postType = e.target.postType.value;
    const thumbnail = e.target.thumbnail.value;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const location = e.target.location.value;

    const updatedItem = {
      postType,
      thumbnail,
      title,
      description,
      category,
      location,
      dateLost,
      contactInfo: {
        name: user?.displayName || "Anonymous User",
        email: user?.email || "Anonymous",
      },
    };

    fetch(`https://whereisitserver.vercel.app
/lost-items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Lost & Found Item updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate('/mangeitem');
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to update item.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      })
      .catch((error) => {
        console.error("Network or server error:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  if (isLoading || !itemData) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mt-10 w-11/12 mx-auto">
        <Navbar />
      </div>
      <div className="lg:w-3/4 mx-auto mb-10 mt-20" data-aos="fade-up">
        <div className="text-center p-10 mt-20">
          <h1 className="text-5xl font-bold mt-20">Update Lost & Found Item</h1>
        </div>
        <div className="card bg-Buttons w-full shadow-2xl">
          <form onSubmit={handleUpdateItem} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Post Type</span>
              </label>
              <select name="postType" className="input input-bordered" defaultValue={itemData.postType} required>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Thumbnail (Image URL)</span>
              </label>
              <input
                type="text"
                name="thumbnail"
                defaultValue={itemData.thumbnail}
                placeholder="Enter your Thumbnail URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Title</span>
              </label>
              <input
                type="text"
                name="title"
                defaultValue={itemData.title}
                placeholder="Item title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Description</span>
              </label>
              <textarea
                name="description"
                defaultValue={itemData.description}
                placeholder="Describe the item"
                className="textarea textarea-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Category</span>
              </label>
              <select name="category" className="input input-bordered" defaultValue={itemData.category} required>
                <option value="pets">Pets</option>
                <option value="documents">Documents</option>
                <option value="gadgets">Gadgets</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Location</span>
              </label>
              <input
                type="text"
                name="location"
                defaultValue={itemData.location}
                placeholder="Location where the item was lost"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Date Lost</span>
              </label>
              <DatePicker
                selected={dateLost}
                onChange={(date) => setDateLost(date)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Contact Information</span>
              </label>
              <input
                type="text"
                value={user?.displayName || "Anonymous User"}
                disabled
                className="input input-bordered mb-2"
              />
              <input
                type="email"
                value={user?.email || "Anonymous"}
                disabled
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-Profile hover:bg-Footer text-white">
                Update Item
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateItem;
