import React, { useContext, useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsDropdownOpen(false); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="bg-Profile shadow-md w-11/12 rounded-full fixed top-0 z-50 mt-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
         
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-20"
              src="../../assets/WhereIsIt.png"
              alt="WhereIsIt"
            />
          </Link>

          
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <FaBars size={24} />
          </button>

         
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-Buttons font-semibold border-b-2 text-xs md:text-sm border-Buttons pb-1"
                  : "text-white text-xs md:text-sm hover:text-Buttons"
              }
            >
              Home
            </NavLink>
            <div className="relative">
             
            </div>
            <NavLink
              to="/allitems"
              className={({ isActive }) =>
                isActive
                  ? "text-Buttons font-semibold border-b-2 text-xs md:text-sm border-Buttons pb-1"
                  : "text-white text-xs md:text-sm hover:text-Buttons"
              }
            >
              Lost & Found Items
            </NavLink>
          </div>

       
          <div className="relative flex items-center gap-4">
            {user && user?.email ? (
              <>
                <img
                  className="w-10 h-10 rounded-full cursor-pointer "
                  src={user?.photoURL}
                  alt="User Profile"
                  onClick={toggleUserMenu}
                />
                {isUserMenuOpen && (
                  <div className="absolute top-10 -left-20 md:right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-30">
                    <div className="p-4 text-black border-b">
                      {user?.displayName}
                    </div>
                    <NavLink
                      to="/additems"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      Add Lost & Found Item
                    </NavLink>
                    <NavLink
                      to="/recovereditem"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      All Recovered Items
                    </NavLink>
                    <NavLink
                      to="/mangeitem"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      Manage My Items
                    </NavLink>
                  </div>
                )}
              </>
            ) : (
              <FaUser className="text-white" />
            )}

         
            {user ? (
              <button
                onClick={handleLogOut}
                className="bg-Buttons text-black px-1 py-1 md:py-2 md:px-4 rounded hover:bg-opacity-90 transition"
              >
                Log Out
              </button>
            ) : (
              <NavLink
                to="/auth/login"
                className="bg-Buttons text-black py-2 px-4 rounded hover:bg-opacity-90 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
