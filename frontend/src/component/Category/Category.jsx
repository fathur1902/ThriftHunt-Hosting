import { useParams } from "react-router-dom";
import products from "../../data/product"; // Data produk Anda

export function Category() {
  const { categoryName } = useParams(); // Ambil parameter kategori dari URL
  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase().replace(" ", "-") === categoryName
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white mt-5 mb-5">
        Kategori: {categoryName.replace("-", " ")}
      </h2>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card product-card">
                <img
                  src={product.img}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <span className="price">
                    Rp. {product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white mt-5 mb-5">Produk tidak ditemukan di kategori ini.</p>
        )}
      </div>
    </div>
  );
}
