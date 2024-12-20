import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Checkout.css";

export function Checkout() {
  const [checkoutData, setCheckoutData] = useState(null);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data checkout dari backend
    const fetchCheckoutData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/checkout/checkout",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCheckoutData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Gagal memuat data");
      }
    };

    fetchCheckoutData();
  }, []);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value); // Tangkap nilai metode pembayaran
  };

  const handleCreateOrder = async () => {
    if (!paymentMethod) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Silakan pilih metode pembayaran!",
      });
      return;
    }

    setIsSubmitting(true); // Set state ke "sedang mengirim"

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + '/checkout/order',
        { paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Pesanan berhasil dibuat!",
        timer: 1500,
        showConfirmButton: true,
      }).then(() => {
        navigate("/kode", { state: { orderId: response.data.orderId } });
      });
      console.log(response.data);

      // Navigasi ke halaman kode setelah pesanan dibuat
    } catch (err) {
      console.error("Error saat membuat pesanan:", err.response || err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.error || "Gagal membuat pesanan",
      });
    } finally {
      setIsSubmitting(false); // Reset state setelah proses selesai
    }
  };

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!checkoutData) {
    return <p>Loading...</p>;
  }

  const {
    user,
    cartItems = [],
    subtotal,
    shipping,
    discount,
    total,
  } = checkoutData;

  return (
    <div className="container my-5 p-5">
      <h2>ThriftHunt | Pemesanan</h2>

      {/* Alamat Pengiriman */}
      <h4 className="mt-4">Alamat Pengiriman</h4>
      <p>
        <strong>
          {user.name} ({user.phone})
        </strong>
        <br />
        {user.address},{user.city}, {user.province}, {user.postalCode},{" "}
        {user.country}
        <a
          className="btn btn-custom btn-sm ms-3 mt-3"
          href={`/ubahalamat/${user.id}`}
        >
          Ubah
        </a>
      </p>

      {/* Rincian Produk */}
      <h4 className="mt-4">Rincian Produk</h4>
      <div className="card-checkout p-3">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Harga Satuan</th>
              <th>Kuantitas</th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.Product && (
                      <>
                        <img
                          src={`http://localhost:3000/uploads/${item.Product.image}`}
                          alt={item.Product.name || "Produk"}
                          className="me-2"
                          height="50"
                          width="50"
                        />
                        {item.Product.name || "Produk Tidak Diketahui"}
                        <br />
                        Ukuran: {item.Product.sizes || "Tidak Ada"}
                      </>
                    )}
                  </td>
                  <td>Rp. {(item.Product?.price || 0).toLocaleString()}</td>
                  <td>{item.quantity || 0}</td>
                  <td>
                    Rp.{" "}
                    {(
                      (item.Product?.price || 0) * (item.quantity || 0)
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Keranjang Anda kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Metode Pembayaran */}
      <h4 className="mt-4">Metode Pembayaran</h4>
      <div className="card-checkout p-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="bank"
            name="paymentMethod"
            value="bank"
            onChange={handlePaymentChange}
          />
          <label className="form-check-label" htmlFor="bank">
            Bank
          </label>
        </div>
        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="radio"
            id="cod"
            name="paymentMethod"
            value="cod"
            onChange={handlePaymentChange}
          />
          <label className="form-check-label" htmlFor="cod">
            COD
          </label>
        </div>
      </div>

      {/* Rincian Pembayaran */}
      <h4 className="mt-4">Rincian Pembayaran</h4>
      <div className="card-checkout p-3">
        <div className="row">
          <div className="col-6">
            <p>Subtotal untuk Produk</p>
            <p>Subtotal Pengiriman</p>
            <p>Diskon</p>
            <h5>Total Pembayaran:</h5>
          </div>
          <div className="col-6 text-end">
            <p>Rp. {subtotal.toLocaleString()}</p>
            <p>Rp. {shipping.toLocaleString()}</p>
            <p>Rp. {discount.toLocaleString()}</p>
            <h5>Rp. {total.toLocaleString()}</h5>
          </div>
        </div>
        <button
          onClick={handleCreateOrder}
          className="btn btn-custom w-100 mt-3"
          disabled={isSubmitting} // Disable tombol saat proses berjalan
        >
          {isSubmitting ? "Memproses..." : "Buat Pesanan"}
        </button>
      </div>
    </div>
  );
}
