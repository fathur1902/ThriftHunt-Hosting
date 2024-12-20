import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./UbahAlamat.css";
import { useParams } from "react-router-dom";

export const UbahAlamat = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    province: "",
    country: "",
    phone: "",
  });

  let { userId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchAddress = async () => {
    try {
      console.log("Fetching address for userId:", userId);
      const response = await axios.get(
        `http://localhost:3000/api/users/address/${userId}`
      );
      console.log("Response data:", response.data);
      setFormData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching address:", err.response || err.message);
      setError("Gagal memuat data alamat.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");

    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/address",
        {
          userId,
          ...formData,
        }
      );
      Swal.fire("Update alamat berhasil!!");
      setSuccessMessage(response.data.message );
    } catch (err) {
      Swal.fire("Gagal update alamat!");
      setError("Gagal update alamat.");
    }
  };

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (userId) {
      fetchAddress();
    } else {
      setError("User ID tidak ditemukan.");
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="ubah-alamat form-container w-100">
        <div>
          <a href="/profile" class="text-decoration-none text-white">
            <i class="bi bi-arrow-left"> Kembali</i>
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <h5 className="mt-4">Alamat</h5>

          <div className="col mb-3">
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Alamat"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Nomor Telepon"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Kota"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="postalCode"
                placeholder="Kode Pos"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <select
                id="province"
                className="form-select"
                value={formData.province}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Pilih Provinsi
                </option>
                <option value="Nanggroe Aceh Darussalam">
                  Nanggroe Aceh Darussalam
                </option>
                <option value="Sumatera Utara">Sumatera Utara</option>
                <option value="Sumatera Barat">Sumatera Barat</option>
                <option value="Sumatera Selatan">Sumatera Selatan</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Timur">Jawa Timur</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="country"
              placeholder="Negara"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5 py-2">
              Perbarui Alamat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
