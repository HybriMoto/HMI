import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open & handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const navigation = [
    { label: "HMI BIKE", path: "/" },
    { label: "ABOUT US", path: "/about" },
    { label: "WORKSHOP", path: "/workshop" },
    { label: "CAREERS", path: "/careers" },
    { label: "WHY CHOOSE US?", path: "/choose" },
    { label: "CONTACT US", path: "/contact" },
  ];

  return (
    <header className={`navbar ${menuOpen ? "navbar-open" : ""}`}>
      <div className="navbar-inner container">

        {/* BRAND LOGO & TITLE */}
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
        >
          <img
            src="/images/logo.png"
            alt="HybriMoto India"
          />
          <div className="brand-text">
            <span className="brand-title">HYBRIMOTO</span>
            <span className="brand-subtitle">INDIA</span>
          </div>
        </Link>


        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>


        {/* MOBILE MENU HAMBURGER BUTTON */}
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="bar bar-1"></span>
          <span className="bar bar-2"></span>
          <span className="bar bar-3"></span>
        </button>

      </div>


      {/* MOBILE NAVIGATION MENU OVERLAY */}
      <div className="mobile-menu-overlay" onClick={closeMenu}></div>
      <div className="mobile-menu">
        <nav aria-label="Mobile Navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span>{item.label}</span>
              <span className="mobile-arrow">↗</span>
            </NavLink>
          ))}
        </nav>
      </div>

    </header>
  );
}

export default Navbar;