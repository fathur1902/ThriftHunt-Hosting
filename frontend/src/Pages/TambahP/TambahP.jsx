// src/App.jsx
import React, { useState } from "react";
import axios from "axios"; // Tambahkan axios
import "bootstrap/dist/css/bootstrap.min.css";
import "./TambahP.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBox, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function TambahP() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const changePage = (pageUrl) => {
    window.location.href = pageUrl;
  };

  const toggleSize = (size) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProduct = async () => {
    if (
      !name ||
      !description ||
      !price ||
      sizes.length === 0 ||
      !image ||
      !category
    ) {
      alert("Mohon lengkapi semua data produk!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("sizes", sizes.join(","));
    formData.append("image", image);
    formData.append("category", category);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Produk berhasil ditambahkan!");
      console.log(response.data);
      changePage("/dashboard");
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
      alert("Terjadi kesalahan saat menambahkan produk.");
    }
  };

  return (
    <div className="bg-light d-flex">
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
          className="btn btn-light mb-3"
          onClick={() => changePage("dashboard")}
        >
          <FontAwesomeIcon icon={faEdit} className="me-2" />
          Edit Produk
        </button>
        <button
          className="btn btn-gradient mb-3"
          onClick={() => changePage("/dashboardp")}
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

      {/* Content Area */}
      <div className="flex-fill p-4">
        <h2>Tambahkan Produk Baru</h2>

        <div className="row">
          <div className="col-md-6">
            <div className="card-custom">
              <div className="mb-3">
                <label className="form-label" htmlFor="productName">
                  Nama Produk
                </label>
                <input
                  className="form-control"
                  id="productName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="productDescription">
                  Deskripsi
                </label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="price">
                  Harga
                </label>
                <input
                  className="form-control"
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Kategori</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  <option value="AtasanPria">Atasan Pria</option>
                  <option value="BawahanPria">Bawahan Pria</option>
                  <option value="AtasanWanita">Atasan Wanita</option>
                  <option value="BawahanWanita">Bawahan Wanita</option>
                  <option value="Aksesoris">Aksesoris</option>
                  <option value="FlashSale">Flash Sale</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Ukuran</label>
                <div className="d-flex gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      className={`btn size-btn ${
                        sizes.includes(size)
                          ? "btn-primary"
                          : "btn-outline-light"
                      }`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-custom">
              <div className="mb-3">
                <label className="form-label">Gambar Produk</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            {previewImage && (
              <div className="mt-3">
                <h5>Pratinjau Gambar:</h5>
                <img
                  src={previewImage}
                  alt="Pratinjau"
                  style={{
                    width: "70%",
                    maxHeight: "350px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <button className="btn btn-custom mt-3" onClick={handleSaveProduct}>
          Simpan Produk
        </button>
      </div>
    </div>
  );
}
