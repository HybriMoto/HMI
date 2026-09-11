import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import Lightbox from "../components/Lightbox";
import "./Workshop.css";

function Workshop() {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Real workshop image collection from /public/images/
  const workshopGallery = [
    { src: "/images/workshop1.png", title: "EV Battery System Hands-on Session", category: "Training" },
    { src: "/images/workshop2.png", title: "Hybrid Powertrain Live Assembly", category: "Practical" },
    { src: "/images/workshop3.png", title: "Motor Controller & Telemetry Testing", category: "Electronics" },
    { src: "/images/workshop4.png", title: "Student Team Diagnostics Challenge", category: "Diagnostics" },
    { src: "/images/workshop5.png", title: "HMI Engineering Expert Mentorship", category: "Mentorship" },
    { src: "/images/workshop6.png", title: "Electric Vehicle Wiring & Safety", category: "Training" },
    { src: "/images/workshop7.png", title: "Real Prototype Test Bench Exploration", category: "Hands-on" },
    { src: "/images/workshop8.png", title: "Twin Motor AWD Integration Lab", category: "AWD Tech" },
    { src: "/images/workshop10.png", title: "Battery Management System Calibration", category: "BMS" },
    { src: "/images/workshop11.png", title: "Interactive Chassis & Suspension Tuning", category: "Mechanical" },
    { src: "/images/workshop12.png", title: "Hybrid Mode Switch Testing", category: "Control Systems" },
    { src: "/images/workshop13.png", title: "Hands-on Participant EV Assembly", category: "Students" },
    { src: "/images/workshop14.png", title: "Workshop Certification & Group Photo", category: "Graduation" },
    { src: "/images/workshop15.png", title: "Vehicle Testing Track Demonstration", category: "Field Test" },
    { src: "/images/workshop16.png", title: "Future Mobility Q&A Session", category: "Interactive" },
    { src: "/images/grp1.jpeg", title: "HybriMoto Workshop Cohort Batch", category: "Community" },
    { src: "/images/grp2.jpeg", title: "Hands-on Practical Training Team", category: "Teamwork" },
    { src: "/images/grp3.jpeg", title: "Live Prototype Inspection Group", category: "Inspection" },
    { src: "/images/grp4.jpeg", title: "HMI Technical Training Graduates", category: "Certification" },
    { src: "/images/img1.jpeg", title: "Motor Component Deep-Dive", category: "Hardware" },
    { src: "/images/img8.jpeg", title: "Diagnostic Software & Telemetry", category: "Software" },
    { src: "/images/img10.jpeg", title: "High-Voltage Safety Demonstration", category: "Safety" },
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? workshopGallery.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === workshopGallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="workshop-page">
      
      {/* HERO SECTION */}
      <section className="workshop-hero">
        <div className="workshop-hero-overlay"></div>
        <div className="container workshop-hero-content">
          <Reveal>
            <div className="section-label">HYBRIMOTO WORKSHOPS</div>
            <h1>
              Hands-on Hybrid &<br />
              Electric Vehicle Training
            </h1>
            <p className="hero-tagline">
              Learn • Build • Innovate. Bridging the gap between classroom theory and industry-ready automotive engineering skills.
            </p>
          </Reveal>

          {/* WORKSHOP STATS STRIP */}
          <Reveal delay={200} className="workshop-stats">
            <div className="w-stat">
              <strong>110+</strong>
              <span>Students Trained</span>
            </div>
            <div className="w-stat">
              <strong>15+</strong>
              <span>Workshops Conducted</span>
            </div>
            <div className="w-stat">
              <strong>100%</strong>
              <span>Hands-on Learning</span>
            </div>
          </Reveal>
        </div>
      </section>


      {/* OVERVIEW & PURPOSE SECTION */}
      <section className="workshop-overview">
        <div className="container overview-grid">
          <Reveal className="overview-text">
            <div className="section-number">01</div>
            <div className="section-label">OUR MISSION</div>
            <h2>Learn by Building the Future.</h2>
            <p>
              HybriMoto India conducts hands-on workshops focused on Hybrid and Electric Vehicle technologies.
              We provide engineering students, tech enthusiasts, and automotive professionals with direct practical experience on real hybrid motorcycle powertrains and EV components.
            </p>
            <p>
              Participants gain practical skills through live demonstrations, component diagnostics, battery management system disassembly, and expert guidance from startup founders and engineers.
            </p>
          </Reveal>

          <Reveal delay={200} className="highlights-grid">
            <div className="highlight-card">
              <span className="hl-num">01</span>
              <h3>Hands-on Training</h3>
              <p>Work directly with real motors, controllers, batteries, and hybrid powertrains.</p>
            </div>
            <div className="highlight-card">
              <span className="hl-num">02</span>
              <h3>Industry Experts</h3>
              <p>Learn directly from founders and engineers building India's hybrid motorcycles.</p>
            </div>
            <div className="highlight-card">
              <span className="hl-num">03</span>
              <h3>Live Demonstrations</h3>
              <p>Witness live drive mode switching, energy recovery, and vehicle diagnostics.</p>
            </div>
            <div className="highlight-card">
              <span className="hl-num">04</span>
              <h3>Certifications</h3>
              <p>Earn official HybriMoto India workshop completion certificates for your portfolio.</p>
            </div>
          </Reveal>
        </div>
      </section>


      {/* CURRICULUM / WHAT PARTICIPANTS LEARN */}
      <section className="workshop-curriculum">
        <div className="container">
          <Reveal>
            <div className="section-number">02</div>
            <div className="section-label">CURRICULUM</div>
            <h2>What You Will Learn</h2>
          </Reveal>

          <div className="curriculum-grid">
            <Reveal delay={100} className="curriculum-card">
              <div className="curr-icon">⚡</div>
              <h3>Hybrid Vehicle Architecture</h3>
              <p>Understanding dual-power flow, ICE + EV integration, and drive mode optimization.</p>
            </Reveal>

            <Reveal delay={150} className="curriculum-card">
              <div className="curr-icon">🔌</div>
              <h3>Electric Powertrains</h3>
              <p>BLDC & PMSM motors, AWD twin motor setups, and torque transmission dynamics.</p>
            </Reveal>

            <Reveal delay={200} className="curriculum-card">
              <div className="curr-icon">🔋</div>
              <h3>Battery Management Systems</h3>
              <p>Lithium-ion chemistry, thermal management, cell balancing, and safety protocols.</p>
            </Reveal>

            <Reveal delay={250} className="curriculum-card">
              <div className="curr-icon">⚙️</div>
              <h3>Motor Controllers & Telemetry</h3>
              <p>FOC motor speed control, CAN bus communication, and smart TFT display interfacing.</p>
            </Reveal>

            <Reveal delay={300} className="curriculum-card">
              <div className="curr-icon">🛠️</div>
              <h3>EV Diagnostics & Safety</h3>
              <p>Troubleshooting fault codes, high-voltage isolation, and preventative maintenance.</p>
            </Reveal>

            <Reveal delay={350} className="curriculum-card">
              <div className="curr-icon">🌱</div>
              <h3>Sustainable Mobility</h3>
              <p>Future trends in dual-fuel mobility, energy recovery, and eco-efficient commuting.</p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* WORKSHOP GALLERY (MAJOR VISUAL SECTION) */}
      <section className="workshop-gallery-section">
        <div className="container">
          <Reveal className="gallery-header">
            <div className="section-number">03</div>
            <div className="section-label">WORKSHOP GALLERY</div>
            <h2>Real Training. Real Impact.</h2>
            <p>Explore photos from our previous hands-on workshops across Indian engineering institutions.</p>
          </Reveal>

          {/* MASONRY-STYLE RESPONSIVE GRID */}
          <div className="gallery-grid">
            {workshopGallery.map((img, idx) => (
              <Reveal
                key={img.src}
                delay={(idx % 6) * 60}
                className="gallery-item"
              >
                <div className="gallery-card" onClick={() => openLightbox(idx)}>
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-category">{img.category}</span>
                    <h4 className="gallery-item-title">{img.title}</h4>
                    <span className="zoom-icon">🔍 View Full Image</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* CTA SECTION */}
      <section className="workshop-cta">
        <div className="container">
          <Reveal>
            <div className="cta-label">HOST OR ATTEND A WORKSHOP</div>
            <h2>Ready to Build the Future of EV & Hybrid Tech?</h2>
            <p>Inquire about hosting a HybriMoto workshop at your college, campus, or organization.</p>
            <button onClick={() => navigate("/contact")}>
              INQUIRE FOR WORKSHOP <span>↗</span>
            </button>
          </Reveal>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <Lightbox
        images={workshopGallery}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />

    </div>
  );
}

export default Workshop;

