import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content">
          <Reveal>
            <div className="section-label">ABOUT HYBRIMOTO</div>
            <h1>
              Next-Generation<br />
              Hybrid Mobility.
            </h1>
            <p className="hero-subtext">
              HybriMoto is a next-generation mobility startup focused on designing and building smart, eco-efficient Hybrid Motorcycles from the ground up.
            </p>
          </Reveal>
        </div>
      </section>


      {/* WHO WE ARE */}
      <section className="about-introduction">
        <div className="container about-grid">
          <div className="section-number">01</div>

          <div className="about-intro-text">
            <Reveal>
              <div className="section-label">WHO WE ARE</div>
              <h2>
                Redefining Two-Wheelers<br />
                For Indian Consumers.
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p>
                HybriMoto is a next-generation mobility startup focused on designing and building smart, eco-efficient Hybrid Motorcycles from the ground up.
              </p>
              <p>
                Our mission is to deliver a cost-effective, dual-powered two-wheeler combining the strength of Internal Combustion with electric mobility, suited for urban and semi-urban consumers in India.
              </p>
              <p>
                We believe the future of mobility should not force riders to choose between high fuel costs and electric range anxiety. By bridging both technologies into one seamless platform, HMI delivers practical, accessible transportation.
              </p>
            </Reveal>
          </div>

          <Reveal delay={250} className="about-image-frame">
            <img
              src="/images/upbike.png"
              alt="HybriMoto dual-power hybrid motorcycle architecture"
              loading="lazy"
            />
            <div className="image-caption">
              <span>HMI H1 DUAL-POWER ARCHITECTURE</span>
            </div>
          </Reveal>
        </div>
      </section>


      {/* OUR TECHNOLOGY */}
      <section className="about-technology">
        <div className="container">
          <Reveal className="tech-header">
            <div className="section-number">02</div>
            <div className="section-label">OUR TECHNOLOGY</div>
            <h2>AWD Twin Motor Hybrid System</h2>
            <p>Engineered to deliver high fuel efficiency, all-terrain stability, and seamless power switching.</p>
          </Reveal>

          <div className="tech-cards-grid">
            <Reveal delay={100} className="tech-card">
              <span className="tech-badge">AWD</span>
              <h3>All-Wheel Drive</h3>
              <p>Integrated AWD dual-power flow linking rear wheel IC engine traction with front wheel electric motor assistance.</p>
            </Reveal>

            <Reveal delay={200} className="tech-card">
              <span className="tech-badge">MOTORS</span>
              <h3>Twin Electric Motors</h3>
              <p>2.0 kW total electric output (1.5 + 0.5 kW integrated AWD) for silent zero-emission city commuting.</p>
            </Reveal>

            <Reveal delay={300} className="tech-card">
              <span className="tech-badge">ENGINE</span>
              <h3>IC Engine</h3>
              <p>125cc air-cooled 4-stroke engine delivering 9.6 BHP peak power and high-speed highway cruising.</p>
            </Reveal>

            <Reveal delay={400} className="tech-card">
              <span className="tech-badge">MODES</span>
              <h3>Three Hybrid Modes</h3>
              <p>Petrol Mode, EV Mode, and Assist Mode for every riding scenario.</p>
            </Reveal>
          </div>

          {/* VISUAL TECHNOLOGY SHOWCASE */}
          <Reveal delay={200} className="tech-showcase-image">
            <img
              src="/images/hybrim.png"
              alt="HybriMoto Integrated Hybrid Control System"
              loading="lazy"
            />
            <div className="showcase-overlay">
              <div className="showcase-details">
                <h4>INTEGRATED HYBRID CONTROL SYSTEM</h4>
                <p>Prototyped and tested for real-world Indian road conditions.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="about-cta">
        <div className="container">
          <Reveal>
            <div className="cta-label">THE NEXT CHAPTER</div>
            <h2>Experience the Future of Indian Mobility.</h2>
            <button onClick={() => navigate("/choose")}>
              EXPLORE WHY CHOOSE HMI <span>↗</span>
            </button>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

export default About;
