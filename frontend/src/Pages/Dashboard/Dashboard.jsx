import React, { useState, useEffect } from "react";
import axios from "axios"; // Tambahkan axios untuk permintaan HTTP
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faBox,
  faArrowLeft,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal memuat data produk:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fungsi untuk menghapus produk
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
    }
  };

  const changePage = (pageUrl) => {
    window.location.href = pageUrl;
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

      {/* Main Content */}
      <div className="flex-fill p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-3 fw-semibold">Produk</h2>
          <div className="d-flex align-items-center">
            <input
              className="form-control me-3"
              type="text"
              placeholder="Mencari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "200px" }}
            />
            <FontAwesomeIcon icon={faSearch} className="text-muted" />
            <div className="d-flex align-items-center ms-4">
              <div
                className="bg-secondary rounded-circle me-2"
                style={{ width: "40px", height: "40px" }}
              ></div>
              <span>Admin Thrift Hunt</span>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary mb-4"
          onClick={() => changePage("/tambahp")}
        >
          Tambah Produk
        </button>

        {/* Product Table */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Produk</th>
                <th>Harga</th>
                <th>Kuantitas</th>
                <th>Kategori</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={`http://localhost:3000/uploads/${product.image}`}
                          alt={product.name}
                          className="rounded-circle me-3"
                          width="50"
                          height="50"
                        />
                        <div>
                          <div>{product.name}</div>
                          <small className="text-muted">
                            Ukuran: {product.sizes}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>Rp. {product.price.toLocaleString()}</td>
                    <td>
                      <input
                        className="form-control text-center rounded-pill"
                        type="number"
                        defaultValue={product.quantity || 1}
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>{product.category}</td>
                    <td>
                      <Link
                        className="btn btn-warning btn-sm me-2"
                        to={`/editp/${product.id}`}
                      >
                        <FontAwesomeIcon icon={faEdit} className="me-1" />
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Apakah Anda yakin ingin menghapus produk ini?"
                            )
                          ) {
                            handleDelete(product.id);
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-1" />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
