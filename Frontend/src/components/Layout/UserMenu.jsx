import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h4 className="text-xl font-semibold mb-2">Dashboard</h4>
        <div className="flex flex-col">
          <NavLink
            to="/dashboard/user/profile"
            className="py-2 px-4 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
