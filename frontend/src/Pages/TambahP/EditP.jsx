import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TambahP.css"; // Menggunakan CSS yang sama dengan TambahP
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBox, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function EditP() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        const product = response.data;

        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setSizes(product.sizes || []);
        setExistingImage(product.image);
        setCategory(product.category);
      } catch (error) {
        console.error("Gagal memuat data produk:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleSize = (size) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSave = async () => {
    if (!name || !description || !price || sizes.length === 0 || !category) {
      alert("Mohon lengkapi semua data produk!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("sizes", sizes.join(","));
    if (image) {
      formData.append("image", image);
    }
    formData.append("category", category);

    try {
      await axios.patch(`http://localhost:3000/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Produk berhasil diperbarui!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Gagal menyimpan perubahan produk:", error);
      alert("Gagal menyimpan perubahan. Silakan coba lagi.");
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
          onClick={() => navigate("/dashboard")}
        >
          <FontAwesomeIcon icon={faEdit} className="me-2" />
          Dashboard
        </button>
        <button
          className="btn btn-gradient mb-3"
          onClick={() => navigate("/dashboardp")}
        >
          <FontAwesomeIcon icon={faBox} className="me-2" />
          Lihat Pesanan
        </button>
        <button className="btn btn-gradient" onClick={() => navigate("/login")}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-fill p-4">
        <h2>Edit Produk</h2>

        <div className="row">
          <div className="col-md-6">
            <div className="card-custom">
              <div className="mb-3">
                <label className="form-label">Nama Produk</label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Deskripsi</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Harga</label>
                <input
                  className="form-control"
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
                {existingImage && !image && (
                  <div className="mt-3 text-center">
                    <p>Gambar saat ini:</p>
                    <img
                      src={`http://localhost:3000/uploads/${existingImage}`}
                      alt="Gambar Produk"
                      style={{
                        width: "70%",
                        maxHeight: "340px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-custom mt-3" onClick={handleSave}>
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
