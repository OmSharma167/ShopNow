import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <h4 className="text-xl font-bold mb-4">Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="w-full text-center py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="w-full text-center py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="w-full text-center py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="w-full text-center py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Orders
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/users"
            className="w-full text-center py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Users
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
