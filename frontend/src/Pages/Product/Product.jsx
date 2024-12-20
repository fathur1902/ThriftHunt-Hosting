import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Product.css";

export function Product() {
  const [filters, setFilters] = useState({
    categories: [],
    prices: [],
    sizes: [],
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");

  // Fetch data produk dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data); // Awalnya tampilkan semua produk
      } catch (err) {
        setError("Gagal memuat data produk. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle checkbox filter
  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const isAlreadySelected = prev[type].includes(value);
      const updatedValues = isAlreadySelected
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];

      return {
        ...prev,
        [type]: updatedValues,
      };
    });
  };

  // Menangani penambahan ke keranjang
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3000/api/cart",
        {
          productId: product.id,
          quantity: 1,
          selected: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Produk berhasil ditambahkan ke keranjang!");
    } catch (error) {
      console.error("Gagal menambahkan produk ke keranjang:", error.message);
      alert("Gagal menambahkan produk ke keranjang. Silakan coba lagi.");
    }
  };

  // Filter produk berdasarkan kategori, harga, ukuran, dan pencarian
  useEffect(() => {
    const { categories, prices, sizes } = filters;

    const filtered = products.filter((product) => {
      const inCategory =
        categories.length === 0 || categories.includes(product.category);

      const inPrice =
        prices.length === 0 ||
        prices.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.price >= min && product.price <= max;
        });

      const inSize =
        sizes.length === 0 ||
        sizes.some((size) => product.sizes.includes(size));

      const matchesSearchTerm =
        !query || product.name.toLowerCase().includes(query.toLowerCase());

      return inCategory && inPrice && inSize && matchesSearchTerm;
    });

    setFilteredProducts(filtered);
  }, [filters, products, query]);

  useEffect(() => {
    const queryCategory = new URLSearchParams(search).get("category");
    if (queryCategory) {
      const categories = queryCategory.split(",");
      setFilters((prev) => ({
        ...prev,
        categories,
      }));
    }
  }, [search]);

  return (
    <div className="container mt-5 p-3">
      <div className="row">
        {/* Sidebar */}
        <section className="col-12 col-md-3 mb-4">
          <div className="list-group-container mt-4">
            <h5 className="list-group">| Kategori</h5>
            {[
              "AtasanPria",
              "BawahanPria",
              "AtasanWanita",
              "BawahanWanita",
              "Aksesoris",
            ].map((category) => (
              <label
                key={category}
                className={`list-group-item list-group-item-action ${
                  filters.categories.includes(category)
                    ? "selected-category"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="me-2"
                  value={category}
                  onChange={() => handleCheckboxChange("categories", category)}
                />
                {category}
              </label>
            ))}
            <div className="list-group-item list-group-item-action">
              <Link to="/flashsale" className="text-decoration-none text-white">
                Flash Sale
              </Link>
            </div>
          </div>
          <div className="list-group-container mt-3">
            <h5 className="list-group">| Harga</h5>
            {[
              "20000-50000",
              "50000-100000",
              "100000-150000",
              "150000-200000",
            ].map((priceRange) => (
              <label
                key={priceRange}
                className={`list-group-item list-group-item-action ${
                  filters.prices.includes(priceRange) ? "selected-category" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="me-2"
                  value={priceRange}
                  onChange={() => handleCheckboxChange("prices", priceRange)}
                />
                {`Rp. ${priceRange.replace("-", " - Rp. ")}`}
              </label>
            ))}
          </div>
          <div className="list-group-container mt-3">
            <h5 className="list-group">| Ukuran</h5>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label
                key={size}
                className={`list-group-item list-group-item-action ${
                  filters.sizes.includes(size) ? "selected-category" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="me-2"
                  value={size}
                  onChange={() => handleCheckboxChange("sizes", size)}
                />
                {size}
              </label>
            ))}
          </div>
        </section>

        {/* Produk */}
        <section className="col-12 col-md-9 mt-3 mb-4">
          {loading ? (
            <p className="text-center">Memuat produk...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : filteredProducts.length > 0 ? (
            <div className="row gy-4">
              <h1 className="tittle mb-2 text-start">Koleksi Produk Kami</h1>
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-6 col-md-4 col-lg-3">
                  <div className="card product-card">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={`http://localhost:3000/uploads/${product.image}`}
                        className="card-img-top"
                        alt={product.name}
                      />
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-auto">{product.name}</h5>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="price">
                          {product.price.toLocaleString()}
                        </span>
                        <button
                          className="btn-cart"
                          onClick={() => handleAddToCart(product)}
                        >
                          <i className="bi bi-plus-circle fs-5"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">
              Tidak ada produk yang sesuai dengan filter.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
