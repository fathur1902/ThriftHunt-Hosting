import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Kode.css";

export function Kode() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [vaNumber, setVaNumber] = useState("1234567890123456");
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60 * 1000);
  const [cartItems, setCartItems] = useState([]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(vaNumber)
      .then(() => {
        alert("Nomor Rekening berhasil disalin!");
      })
      .catch((err) => {
        console.error("Gagal menyalin teks: ", err);
      });
  };

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

      setTotalPrice(response.data.total);
      setCartItems(response.data.cartItems);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data checkout:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 1000 ? prevTime - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);

    return `${hours} jam ${minutes} menit ${seconds} detik`;
  };

  return (
    <div className="card-kode p-3">
      {loading ? (
        <div>Memuat data...</div>
      ) : (
        <>
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className=" ms-3 ">
              <div>Total Pembayaran</div>
              <small>Waktu Akhir Pembayaran</small>
            </div>
            <div className="text-end me-3">
              <div className="harga fs-5 fw-bold">
                Rp. {totalPrice.toLocaleString("id-ID")}
              </div>
              <small>
                {timeLeft > 0 ? formatTime(timeLeft) : "Waktu habis!"}
              </small>
            </div>
          </div>
          <div className="card-body">
            <div className="mb-2 mt-2">
              <strong>Bank Mandiri</strong>
            </div>
            <div className="mb-4">
              <small>
                Untuk menyelesaikan pembayaran pesanan Anda, silakan transfer ke
                nomor rekening berikut:
              </small>
              <div className="d-flex justify-content-between align-items-center">
                <div className="kode-rekening">
                  {vaNumber}
                </div>
                <button className="btn btn-link" onClick={copyToClipboard}>
                  Salin
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p>Detail Produk : </p>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div>{item.Product.name}</div>
                    <div>
                      Harga: Rp. {item.Product.price.toLocaleString("id-ID")}
                    </div>
                    <div>Jumlah: {item.quantity}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              Setelah pembayaran berhasil, harap segera kirimkan bukti
              pembayaran ke admin agar pesanan Anda dapat segera diproses.
              Terima kasih atas kepercayaan Anda! 😊
            </div>
            <a href="/konfirmasipesanan" className="btn btn-primary mt-4">
              Selanjutnya
            </a>
          </div>
        </>
      )}
    </div>
  );
}
