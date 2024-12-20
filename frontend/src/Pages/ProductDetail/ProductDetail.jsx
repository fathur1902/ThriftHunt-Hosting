import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import "./ProductDetail.css";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch data produk utama berdasarkan ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  // Fetch data produk serupa (mengambil data dari semua produk lalu menyaringnya)
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        if (product) {
          const related = response.data.filter(
            (p) => p.category === product.category && p.id !== product.id
          );
          setRelatedProducts(related);
        }
      })
      .catch((error) => {
        console.error("Error fetching related products:", error);
      });
  }, [product]);

  if (!product) {
    return <div className="text-center my-5">Produk tidak ditemukan</div>;
  }
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
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
      // console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error?.response?.data || error.message
      );
    }
  };

  return (
    <div className="container py-5 p-5">
      {/* Tombol Kembali */}
      <div className="p-4 mt-3">
        <a href="/product" className="text-decoration-none text-white">
          <i className="bi bi-arrow-left"></i> Kembali
        </a>
      </div>

      <div className="row g-4">
        {/* Thumbnail Images */}
        <div className="col-lg-3 col-md-4 d-none d-md-block">
          <div className="d-flex flex-column gap-2 thumbnail-scroll">
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={`Thumbnail of ${product.name}`}
              className="img-fluid rounded"
            />
          </div>
        </div>

        {/* Main Product Image */}
        <div className="col-lg-6 col-md-8">
          <img
            src={`http://localhost:3000/uploads/${product.image}`}
            alt={`Main view of ${product.name}`}
            className="product-image img-fluid rounded"
          />
        </div>

        {/* Product Details */}
        <div className="col-lg-3 col-md-12">
          <div className="product-details">
            <h1 className="fs-4">{product.name}</h1>
            <p className="text-white fw-bold fs-5">
              Rp. {product.price.toLocaleString()}
            </p>
            <p className="text-white">{product.description}</p>
            <ul className="list-unstyled">
              <li>
                <strong>Kategori:</strong> {product.category}
              </li>
              <li>
                <strong>Ukuran:</strong> {product.size}
              </li>
            </ul>
            <Link to={"/checkout"} className="btn btn-primary w-100 mb-2">
              Beli Sekarang
            </Link>
            <Link
              to={"/keranjang"}
              className="btn btn-outline-primary text-white w-100"
              onClick={() => handleAddToCart(product)}
            >
              Masukan Keranjang
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="reviews-section mt-5">
        <h2 className="fs-5 mb-4">Ulasan Pembeli</h2>
        <div className="review-list mb-4">
          <div className="review-item mb-3 p-3 rounded">
            <div className="d-flex justify-content-between">
              <h5 className="mb-0">Adi Wibowo</h5>
              <div className="text-warning">★★★★★</div>
            </div>
            <p className="mb-1">
              Produk sangat keren! Warna sesuai dengan foto dan kualitasnya
              sangat bagus.
            </p>
            <small className="text-muted">5 menit yang lalu</small>
          </div>
          <div className="review-item mb-3 p-3 rounded">
            <div className="d-flex justify-content-between">
              <h5 className="mb-0">Novi Lestari</h5>
              <div className="text-warning">★★★★☆</div>
            </div>
            <p className="mb-1">Barang oke, hanya saja pengiriman agak lama.</p>
            <small className="text-muted">2 hari yang lalu</small>
          </div>
          <div className="review-item mb-3 p-3 rounded">
            <div className="d-flex justify-content-between">
              <h5 className="mb-0">Rico Mardian</h5>
              <div className="text-warning">★★★★★</div>
            </div>
            <p className="mb-1">
              Luar biasa, pengemasan sangat rapi dan barang sesuai deskripsi!
            </p>
            <small className="text-muted">3 hari yang lalu</small>
          </div>
        </div>
        <div className="review-form">
          <textarea
            className="form-control mb-2"
            placeholder="Tulis ulasan Anda..."
          ></textarea>
          <div className="d-flex justify-content-between">
            <div className="rating-stars">
              <span className="text-warning">★★★★★</span>
            </div>
            <button className="btn btn-primary">Kirim Ulasan</button>
          </div>
        </div>
      </div> */}

      {/* Related Products Section */}
      <div className="related-products mt-5">
        <h2 className="fs-5 mb-4">Pilihan Lainnya</h2>
        <div className="row g-3">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="col-6 col-md-4 col-lg-3">
                <Link
                  to={`/product/${relatedProduct.id}`}
                  className="product-item text-center text-decoration-none"
                >
                  <img
                    src={`http://localhost:3000/uploads/${relatedProduct.image}`}
                    alt={relatedProduct.name}
                    className="img-fluid rounded mb-2"
                  />
                  <p className="product-name text-white mb-1">
                    {relatedProduct.name}
                  </p>
                  <p className="product-price text-white fw-bold">
                    Rp. {relatedProduct.price.toLocaleString()}
                  </p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">
              Tidak ada produk serupa yang tersedia.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
