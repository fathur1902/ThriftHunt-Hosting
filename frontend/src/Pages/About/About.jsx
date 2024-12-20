import "./About.css";

export function About() {
  return (
    <>
      <section className="container-about px-4 sm:px-6 lg:px-8">
        <section id="tentang-kami" className="container">
          <div className="text-left">
            <h1 className="section-title">Tentang Kami</h1>
            <p className="about-text">
              ThriftHunt adalah perusahaan yang berkomitmen menyediakan produk
              thrift berkualitas tinggi yang telah dibersihkan dan siap pakai.
              Kami memastikan bahwa setiap produk yang dijual memenuhi standar
              kebersihan dan kenyamanan. Namun, harap diperhatikan bahwa
              beberapa kondisi khusus, seperti noda kuning yang sulit
              dihilangkan, mungkin tetap ada pada produk tertentu. Terima kasih
              atas kepercayaan Anda pada ThriftHunt!
            </p>
          </div>

          <div className="tentang row">
            <div className="image-container col-md-6 w-full md:w-1/2">
              <img
                src="/assets/images/Foto Toko.jpg"
                alt="Toko"
                className="about-image"
              />
            </div>
            <div className="content-container col-md-6 w-full md:w-1/2">
              <div className="content-wrapper">
                <h2 className="section-tentang">Tentang Kami</h2>
                <p className="deskripsi-tentang">
                  ThriftHunt adalah toko fashion yang berbasis Website,
                  Indonesia. Dibuat sejak 2024. Layanan pelanggan kami selalu
                  siap mendukung Anda 24/7.
                </p>
                <a href="/product" className="btn-tentang-custom">
                  Belanja Sekarang
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="hubungi-kami" className="container">
          <div className="text-center">
            <h1 className="section-title">Hubungi Kami</h1>
          </div>

          <div className="row mb-5 flex flex-col sm:flex-row">
            <div className="col-md-4 w-full sm:w-1/3 mb-4 sm:mb-0">
              <div className="contact-info text-center">
                <i className="bi bi-shop"></i>
                <h6>Alamat</h6>
                <p>Surabaya, Jawa Timur, Indonesia</p>
              </div>
            </div>
            <div className="col-md-4 w-full sm:w-1/3 mb-4 sm:mb-0">
              <div className="contact-info text-center">
                <i className="bi bi-telephone"></i>
                <h6>Hubungi Kami</h6>
                <p>+62 896-7773-7216</p>
              </div>
            </div>
            <div className="col-md-4 w-full sm:w-1/3 mb-4 sm:mb-0">
              <div className="contact-info text-center">
                <i className="bi bi-envelope"></i>
                <h6>Email</h6>
                <p>ascending@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="row flex flex-col lg:flex-row">
            <div className="col-md-6 w-full lg:w-1/2 mb-4 lg:mb-0">
              <div className="contact-form">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Nama Kamu"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email Kamu"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    className="form-control"
                    placeholder="Pesan Kamu"
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" className="btn-kirim">
                  Kirim Pesan
                </button>
              </div>
            </div>

            <div className="col-md-6 w-full lg:w-1/2 mb-4 lg:mb-0">
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.620374509073!2d112.7317273143205!3d-7.257471994755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sSurabaya%2C%20East%20Java%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1633072800000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

