import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Keranjang.css";

export function Keranjang() {
  const [products, setProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Ambil data produk dari backend
  useEffect(() => {
    const fetchCartProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Data tidak valid, bukan array", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching cart products:", error);
        setProducts([]);
      }
    };

    fetchCartProducts();
  }, []);

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:3000/api/cart/${id}`,
        { quantity: newQuantity }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, quantity: newQuantity } : product
        )
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemoveProduct = async (id) => {
    const token = localStorage.getItem("token"); 
    try {
      await axios.delete(`http://localhost:3000/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
  

  const handleSelectAllChange = () => {
    setSelectAll((prevState) => !prevState);
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({ ...product, selected: !selectAll }))
    );
  };

  const handleProductSelect = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, cartItem) => {
      if (cartItem.selected) {
        return total + parseFloat(cartItem.Product.price) * cartItem.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <div className="badan p-5">
      <h2 className="tulisan p-5">ThriftHunt | Keranjang</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Produk</th>
              <th scope="col">Harga</th>
              <th scope="col">Kuantitas</th>
              <th scope="col">Total</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((cartItem) => (
              <tr key={cartItem.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={cartItem.selected || false}
                    onChange={() => handleProductSelect(cartItem.id)}
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={`http://localhost:3000/uploads/${cartItem.Product.image}`}
                      alt={cartItem.Product.name}
                      width="50"
                      height="50"
                      className="me-2"
                    />
                    <div>
                      <div>{cartItem.Product.name}</div>
                      <div className="text-muted">
                        Ukuran: {cartItem.Product.sizes}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  Rp. {parseFloat(cartItem.Product.price).toLocaleString()}
                </td>
                <td>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        handleQuantityChange(cartItem.id, cartItem.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={cartItem.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          cartItem.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(cartItem.id, cartItem.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  Rp.{" "}
                  {(
                    parseFloat(cartItem.Product.price) * cartItem.quantity
                  ).toLocaleString()}
                </td>
                <td>
                  <i
                    className="fas fa-times"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleRemoveProduct(cartItem.id)}
                  ></i>
                  <button
                    onClick={() => handleRemoveProduct(cartItem.id)}
                    style={{
                      cursor: "pointer",
                      color: "black",
                      background: "none",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                      border: "2px solid black",
                    }}
                  >
                    {" "}
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="3">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  style={{ marginRight: "10px" }}
                />{" "}
                Pilih Semua ({products.length} Produk)
              </td>
              <td>Total Harga</td>
              <td>Rp. {calculateTotalPrice().toLocaleString()}</td>
              <td>
                <Link
                  className="checkout-btn text-decoration-none"
                  to={"/checkout"}
                >
                  Checkout
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Keranjang;
