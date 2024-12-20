import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RiwayatPesanan.css";

export const Selesai = () => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const fetchCheckoutData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/checkout/checkout`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCheckoutData(response.data); // Set data checkout
    } catch (err) {
      setError(err.response?.data?.error || "Gagal mengambil data checkout");
    } finally {
      setLoading(false); // Hentikan loading
    }
  };

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const changePage = (pageUrl) => {
    window.location.href = pageUrl;
  };

  if (loading) return <div>Memuat data...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  const { cartItems, total } = checkoutData || { cartItems: [], total: 0 };

  return (
    <div className="hubungi container mt-5 p-5">
      {/* Header */}
      <h4>ThriftHunt | Riwayat Pesanan</h4>

      {/* Tabs */}
      <div className="tabs-container my-4 d-flex justify-content-around bg-white p-3 rounded">
        <div
          className="tab-item"
          onClick={() => changePage("/konfirmasipesanan")}
        >
          Konfirmasi Pesanan
        </div>
        <div className="tab-item" onClick={() => changePage("/riwayatpesanan")}>
          Sedang Dikemas
        </div>
        <div className="tab-item" onClick={() => changePage("/dikirim")}>
          Dikirim
        </div>
        <div
          className="tab-item active-tab"
          onClick={() => changePage("/selesai")}
        >
          Selesai
        </div>
        <div className="tab-item" onClick={() => changePage("/dibatalkan")}>
          Dibatalkan
        </div>
      </div>

      {/* Content */}
      <div className="card-riwayat">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="order-header">
            Pesanan Diterima – Pesanan diterima oleh Pembeli.
          </div>
        </div>

        {/* Product List */}
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="product-row" key={item.id}>
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${item.Product.image}`}
                alt={item.Product.name}
                className="product-img"
              />
              <div className="w-100 d-flex justify-content-between align-items-center">
                <div>
                  <div className="font-weight-bold">{item.Product.name}</div>
                  <div className="order-details">
                    Ukuran: {item.Product.sizes}
                  </div>
                </div>
                <div className="font-weight-bold">
                  Rp. {parseInt(item.Product.price).toLocaleString("id-ID")} x{" "}
                  {item.quantity}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Keranjang Anda kosong.</div>
        )}

        <div className="d-flex justify-content-between align-items-center font-weight-bold mt-4">
          <div>Total Pesanan:</div>
          <div>Rp. {parseInt(total).toLocaleString("id-ID")}</div>
        </div>
        
        {/* Buttons */}
        <div className="button-hubungi d-flex justify-content-end mt-4">
          <a
            href="https://wa.me/+6285231585582?text=Chat%20Dengan%20Admin%20Untuk%20Konfirmasi"
            className="btn btn-primary mr-3"
          >
            Hubungi Kami
          </a>
          <a href="/product" className="btn btn-outline-primary">
            Beli Lagi
          </a>
          {/* <button className="btn btn-outline-primary">Nilai</button> */}
        </div>
      </div>
    </div>
  );
};
