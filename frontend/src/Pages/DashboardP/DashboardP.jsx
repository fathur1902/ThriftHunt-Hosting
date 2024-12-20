import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardP.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBox, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function DashboardP() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/checkout/admin/checkout",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("API Response:", response.data); // Debug log

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setOrders([]); // Pastikan tetap array
      }
    } catch (err) {
      setError(err.response?.data?.error || "Gagal mengambil data pesanan");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/checkout/checkout/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Perbarui status pesanan di UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert("Gagal memperbarui status pesanan.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changePage = (pageUrl) => {
    window.location.href = pageUrl;
  };

  if (loading) return <div>Memuat data...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!Array.isArray(orders)) {
    return <div className="text-danger">Data pesanan tidak valid.</div>;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar mt-0">
        <div className="d-flex align-items-center mb-4">
          <div
            className="bg-white rounded-circle me-2"
            style={{ width: "40px", height: "40px" }}
          ></div>
          <h1 className="fs-4 fw-bold">Thrift Hunt</h1>
        </div>
        <button
          className="btn btn-gradient mb-3"
          onClick={() => changePage("/dashboard")}
        >
          <FontAwesomeIcon icon={faEdit} className="me-2" />
          Edit Produk
        </button>
        <button
          className="btn btn-light mb-3"
          onClick={() => changePage("/DashboardP")}
        >
          <FontAwesomeIcon icon={faBox} className="me-2" />
          Lihat Pesanan
        </button>
        <button
          className="btn btn-gradient"
          onClick={() => changePage("/login")}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-fill p-4 bg-white">
        <h2 className="fs-3 fw-semibold">Daftar Pesanan</h2>
        <div className="d-flex flex-column gap-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdateStatus={updateOrderStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, onUpdateStatus }) {
  const { id, user, cartItems, address, phone, status } = order;
  const statusOptions = [
    "Konfirmasi Pesanan",
    "Sedang Dikemas",
    "Dikirim",
    "Selesai",
  ];

  return (
    <div className="order-card position-relative">
      <h5>{user?.name}</h5>
      <p>
        Alamat: {address}
        <br />
        No. Telp: {phone}
        <br />
        Total Produk: {cartItems.length}
      </p>
      <p>
        Detail:
        <br />
        {cartItems.map((item, index) => (
          <span key={index}>
            {index + 1}. {item.Product.name}: Rp {item.Product.price}
            <br />
          </span>
        ))}
      </p>
      <div className="status-container">
        {statusOptions.map((option) => (
          <button
            key={option}
            className={`status-btn ${status === option ? "active" : ""}`}
            onClick={() => onUpdateStatus(id, option)}
          >
            {option}
          </button>
        ))}
        <button
          className="btn btn-danger"
          onClick={() => onUpdateStatus(id, "Dibatalkan")}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
