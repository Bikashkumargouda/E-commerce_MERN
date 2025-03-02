import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold">E-Shop</h2>
          <p className="mt-2 text-sm text-gray-400">Your one-stop shop for all your needs.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><a href="#" className="hover:text-gray-200">Home</a></li>
            <li><a href="#" className="hover:text-gray-200">Shop</a></li>
            <li><a href="#" className="hover:text-gray-200">About Us</a></li>
            <li><a href="#" className="hover:text-gray-200">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><a href="#" className="hover:text-gray-200">FAQs</a></li>
            <li><a href="#" className="hover:text-gray-200">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gray-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-200">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} E-Shop. All Rights Reserved.
      </div>
    </footer>
  );
}
