import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Waktu akhir flash sale (ubah sesuai kebutuhan)
    const flashSaleEndTime = new Date("2025-12-20T00:00:00").getTime();

    // Fungsi untuk update waktu
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = flashSaleEndTime - now;

      if (distance <= 0) {
        // Jika waktu sudah habis, stop timer
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    // Update waktu setiap detik
    const interval = setInterval(updateCountdown, 1000);

    // Jalankan sekali saat pertama kali
    updateCountdown();

    // Bersihkan interval jika komponen dibersihkan
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-container">
      <section className="hero text-center text-white d-flex align-items-center justify-content-center">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 px-4">
              <h1 className="display-4 judul-home">
                Gaya Unik, Harga Asik. Tampil Keren Tanpa Beban di Kantong!
              </h1>
              <p className="lead mt-3 mb-4">
                Jelajahi gaya baru dan temukan pilihan fashion yang membuatmu
                tampil menarik dan percaya diri, semua tanpa menguras kantong!
                Temukan harta karun fashion yang pas untuk setiap momen dalam
                hidupmu.
              </p>
              <Link to="/product" className="btn-primary">
                Jelajahi
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="flash-sale-section mt-5">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <h2 className="section-title mt-5">Flash Sale</h2>
          <div
            className="countdown-timer"
            // style={{ marginRight: "auto", marginLeft: "20px" }}
          >
            <span className="timer-box">
              {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
            </span>
            <span className="timer-box">
              {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
            </span>
            <span className="timer-box">
              {timeLeft.minutes < 10
                ? `0${timeLeft.minutes}`
                : timeLeft.minutes}
            </span>
            <span className="timer-box">
              {timeLeft.seconds < 10
                ? `0${timeLeft.seconds}`
                : timeLeft.seconds}
            </span>
          </div>
          <Link to="/flashsale" className="btn-custom mb-3">
            Lihat Semua
          </Link>
        </div>

        <div className="row justify-content-center">
          <div className="col-5 col-md-2">
            <div
              className="card text-white border-0"
              style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <Link to="/product/54">
                <img
                  src="/assets/images/celana1.jpg"
                  alt="Jeans Levi's 501 Vintage"
                  className="card-img-top"
                />
              </Link>
              <div className="card-body text-center">
                <span className="badge-top">Tersisa 1</span>
                <h5 className="card-title mt-3">Jeans Levi's 501 Vintage</h5>
                <p className="card-text">
                  <del>Rp 599.000</del> <strong>Rp 250.000</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="col-5 col-md-2">
            <div
              className="card text-white border-0"
              style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <Link to="/product/22">
                <img
                  src="/assets/images/Flanel Ralph Lauren2.jpg"
                  alt="Flanel Ralph Lauren"
                  className="card-img-top"
                />
              </Link>
              <div className="card-body text-center">
                <span className="badge-top">Tersisa 1</span>
                <h5 className="card-title mt-3">Flanel Ralph Lauren</h5>
                <p className="card-text">
                  <del>Rp 599.000</del> <strong>Rp 120.000</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="col-5 col-md-2">
            <div
              className="card text-white border-0"
              style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <Link to="/product/55">
                <img
                  src="/assets/images/Denim Wrangler 80s.jpg"
                  alt="Denim Wrangler 80s"
                  className="card-img-top"
                />
              </Link>
              <div className="card-body text-center">
                <span className="badge-top">Tersisa 1</span>
                <h5 className="card-title mt-3">Denim Wrangler 80s</h5>
                <p className="card-text">
                  <del>Rp 599.000</del> <strong>Rp 200.000</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-5 col-md-2">
            <div
              className="card text-white border-0"
              style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <Link to="/product/56">
                <img
                  src="/assets/images/Tas Coach Signature.jpg"
                  alt="Tas Coach Signature"
                  className="card-img-top"
                />
              </Link>
              <div className="card-body text-center">
                <span className="badge-top">Tersisa 1</span>
                <h5 className="card-title mt-3">Tas Coach Signature</h5>
                <p className="card-text">
                  <del>Rp 599.000</del> <strong>Rp 350.000</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="kategori-section py-5">
        <div className="container text-center">
          <h2 className="section-title">Lihat Berbagai Kategori Kami</h2>
          <p className="section-description mb-5">
            Jelajahi koleksi kami yang beragam! Temukan pilihan pakaian yang
            cocok untuk gaya dan kebutuhanmu.
          </p>
          <div className="kategori-kami row justify-content-center gy-4">
            <div className="col-6 col-md-3">
              <Link
                to="/product?category=AtasanPria,BawahanPria"
                className="text-decoration-none"
              >
                <div className="kategori-card">
                  <img
                    src="/assets/images/pakaian pria.jpg"
                    alt="Pakaian Pria"
                    className="kategori-image"
                  />
                  <div className="kategori-overlay">
                    <p>Pakaian Pria</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-3 d-flex flex-column kategori-dual mt-3">
              <Link
                to="/product?category=AtasanWanita,BawahanWanita"
                className="text-decoration-none kategori-link"
              >
                <div className="kategori-card mb-2 mt-4">
                  <img
                    src="/assets/images/pakaian wanita.jpg"
                    alt="Pakaian Wanita"
                    className="kategori-image"
                  />
                  <div className="kategori-overlay">
                    <p>Pakaian Wanita</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/product?category=Aksesoris"
                className="text-decoration-none kategori-link"
              >
                <div className="kategori-card mt-5">
                  <img
                    src="/assets/images/aksesoris.jpg"
                    alt="Aksesoris"
                    className="kategori-image"
                  />
                  <div className="kategori-overlay">
                    <p>Aksesoris</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/flashsale" className="text-decoration-none">
                <div className="kategori-card">
                  <img
                    src="/assets/images/sepatu.jpg"
                    alt="Flash Sale"
                    className="kategori-image"
                  />
                  <div className="kategori-overlay">
                    <p>Flash Sale</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="produk-section py-5">
        <div className="container text-center">
          <h2 className="section-title-produk">Rekomendasi Produk Terbaik</h2>
          <p className="section-description">
            Temukan fashion pakaian yang paling dicari! Setiap item menawarkan
            gaya dan kualitas unggul dengan harga terjangkau.
          </p>
          <a href="/product" className="btn-lihat-semua">
            Lihat Semua
          </a>

          <div className="container mt-5">
            <div className="row">
              <div className="col-12">
                <div className="d-flex overflow-auto produk-scroll">
                  <div className="produk-card">
                    <Link to="/product/61">
                      <img
                        src="/assets/images/Nike Air Max Limited.jpg"
                        alt="Nike Air Max Limited"
                        className="produk-image"
                      />
                    </Link>
                  </div>
                  <div className="produk-card">
                    <Link to="/product/63">
                      <img
                        src="/assets/images/Polo Lacoste Original.jpg"
                        alt="Polo Lacoste Original"
                        className="produk-image"
                      />
                    </Link>
                  </div>
                  <div className="produk-card">
                    <Link to="/product/57">
                      <img
                        src="/assets/images/Vans Checkerboard Classic.jpg"
                        alt="Vans Checkerboard Classic"
                        className="produk-image"
                      />
                    </Link>
                  </div>
                  <div className="produk-card">
                    <Link to="/product/59">
                      <img
                        src="/assets/images/Blazer Gucci Vintage.jpg"
                        alt="Blazer Gucci Vintage"
                        className="produk-image"
                      />
                    </Link>
                  </div>
                  <div className="produk-card me-3">
                    <Link to="/product/64">
                      <img
                        src="/assets/images/Jaket Kulit Harley Davidson.jpg"
                        alt="Jaket Kulit Harley Davidson"
                        className="produk-image"
                      />
                    </Link>
                  </div>
                  <div className="produk-card me-3">
                    <Link to="/product/55">
                      <img
                        src="/assets/images/Denim Wrangler 80s.jpg"
                        alt="Denim Wrangler 80s"
                        className="produk-image"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="outfit-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="outfit-card-container d-flex flex-column flex-md-row">
                <div className="outfit-card flex-grow-1 mb-3 mb-md-0">
                  <img
                    src="assets/images/idol.jpg"
                    className="img-fluid rounded"
                    alt="Outfit Image"
                  />
                </div>
                <div className="small-cards d-flex flex-row flex-md-column justify-content-between ms-0 ms-md-3 mt-3 mt-md-0">
                  <div className="p-1">
                    <img
                      src="assets/images/baret abu.jpg"
                      className="img-fluid rounded"
                      alt="Item 1"
                    />
                  </div>
                  <div className="p-1">
                    <img
                      src="assets/images/kemeja putih.jpg"
                      className="img-fluid rounded"
                      alt="Item 2"
                    />
                  </div>
                  <div className="p-1">
                    <img
                      src="assets/images/rok kotak.jpg"
                      className="img-fluid rounded"
                      alt="Item 3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start">
              <h2 className="section-title-outfit text-center text-md-start">
                Outfit Hits seperti Idol Favorit
              </h2>
              <p className="section-description-outfit text-center text-md-start">
                Inspirasi gaya dari idol favoritmu! Pilihan outfit kekinian ala
                selebriti, mulai dari streetwear hingga casual chic, cocok untuk
                tampil stylish tanpa harus mahal!
              </p>
              <div className="outfit-buttons d-flex flex-wrap justify-content-center justify-content-md-start mt-3 w-100">
                <Link
                  to="/product/40"
                  className="text-decoration-none mb-2 me-2"
                >
                  <button className="btn btn-outline-light">Atasan</button>
                </Link>
                <Link
                  to="/product/65"
                  className="text-decoration-none mb-2 me-2"
                >
                  <button className="btn btn-outline-light">Bawahan</button>
                </Link>
                <Link
                  to="/product/66"
                  className="text-decoration-none mb-2 me-2"
                >
                  <button className="btn btn-outline-light">Aksesoris</button>
                </Link>
              </div>
              <a
                href="#"
                className="text-decoration-none align-self-center align-self-md-start"
              >
                <a href="/keranjang" className="btn btn-primary btn-wish mt-4">
                  Lihat Keranjang
                </a>
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
