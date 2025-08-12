import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug, getProductsByCat]);

  return (
    <Layout>
      <div className="container mx-auto mt-12 px-4">
        <h4 className="text-center text-2xl font-semibold mb-4">
          Category - {category?.name}
        </h4>
        <h6 className="text-center text-lg text-gray-600 mb-6">
          {products?.length} result{products?.length !== 1 ? "s" : ""} found
        </h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((p) => (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              key={p._id}
            >
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="w-full h-48 object-cover"
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
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
