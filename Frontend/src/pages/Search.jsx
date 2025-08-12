import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <h6 className="text-lg text-gray-600 mb-4">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} products`}
          </h6>
          <div className="flex flex-wrap justify-center gap-4">
            {values?.results.map((p) => (
              <div
                className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-80 md:w-96"
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="object-cover w-full h-48"
                  alt={p.name}
                />
                <div className="p-4">
                  <h5 className="text-xl font-semibold mb-2">{p.name}</h5>
                  <p className="text-gray-700 mb-2">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="text-lg font-semibold mb-4">
                    $
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                      More Details
                    </button>
                    <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
