// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import AdminMenu from '../../components/Layout/AdminMenu'

// function Users() {
//   return (
//      <Layout>
//       <div className="flex w-full md:flex-row">
//         <div className="md:w-1/3">
//           <AdminMenu />
//         </div>
//         <div className="md:w-3/4 p-4">
//           <h1 className="text-xl font-semibold"> All Users</h1>
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default Users

import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/get-users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="flex flex-col md:flex-row p-6 bg-gray-100 min-h-screen">
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4">
          <h1 className="text-2xl font-bold mb-4">All Users</h1>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => console.log("Edit user", user._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="ml-4 text-red-600 hover:text-red-900"
                        onClick={() => console.log("Delete user", user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
