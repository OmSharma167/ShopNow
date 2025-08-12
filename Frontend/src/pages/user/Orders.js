import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]); // Added getOrders as a dependency

  const handleStatusChange = (orderId, status) => {
    setSelectedOrderId(orderId);
    setSelectedStatus(status);
  };

  const updateOrderStatus = async () => {
    try {
      const { data } = await axios.put(
        `/api/v1/orders/order-status/${selectedOrderId}`,
        { status: selectedStatus },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setOrders(
        orders.map((order) => (order._id === selectedOrderId ? data : order))
      );
      alert("Order status updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to update the order status.");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="p-6 m-6 dashboard">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <UserMenu />
          </div>
          <div className="md:col-span-3">
            <h1 className="text-center text-2xl font-bold mb-6">All Orders</h1>
            {orders?.map((o, i) => (
              <div
                key={i}
                className="border border-gray-300 shadow-md rounded-lg mb-6"
              >
                <table className="w-full table-auto text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b">#</th>
                      <th className="px-4 py-2 border-b">Status</th>
                      <th className="px-4 py-2 border-b">Buyer</th>
                      <th className="px-4 py-2 border-b">Date</th>
                      <th className="px-4 py-2 border-b">Payment</th>
                      <th className="px-4 py-2 border-b">Quantity</th>
                      <th className="px-4 py-2 border-b">Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border-b">{i + 1}</td>
                      <td className="px-4 py-2 border-b">
                        {o?.status || "Unknown"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {o?.buyer?.name || "Anonymous"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {moment(o?.createdAt).fromNow()}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {o?.payment?.success ? "Success" : "Failed"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {o?.products?.length || 0}
                      </td>
                      <td className="px-4 py-2 border-b">
                        <select
                          value={
                            selectedOrderId === o._id
                              ? selectedStatus
                              : o.status
                          }
                          onChange={(e) =>
                            handleStatusChange(o._id, e.target.value)
                          }
                          className="border border-gray-300 rounded p-1"
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="canceled">Canceled</option>
                        </select>
                        {selectedOrderId === o._id && (
                          <button
                            onClick={updateOrderStatus}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Update Status
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-4">
                  {o?.products?.map((p, i) => (
                    <div
                      key={p._id}
                      className="flex mb-4 p-4 bg-white rounded-lg shadow"
                    >
                      <div className="w-1/3">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="w-full h-24 object-cover rounded-lg"
                          alt={p.name}
                        />
                      </div>
                      <div className="w-2/3 pl-4">
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-gray-600">
                          {p.description.substring(0, 30)}
                        </p>
                        <p className="text-blue-600 font-bold">
                          Price: ${p.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
