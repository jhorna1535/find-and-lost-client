import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/AuthProvider";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import Aos from 'aos';
import 'aos/dist/aos.css';

const Register = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
}, []);

  useEffect(() => {
    document.title = "Register | WhereIsIt?";
    window.scrollTo(0, 0);
  }, []);

  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);


    const passwordError = {};
    if (!/[A-Z]/.test(value)) {
      passwordError.uppercase = "Must include at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      passwordError.lowercase = "Must include at least one lowercase letter";
    }
    if (value.length < 6) {
      passwordError.length = "Must be at least 6 characters long";
    }

    setError((prev) => ({
      ...prev,
      password: Object.keys(passwordError).length ? passwordError : null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");

    if (name.length < 4) {
      setError({ ...error, name: "Must be more than 4 characters long" });
      toast.error("Name Must be more than 4 characters long!");
      return;
    }

    if (error.password) {
      alert("Please fix the password errors before submitting.");
      toast.error("Please fix the password errors before submitting.");
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            toast.success("Registration successful!", { autoClose: 3000 });
                        setTimeout(() =>{
                            navigate("/");
                        }, 2000);
          })
          .catch((err) => {
           
            toast.error("Error updating profile: " + err.message);
          });
      })
      .catch((err) => {
        alert("Registration failed: " + err.message);
        toast.error("Registration failed: " + err.message);
        
      });
  };

  return (
    
    <div>
        <ToastContainer position="top-center" />
      <div className="hero   min-h-screen flex items-center justify-center mt-20" data-aos="fade-up">
        <div className="hero-content flex-col  gap-6 w-full px-4 sm:px-8 md:px-16 lg:px-0">
          <div className="text-center lg:text-left mt-20">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input name="name" type="text" placeholder="Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input name="photo" type="url" placeholder="Photo URL" className="input input-bordered" required />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
              
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="input input-bordered"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-xs absolute right-2 top-12"
                  >
                    {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                  </button>
           
           
                {error.password && (
                  <ul className="text-red-500 text-sm mt-2">
                    {Object.values(error.password).map((errMsg, index) => (
                      <li key={index}>{errMsg}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="form-control mt-6">
                <button disabled={!!error.password} className="btn bg-Profile text-white">
                  Register
                </button>
              </div>
              <div className="flex justify-between mt-4">
                <Link to="/auth/login" className="link link-hover text-sm">
                  Already have an account? Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
