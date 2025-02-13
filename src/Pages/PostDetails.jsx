import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const successModalStyle = {
  ...modalStyle,
  width: 300,
};

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [recoveryDate, setRecoveryDate] = useState(new Date());
  const [recoveredLocation, setRecoveredLocation] = useState("");

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `https://whereisitserver.vercel.app/lost-items/${id}`
        );
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItemDetails();
  }, [id]);

  const handleRecover = async () => {
    if (item.status === "recovered") {
      toast.error("This item has already been marked as recovered.");
      return;
    }

    const recoveryData = {
      recoveredLocation,
      recoveryDate,
      recoveredByEmail: user.email,
      recoveredByName: user.displayName,
      thumbnail: item.thumbnail,
    };

    try {
      const response = await fetch(
        `https://whereisitserver.vercel.app/recover-item/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recoveryData),
        }
      );

      if (response.ok) {
        toast.success("Item successfully marked as recovered!");
        setItem({ ...item, status: "recovered" });
        setOpenModal(false);
        setOpenSuccessModal(true);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to recover the item.");
      }
    } catch (error) {
      console.error("Error recovering item:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (isLoading || !item) return <Loading />;

  return (
    <div>
      <div className="ml-4 md:ml-20">
      <Navbar />
      </div>
 
      <div className="w-11/12 lg:w-8/12 mx-auto py-16 bg-gray-100 mb-10 shadow-lg flex flex-col lg:flex-row gap-6 mt-60 items-center">
       
        {item.thumbnail && (
          <img
            src={item.thumbnail}
            alt={item.title || "Item Thumbnail"}
            className="w-full lg:w-1/2 rounded-lg md:ml-20"
          />
        )}

     
        <div className="flex flex-col justify-center items-start text-left w-1/2 lg:w-1/2">
          <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-black">
            {item.title}
          </h2>
          <p className="text-lg mb-4 text-black">{item.description}</p>
          <p className="text-lg font-bold mb-4 text-black">
            Status: {item.postType}
          </p>

          
          {item.status !== "recovered" && (
            <button
              className="btn bg-blue-500 text-white mb-4"
              onClick={() => setOpenModal(true)}
            >
              {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
            </button>
          )}
          {item.status === "recovered" && (
            <button
              className="btn bg-gray-400 text-black cursor-not-allowed mb-4"
              disabled
            >
              Already Recovered
            </button>
          )}
          <Link to="/allitems" className="btn bg-bgButton1 text-black">
            Back
          </Link>
        </div>
      </div>

  
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <h2 className="text-xl font-bold mb-4">Recovery Details</h2>
          <p className="mb-4">
            <strong>
              {item.postType === "Lost" ? "Found Description" : "Lost Description"}
            </strong>
            : {item.description}
          </p>
          <label className="block mb-2">
            {item.postType === "Lost" ? "Found Location" : "Lost Location"}
          </label>
          <input
            type="text"
            value={recoveredLocation}
            onChange={(e) => setRecoveredLocation(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />
          <label className="block mb-2">
            {item.postType === "Lost" ? "Found Date" : "Lost Date"}
          </label>
          <DatePicker
            selected={recoveryDate}
            onChange={(date) => setRecoveryDate(date)}
            className="w-full border rounded p-2 mb-4"
          />
          <p className="mb-4">
            <strong>Recovered By:</strong> {user.displayName} ({user.email})
          </p>
          <button
            className="btn bg-green-500 text-white"
            onClick={handleRecover}
            disabled={item.status === "recovered"}
          >
            Submit
          </button>
        </Box>
      </Modal>

     
      <Modal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
        <Box sx={successModalStyle}>
          <h2 className="text-xl font-bold mb-4">Success!</h2>
          <p className="mb-4">
            Your item has been successfully marked as recovered!
          </p>
          <button
            className="btn bg-blue-500 text-white"
            onClick={() => setOpenSuccessModal(false)}
          >
            Close
          </button>
        </Box>
      </Modal>
      <Footer />
    </div>
  );
};

export default PostDetails;