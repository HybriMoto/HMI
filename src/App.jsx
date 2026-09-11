import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import ChooseHMI from "./pages/ChooseHMI";
import Workshop from "./pages/Workshop";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-wrapper">
      <Routes location={location}>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ABOUT US */}
        <Route path="/about" element={<About />} />

        {/* WHY CHOOSE HMI */}
        <Route path="/choose" element={<ChooseHMI />} />

        {/* WORKSHOP */}
        <Route path="/workshop" element={<Workshop />} />

        {/* CAREERS */}
        <Route path="/careers" element={<Careers />} />

        {/* CONTACT */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;













