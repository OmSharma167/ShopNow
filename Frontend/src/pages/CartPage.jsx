// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const CartPage = () => {
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getToken = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/braintree/token");
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   return (
//     <Layout>
//       <div className="container mx-auto p-4">
//         <div className="text-center bg-gray-100 p-4 mb-4 rounded-md">
//           <h1 className="text-xl font-semibold">
//             {!auth?.user
//               ? "Hello Guest"
//               : `Hello  ${auth?.token && auth?.user?.name}`}
//           </h1>
//           <p>
//             {cart?.length
//               ? `You Have ${cart.length} items in your cart ${
//                   auth?.token ? "" : "please login to checkout!"
//                 }`
//               : "Your Cart Is Empty"}
//           </p>
//         </div>

//         <div className="flex flex-wrap">
//           <div className="w-full md:w-7/12 p-0">
//             {cart?.map((p) => (
//               <div className="flex mb-4 p-4 bg-white shadow-md rounded-md" key={p._id}>
//                 <div className="w-1/3">
//                   <img
//                     src={`/api/v1/product/product-photo/${p._id}`}
//                     className="w-full h-24 object-cover"
//                     alt={p.name}
//                   />
//                 </div>
//                 <div className="w-2/3 ml-4">
//                   <h4 className="text-lg font-semibold">{p.name}</h4>
//                   <p className="text-gray-600">{p.description}</p>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-lg font-semibold">
//                       {p.price.toLocaleString("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                       })}
//                     </span>
//                     <button
//                       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//                       onClick={() => removeCartItem(p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="w-full md:w-5/12 p-4">
//             <h4 className="text-lg font-semibold mb-4">Cart Summary</h4>
//             <div className="bg-white p-4 shadow-md rounded-md">
//               <p className="text-lg font-semibold mb-2">Total: {totalPrice()}</p>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                 onClick={() => navigate("/CheckoutPage")}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;

import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      if (index !== -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="text-center bg-gray-100 p-4 mb-4 rounded-md">
          <h1 className="text-xl font-semibold">
            {!auth?.user ? "Hello Guest" : `Hello  ${auth?.user?.name}`}
          </h1>
          <p>
            {cart?.length
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout!"
                }`
              : "Your cart is empty"}
          </p>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full md:w-7/12 p-0">
            {cart?.map((p) => (
              <div
                className="flex mb-4 p-4 bg-white shadow-md rounded-md"
                key={p._id}
              >
                <div className="w-1/3">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="w-full h-24 object-cover"
                    alt={p.name}
                  />
                </div>
                <div className="w-2/3 ml-4">
                  <h4 className="text-lg font-semibold">{p.name}</h4>
                  <p className="text-gray-600">{p.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-semibold">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-5/12 p-4">
            <h4 className="text-lg font-semibold mb-4">Cart Summary</h4>
            <div className="bg-white p-4 shadow-md rounded-md">
              <p className="text-lg font-semibold mb-2">
                Total: {totalPrice()}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => navigate("/CheckoutPage")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
