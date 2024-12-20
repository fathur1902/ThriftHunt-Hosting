import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios"; // Import axios untuk komunikasi dengan backend
import "./Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Fungsi untuk validasi login dan kirim data ke backend
  const validateLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Mohon isi email dan sandi Anda.",
      });
    } else {
      try {
        // Kirim data login ke backend
        const response = await axios.post(
          import.meta.env.VITE_API_URL + '/login',
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          // Menangani response jika login berhasil
          Swal.fire({
            title: "Good job!",
            text: "Anda berhasil login!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirect berdasarkan role pengguna
              const redirectUrl = response.data.redirectUrl;
              window.location.href = redirectUrl; // Redirect ke halaman sesuai role
            }
          });
        }
      } catch (error) {
        console.log(error);
        // Tangani error jika login gagal
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: error.response?.data?.message || "Terjadi kesalahan saat login",
        });
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div
            className="row border rounded-5 p-3 bg-white shadow box-area w-100"
            style={{ maxWidth: "900px" }}
          >
            {/* Left Box */}
            <div className="col-md-6 d-flex justify-content-center align-items-center flex-column left-box mb-3 mb-md-0">
              <div
                className="featured-image mb-3"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/assets/images/Login.png"
                  className="img-fluid"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  alt="Login"
                />
              </div>
            </div>
  
            {/* Right Box */}
            <div className="col-md-6 right-box">
              <div className="row align-items-center">
                <div className="header-text mb-3">
                  <h2 className="text-black">Masuk</h2>
                </div>
                <small className="text-black">Masukkan email</small>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Alamat email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
  
                <small className="text-black">Masukkan sandi</small>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
  
                <div className="input-group mb-3 d-flex justify-content-between">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="formCheck"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label
                      htmlFor="formCheck"
                      className="form-check-label text-secondary"
                    >
                      <small className="text-black">Ingat saya</small>
                    </label>
                  </div>
                  <div className="forgot">
                    <small>
                      <a href="#">Lupa sandi?</a>
                    </small>
                  </div>
                </div>
  
                <div className="input-group mb-3">
                  <button
                    className="btn btn-lg btn-primary w-100 fs-6"
                    onClick={validateLogin}
                  >
                    Masuk
                  </button>
                </div>
                <div className="row">
                  <small className="text-black">
                    Belum memiliki akun? <a href="/SignUp">Buat akun</a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  
