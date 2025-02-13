import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddLostAndFound = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateLost, setDateLost] = useState(new Date());
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 1000 });
    document.title = "Add Lost & Found Item | WhereIsIt";
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();

    
    const postType = e.target.postType.value;
    const thumbnail = e.target.thumbnail.value;  
    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const location = e.target.location.value;


    const newItem = {
      postType,
      thumbnail,
      title,
      description,
      category,
      location,
      dateLost,
      username: user?.displayName || "Anonymous User",
      email: user?.email || "Anonymous",  
    };

  
    console.log("New Item:", newItem);

 
    fetch("https://whereisitserver.vercel.app/lost-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Lost & Found Item added successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          e.target.reset(); 
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to add item.",
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mt-40 w-11/12 mx-auto">
        <Navbar />
      </div>
      <div className="lg:w-3/4 mx-auto mb-10" data-aos="fade-up">
        <div className="text-center p-10">
          <h1 className="text-5xl font-bold">Add Lost & Found Item</h1>
        </div>
        <div className="card bg-Buttons w-full shadow-2xl">
          <form onSubmit={handleAddItem} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Post Type</span>
              </label>
              <select name="postType" className="input input-bordered" required>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Thumbnail (Image URL)</span>
              </label>
              <input
                type="text"
                name="thumbnail"
                placeholder="Enter your Thumbnail URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Item title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Describe the item"
                className="textarea textarea-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Category</span>
              </label>
              <select name="category" className="input input-bordered" required>
                <option value="pets">Pets</option>
                <option value="documents">Documents</option>
                <option value="gadgets">Gadgets</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location where the item was lost"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Date Lost</span>
              </label>
              <DatePicker
                selected={dateLost}
                onChange={(date) => setDateLost(date)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-Profile hover:bg-Footer text-white">
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddLostAndFound;