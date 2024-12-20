import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./SignUp.css";

export function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
    role: "user",
  });

  // Fungsi untuk menangani perubahan pada form
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // Fungsi validasi form
  const validateForm = () => {
    const { name, email, password, confirmPassword, agree } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return {
        isValid: false,
        message: "Mohon isi semua kolom yang diperlukan.",
      };
    }
    if (password !== confirmPassword) {
      return { isValid: false, message: "Konfirmasi sandi tidak sesuai." };
    }
    if (!agree) {
      return {
        isValid: false,
        message:
          "Anda harus menyetujui Ketentuan Layanan dan Kebijakan Privasi.",
      };
    }

    return { isValid: true }; // Validasi berhasil
  };

  // Fungsi untuk mengirim data ke server
  const submitForm = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/register",
        formData
      );

      Swal.fire({
        title: "Good job!",
        text: "Anda berhasil daftar!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login"; // Redirect ke halaman login
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Pendaftaran gagal",
        text:
          error.response?.data?.message || "Terjadi kesalahan saat pendaftaran",
      });
    }
  };

  // Fungsi untuk memvalidasi dan mengirim data
  const handleSubmit = () => {
    const validation = validateForm();

    if (!validation.isValid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: validation.message,
      });
      return;
    }

    submitForm(); // Panggil fungsi submitForm jika validasi berhasil
  };

  return (
    <div className="container-signup">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="row border rounded-5 p-3 bg-white shadow box-area w-100 mb-5"
          style={{ maxWidth: "900px" }}
        >
          {/* Left Box */}
          <div className="col-md-6 d-flex justify-content-center align-items-center flex-column left-box mb-4 mb-md-0">
            <div className="featured-image">
              <img
                src="/assets/images/Signup.png"
                className="img-fluid"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
                alt="Signup"
              />
            </div>
          </div>

          {/* Right Box */}
          <div className="col-md-6 right-box d-flex flex-column justify-content-center">
            <div className="row align-items-center">
              <div className="header-text mb-3">
                <h2 className="text-black">Daftar</h2>
              </div>
              <small className="text-black">Nama Lengkap</small>
              <div className="input-group mb-3">
                <input
                  id="name"
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Nama lengkap"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <small className="text-black">Email</small>
              <div className="input-group mb-3">
                <input
                  id="email"
                  type="email"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Alamat email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <small className="text-black">Sandi</small>
              <div className="input-group mb-3">
                <input
                  id="password"
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Buat sandi"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <small className="text-black">Konfirmasi Sandi</small>
              <div className="input-group mb-3">
                <input
                  id="confirmPassword"
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Konfirmasi Sandi"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <small className="text-black">Role</small>
              <div className="input-group mb-3">
                <select
                  id="role"
                  className="form-control form-control-lg bg-light fs-6"
                  value={formData.role || "user"} // Default 'user'
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="input-group mb-3 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="agree"
                    className="form-check-label text-secondary"
                  >
                    <small>
                      Saya telah membaca Ketentuan Layanan dan Kebijakan Privasi
                    </small>
                  </label>
                </div>
              </div>
              <div className="input-group mb-3">
                <button
                  onClick={handleSubmit}
                  className="btn btn-lg btn-primary w-100 fs-6"
                >
                  Daftar
                </button>
              </div>
              <div className="row">
                <small className="text-black text-center">
                  Sudah punya akun? <a href="/Login">Masuk aja</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
