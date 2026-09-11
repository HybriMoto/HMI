import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <img src="/images/logo.png" alt="HybriMoto India Logo" />
            <div className="footer-brand-title">
              <strong>HybriMoto</strong>
              <span>India</span>
            </div>
          </Link>

          <h2>
            Engineering<br />
            <span>what comes next.</span>
          </h2>

          <p>
            HybriMoto India is building next-generation hybrid motorcycles combining eco-efficient electric mobility with dual-powered long-range performance.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-nav-col">
            <span className="footer-heading">EXPLORE</span>
            <Link to="/">HMI Bike</Link>
            <Link to="/about">About Us</Link>
            <Link to="/choose">Why Choose HMI</Link>
            <Link to="/workshop">Workshop</Link>
          </div>

          <div className="footer-nav-col">
            <span className="footer-heading">COMPANY</span>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer-nav-col">
            <span className="footer-heading">CONTACT</span>
            <a href="mailto:team@hybrimotoindia.com">team@hybrimotoindia.com</a>
            <span className="footer-location">India</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 HybriMoto India. All Rights Reserved.</span>
        <span>Hybrid mobility. Engineered differently.</span>
      </div>
    </footer>
  );
}

export default Footer;