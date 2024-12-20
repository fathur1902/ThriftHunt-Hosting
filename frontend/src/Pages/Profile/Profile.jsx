import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

export function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token tidak ditemukan. Silakan login.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.profile);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data pengguna.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  const handleImageUpload = async () => {
    const token = localStorage.getItem("token");
    if (newProfileImage && token) {
      const formData = new FormData();
      formData.append("profileImage", newProfileImage);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/users/profile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUserData({
          ...userData,
          profileImage: response.data.profileImage, 
        });
        setNewProfileImage(null);
        setPreviewImage(null); 
      } catch (err) {
        console.error(err);
        setError("Gagal mengubah gambar profil.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <section className="profile-section">
        <div className="container">
          <h2 className="section-title-profile">Akun Saya</h2>
          <div className="profile-content">
            <div className="profile-info">
              <div
                className="profile-img-container"
                style={{ position: "relative" }}
              >
                <img
                  src={
                    previewImage
                      ? previewImage 
                      : userData.profileImage
                      ? "http://localhost:3000" + userData.profileImage
                      : "/assets/images/profiledefault.jpg"
                  }
                  alt="Profile Picture"
                  className="profile-img"
                  onClick={() =>
                    document.getElementById("profile-image-input").click()
                  }
                />
                <i
                  className="bi bi-camera edit-icon"
                  onClick={() =>
                    document.getElementById("profile-image-input").click()
                  }
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "8px",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    padding: "8px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    cursor: "pointer",
                    fontSize: "17px",
                    border: "1px solid #ccc",
                  }}
                ></i>
              </div>
              <input
                type="file"
                id="profile-image-input"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
              {newProfileImage && (
                <button
                  onClick={handleImageUpload}
                  className="btn-profile save-btn"
                >
                  Simpan Gambar
                </button>
              )}
              <h3 className="profile-name">{userData?.name}</h3>
              <a
                href="/EditProfile"
                className="btn-profile edit-btn text-center"
              >
                Edit Profil
              </a>
              <a
                href="/selesai"
                className="btn-profile edit-btn text-center"
              >
               Riwayat Pesanan
              </a>
              <a href="/login" className="btn-profile logout-btn">
                Keluar
              </a>
            </div>

            <div className="address-section">
              <h3>Alamat</h3>
              <div className="address-box">
                <h4>
                  Alamat Utama{" "}
                  <a href={`/ubahalamat/${userData.id}`} className="edit-link">
                    <i className="bi bi-pencil-fill"></i> Edit
                  </a>
                </h4>
                {userData?.address ? (
                  <p>
                    {userData.phone}
                    <br />
                    {userData.address}, {userData.city}, {userData.province},{" "}
                    {userData.postalCode}, {userData.country}
                  </p>
                ) : (
                  <p>Alamat belum diatur.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
