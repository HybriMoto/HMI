import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WarpText from "../components/WarpText";
import Reveal from "../components/Reveal";
import "./Home.css";

function Home() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem("hmiIntroShown");
  });
  const [isExiting, setIsExiting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!showIntro) return;

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    const completeTimer = setTimeout(() => {
      setShowIntro(false);
      sessionStorage.setItem("hmiIntroShown", "true");
    }, 3200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [showIntro]);

  return (
    <div className="home-page">

      {/* =========================
          BRAND INTRO REVEAL
      ========================== */}
      {showIntro && (
        <section className={`brand-intro ${isExiting ? "brand-intro-exit" : ""}`}>
          <div className="brand-intro-content">
            <div className="brand-intro-logo">
              <img src="/images/logo.png" alt="HybriMoto Logo" />
            </div>

            <WarpText
              text="HYBRIMOTO"
              color="#ffffff"
              warpStrength={0.05}
              warpScale={1.05}
              speed={0.5}
              pointerInfluence={0.3}
              pointerStrength={0.25}
              refraction={0}
              ripple
              fontSize={110}
              fontWeight={800}
              style={{
                height: "160px",
                width: "100%",
              }}
              fontFamily="inherit"
              letterSpacing={-0.03}
              lineHeight={0.9}
            />

            <p className="brand-tagline">
              HYBRID MOBILITY. REDEFINED.
            </p>
          </div>

          <div className="intro-scroll">
            <span className="scroll-line"></span>
            <span className="scroll-text">POWERED BY HYBRID INNOVATION</span>
          </div>
        </section>
      )}


      {/* =========================
          MAIN HOME HERO & CONTENT
      ========================== */}
      <div className={`home-main ${showIntro ? "home-main-hidden" : "home-main-visible"}`}>

        {/* HERO SECTION */}
        <section className="home-hero">
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <div className="hero-label">
              HMI H1 Commuter
            </div>

            <h1>
              The Hybrid<br />
              Electric Vehicle.
            </h1>

            <p className="hero-subline">
              Powering Tomorrow, Driven by Innovation
            </p>

            <div className="hero-actions">
              <button
                onClick={() => navigate("/choose")}
                className="hero-button primary"
              >
                EXPLORE HMI <span>↗</span>
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="hero-button secondary"
              >
                CONTACT US
              </button>
            </div>

            {/* HERO STATS */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">
                  <strong>110</strong>
                  <span>km/h</span>
                </div>
                <small>TOP SPEED</small>
              </div>

              <div className="stat-item">
                <div className="stat-value">
                  <strong>180</strong>
                  <span>km</span>
                </div>
                <small>ICE + EV RANGE</small>
              </div>

              <div className="stat-item">
                <div className="stat-value">
                  <strong>30</strong>
                  <span>%</span>
                </div>
                <small>CHARGE IN 45 MIN*</small>
              </div>
            </div>
          </div>
        </section>


        {/* OUR VISION & MISSION SECTION */}
        <section className="home-introduction">
          <div className="container introduction-grid">
            <div className="section-number">01</div>

            <div className="introduction-content">
              <Reveal>
                <div className="section-label">OUR VISION & MISSION</div>
                <h2>
                  Next-Generation<br />
                  Hybrid Mobility.
                </h2>
              </Reveal>

              <Reveal delay={150}>
                <p>
                  HybriMoto is a next-generation mobility startup focused on designing and building smart, eco-efficient Hybrid Motorcycles from the ground up.
                </p>
                <p>
                  The mission is to deliver a cost-effective, dual-powered two-wheeler combining the strength of Internal Combustion with electric mobility, suited for urban and semi-urban consumers in India.
                </p>
              </Reveal>
            </div>

            <Reveal className="introduction-image-wrapper" delay={250}>
              <img
                src="/images/upbike.png"
                alt="HybriMoto dual-power hybrid motorcycle architecture"
                loading="lazy"
              />
              <div className="image-caption">
                <span>HMI H1 CONCEPT ARCHITECTURE</span>
              </div>
            </Reveal>
          </div>
        </section>


        {/* POWER & PERFORMANCE (OFFICIAL SPECS) SECTION */}
        <section className="home-performance">
          <div className="container">
            <Reveal>
              <div className="section-number">02</div>
              <div className="section-label">POWER & PERFORMANCE</div>
              <h2>Technical Specifications</h2>
            </Reveal>

            <div className="specs-grid">
              <Reveal delay={100} className="spec-card">
                <span className="spec-badge">ENGINE</span>
                <h3>125cc</h3>
                <h4>Internal Combustion Engine</h4>
                <p>Air-cooled, 4-stroke.</p>
              </Reveal>

              <Reveal delay={200} className="spec-card">
                <span className="spec-badge">ELECTRIC</span>
                <h3>2.0 kW</h3>
                <h4>Twin Electric Motors</h4>
                <p>1.5 + 0.5 kW integrated AWD.</p>
              </Reveal>

              <Reveal delay={300} className="spec-card">
                <span className="spec-badge">TORQUE</span>
                <h3>26.5 Nm</h3>
                <h4>Combined Max Torque</h4>
                <p>Seamless power distribution between electric drive and IC engine.</p>
              </Reveal>

              <Reveal delay={400} className="spec-card">
                <span className="spec-badge">POWER</span>
                <h3>9.6 BHP</h3>
                <h4>ICE Peak Power</h4>
                <p>Engineered for terrain performance and high efficiency.</p>
              </Reveal>
            </div>

            {/* THREE HYBRID MODES STRIP */}
            <Reveal delay={200} className="modes-strip">
              <h3>THREE HYBRID MODES</h3>
              <div className="modes-grid">
                <div className="mode-pill">
                  <strong>PETROL</strong>
                  <span>Internal Combustion Drive</span>
                </div>
                <div className="mode-pill">
                  <strong>EV</strong>
                  <span>Electric Drive</span>
                </div>
                <div className="mode-pill">
                  <strong>ASSIST</strong>
                  <span>Combined Power Assist</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>


        {/* WHY HMI SECTION */}
        <section className="why-hmi">
          <div className="container">
            <Reveal className="why-heading">
              <div className="section-number">03</div>
              <div className="section-label">WHY HYBRIMOTO</div>
              <h2>Built for the real world.</h2>
            </Reveal>

            <div className="why-grid">
              <Reveal delay={100} className="why-card">
                <span>01</span>
                <h3>Hybrid Power</h3>
                <p>
                  Intelligent combination of electric and conventional power for maximum fuel savings and practical mobility.
                </p>
              </Reveal>

              <Reveal delay={200} className="why-card">
                <span>02</span>
                <h3>Longer Range</h3>
                <p>
                  180 km combined ICE + EV range eliminates range anxiety completely for daily commuters and highway riders.
                </p>
              </Reveal>

              <Reveal delay={300} className="why-card">
                <span>03</span>
                <h3>Affordable Mobility</h3>
                <p>
                  Advanced hybrid technology engineered with accessibility, low operating cost, and real-world ownership in mind.
                </p>
              </Reveal>

              <Reveal delay={400} className="why-card">
                <span>04</span>
                <h3>Future Ready</h3>
                <p>
                  A smart motorcycle platform featuring self-recharging energy recovery and intelligent TFT telemetry.
                </p>
              </Reveal>
            </div>
          </div>
        </section>


        {/* FINAL CTA SECTION */}
        <section className="home-cta">
          <div className="container">
            <Reveal>
              <div className="cta-label">THE FUTURE IS MOVING</div>
              <h2>
                Ride what<br />
                comes next.
              </h2>
              <button onClick={() => navigate("/choose")}>
                EXPLORE HMI <span>↗</span>
              </button>
            </Reveal>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;
