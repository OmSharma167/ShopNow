import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container mx-auto mt-24 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div
              className="bg-white shadow-md rounded-lg overflow-hidden"
              key={c._id}
            >
              <Link
                to={`/category/${c.slug}`}
                className="block p-4 text-center text-xl font-semibold text-blue-600 hover:bg-blue-50"
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
