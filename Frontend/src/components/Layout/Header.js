// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { FaCartShopping } from "react-icons/fa6";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import SearchInput from "../Form/SearchInput";
// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [auth, setAuth] = useAuth();

//   const handleLogout = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//     toast.success("Logout Successfully");
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleProfileMenu = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   return (
//     <nav className="bg-slate-600 sticky top-0 shadow-xl z-50">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         {/* Brand */}
//         <div className="text-white text-xl font-semibold hover:underline-offset-4 flex">
//           <NavLink to="/" className="flex gap-2">
//             <FaCartShopping />
//             MyBrand
//           </NavLink>
//         </div>
//         <div>
//           <SearchInput/>
//         </div>

//         {/* Mobile menu button */}
//         <div className="lg:hidden">
//           <button
//             onClick={toggleMenu}
//             className="text-gray-300 hover:text-white focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//           </button>
//         </div>

//         {/* Menu items for larger screens */}
//         <div className="hidden lg:flex lg:items-center lg:space-x-6">
//           <NavLink
//             to="/"
//             className="text-gray-300 hover:text-white transition-colors duration-200"
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/about"
//             className="text-gray-300 hover:text-white transition-colors duration-200"
//           >
//             About
//           </NavLink>

//           {!auth.user ? (
//             <>
//               <NavLink
//                 to="/register"
//                 className="text-gray-300 hover:text-white transition-colors duration-200"
//               >
//                 Register
//               </NavLink>
//               <NavLink
//                 to="/login"
//                 className="text-gray-300 hover:text-white transition-colors duration-200"
//               >
//                 Login
//               </NavLink>
//             </>
//           ) : (
//             <div className="relative">
//               <button
//                 className="text-gray-300 hover:text-white transition-colors duration-200"
//                 onClick={toggleProfileMenu}
//               >
//                 {auth?.user?.name}
//               </button>
//               {isProfileOpen && (
//                 <ul className="absolute mt-2 right-0 bg-white shadow-lg rounded-md p-2 w-48 z-10">
//                   <li>

//                     {/* <NavLink
//                       to='/dashboard'
//                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                       >
//                         Dashboard
//                     </NavLink> */}

//                     <NavLink
//                       to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
//                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                       >
//                         Dashboard
//                     </NavLink>

//                   </li>
//                   <li>
//                     <NavLink
//                       onClick={handleLogout}
//                       to="/login"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     >
//                       Logout
//                     </NavLink>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           )}

//           <NavLink
//             to="/cart"
//             className="text-gray-300 hover:text-white transition-colors duration-200"
//           >
//             Cart
//           </NavLink>
//           <div className="relative group">
//             <button className="text-gray-300 hover:text-white transition-colors duration-200">
//               More
//             </button>
//             <ul className="absolute hidden group-hover:block text-gray-300 bg-gray-800 mt-2 space-y-2 shadow-lg rounded-md p-2 z-10">
//               <li>
//                 <NavLink
//                   to="/contact"
//                   className="block px-4 py-2 hover:bg-gray-700 rounded-md"
//                 >
//                   Contact
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/faq"
//                   className="block px-4 py-2 hover:bg-gray-700 rounded-md"
//                 >
//                   FAQ
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu (only 30% screen width, aligned to the left) */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           <div className="bg-slate-600 w-1/3 h-full flex flex-col p-4 space-y-4">
//             <button onClick={toggleMenu} className="text-gray-300 self-end">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 ></path>
//               </svg>
//             </button>
//             <NavLink
//               to="/"
//               className="text-gray-300 hover:text-white transition-colors duration-200"
//               onClick={toggleMenu}
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/about"
//               className="text-gray-300 hover:text-white transition-colors duration-200"
//               onClick={toggleMenu}
//             >
//               About
//             </NavLink>
//             <NavLink
//               to="/services"
//               className="text-gray-300 hover:text-white transition-colors duration-200"
//               onClick={toggleMenu}
//             >
//               Services
//             </NavLink>
//             <NavLink
//               to="/contact"
//               className="text-gray-300 hover:text-white transition-colors duration-200"
//               onClick={toggleMenu}
//             >
//               Contact
//             </NavLink>

//             <NavLink
//               to="/faq"
//               className="text-gray-300 hover:text-white transition-colors duration-200"
//               onClick={toggleMenu}
//             >
//               FAQ
//             </NavLink>
//           </div>
//           {/* Overlay for the rest of the screen to close the menu */}
//           <div
//             className="w-2/3 h-full bg-black bg-opacity-50"
//             onClick={toggleMenu}
//           ></div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Header;

// {isMenuOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           <div className="bg-slate-600 w-1/3 h-full flex flex-col p-4 space-y-4">
//             <button onClick={() => setMenuOpen(false)} className="text-gray-300 self-end">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <NavLink to="/" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Home</NavLink>
//             <NavLink to="/about" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>About</NavLink>
//             <NavLink to="/contact" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Contact</NavLink>
//             <NavLink to="/faq" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>FAQ</NavLink>
//           </div>
//           <div className="w-2/3 h-full bg-black bg-opacity-50" onClick={() => setMenuOpen(false)}></div>
//         </div>
//       )}

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart() || []; // Fallback to an empty array if `cart` is undefined
  const categories = useCategory() || []; // Fallback to an empty array if `categories` is undefined

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="bg-orange-100 border-b fixed w-full z-10 top-0">
      <div className="container mx-auto px-4 flex justify-between items-center py-2">
        <Link to="/" className="text-2xl font-bold">
          🛒
        </Link>
        <div className="flex items-center space-x-4">
          <SearchInput />
          <NavLink to="/" className="text-gray-800 hover:text-blue-600">
            Home
          </NavLink>
          <div className="relative group">
            <NavLink
              to="/categories"
              className="text-gray-800 hover:text-blue-600"
            >
              Categories
            </NavLink>
            <div className="absolute hidden group-hover:block bg-white shadow-md rounded mt-1 w-48">
              <Link
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                to="/categories"
              >
                All Categories
              </Link>
              {categories.map((c) => (
                <Link
                  key={c._id}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  to={`/category/${c.slug}`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {!auth?.user ? (
            <>
              <NavLink
                to="/register"
                className="text-gray-800 hover:text-blue-600"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="text-gray-800 hover:text-blue-600"
              >
                Login
              </NavLink>
            </>
          ) : (
            <div className="relative group">
              <button className="text-gray-800 hover:text-blue-600 focus:outline-none">
                {auth?.user?.name}
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded mt-1 w-48">
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  onClick={handleLogout}
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </NavLink>
              </div>
            </div>
          )}

          <NavLink
            to="/cart"
            className="relative text-gray-800 hover:text-blue-600"
          >
            <Badge count={cart.length} showZero offset={[10, -5]}>
              Cart
            </Badge>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
