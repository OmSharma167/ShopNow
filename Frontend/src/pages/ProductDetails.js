import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart"; // Import the useCart hook
import { toast } from "react-toastify"; // Import toast from react-toastify

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8 flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="object-cover h-80 w-full md:w-80"
            alt={product.name}
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 px-4 md:px-8">
          <h1 className="text-2xl font-bold text-center mb-4">
            Product Details
          </h1>
          <hr className="my-4" />
          <h6 className="text-lg font-semibold mb-2">Name: {product.name}</h6>
          <h6 className="text-lg font-semibold mb-2">
            Description: {product.description}
          </h6>
          <h6 className="text-lg font-semibold mb-2">
            Price:{" "}
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6 className="text-lg font-semibold mb-4">
            Category: {product?.category?.name}
          </h6>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <hr className="my-8" />

      <div className="container mx-auto">
        <h4 className="text-xl font-bold mb-4">Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center text-gray-600">No Similar Products found</p>
        )}
        <div className="flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={p._id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="object-cover h-48 w-full"
                  alt={p.name}
                />
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-lg font-semibold">{p.name}</h5>
                    <h5 className="text-lg font-semibold text-blue-600">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    {/* Uncomment and style this button if needed */}
                    {/* <button
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
