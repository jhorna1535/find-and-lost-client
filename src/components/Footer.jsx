import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div id="footer" className="text-white pt-10 pb-5 border-t border-gray-300 bg-Footer">
            <div className="max-w-screen-xl mx-auto px-4">

                <div className="flex justify-between items-center mb-8">

                <Link to="/" className="flex items-center gap-2">
                           <img
                             className="w-20"
                             src="../../assets/WhereIsIt.png"
                             alt="WhereIsIt"
                           />
                         </Link>

                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-all">
                            <FaFacebook className="text-white hover:text-orange-400 text-3xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=" text-white hover:text-orange-400 transition-all">
                            <FaTwitter className="text-white hover:text-orange-400 text-3xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-all">
                            <FaInstagram className="text-white hover:text-orange-400 text-3xl" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className=" text-white hover:text-orange-400 transition-all">
                            <FaYoutube className="text-white hover:text-orange-400 text-3xl" />
                        </a>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    <div>
                        <h4 className="text-2xl font-semibold text-white mb-4">About Us</h4>
                        <p className="text-sm text-white">
                        WhereIsIT?! Website, a platform designed to connect individuals
who have lost personal belongings with those who may have found them. Users can
report lost items, browse found items, and interact to recover their belongings
                        </p>
                    </div>


                    

                    <div>
                        <h4 className="text-2xl font-semibold text-white mb-4">Contact Us</h4>
                        <p className="text-sm text-white">Email: WhereIsIt@gmail.com</p>
                        <p className="text-sm text-white">Phone: +88012345678</p>
                        <p className="text-sm text-white">Address: Dhaka,Bangladesh</p>
                    </div>
                </div>


                <div className="text-center text-sm text-gray-400">
                
                </div>
            </div>
        </div>
    );
};

export default Footer;
