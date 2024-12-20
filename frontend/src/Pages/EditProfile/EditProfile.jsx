import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    newPassword: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Konfirmasi kata sandi tidak cocok!");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      if (formData.newPassword)
        payload.append("password", formData.newPassword);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/users/profile",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Gagal mengupdate profil");
    }
  };

  return (
    <div className="container p-5 mt-4">
      <div>
        <a href="/profile" className="text-decoration-none text-white">
          <i className="bi bi-arrow-left"></i> Kembali
        </a>
      </div>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2 className="text-center mb-4">Edit Profil</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Masukkan Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                Ganti Kata Sandi
              </label>
              <input
                type="password"
                className="form-control mb-2"
                id="newPassword"
                placeholder="Kata Sandi Baru"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Konfirmasi Kata Sandi Baru"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
