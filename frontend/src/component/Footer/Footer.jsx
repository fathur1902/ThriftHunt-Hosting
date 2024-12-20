import "./Footer.css"


export default function Footer() {
  return (
    <>
      <footer className="footer-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <img
                src="/assets/images/Logo.png"
                alt="Logo"
                className="footer-logo"
              />
              <p className="footer-text">
                Jangan lewatkan penawaran menarik dan informasi terbaru!
                Daftarkan emailmu sekarang!
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#" className="footer-icon">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="footer-icon">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="footer-icon">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
          <div className="footer-bottom text-center mt-3">
            <p>
              copyright © 2024, group 3 - Ascending, Web Development & UI/UX
              Design.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
