import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import "./ChooseHMI.css";

function ChooseHMI() {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState("PETROL");

  const hybridModes = [
    {
      id: "PETROL",
      name: "PETROL",
      tagline: "Internal Combustion Drive",
      icon: "⛽",
      summary: "Conventional IC engine propulsion engineered for highway performance and extended range.",
      description: "In Petrol Mode, the motorcycle operates through the conventional 125cc air-cooled 4-stroke internal combustion engine. Ideal for highway cruising, long-distance touring, and continuous riding without depleting the electric battery pack.",
      specs: ["125cc Air-Cooled 4-Stroke Engine", "9.6 BHP Peak Engine Output", "Unlimited Continuous Distance"],
    },
    {
      id: "EV",
      name: "EV",
      tagline: "Electric Drive",
      icon: "⚡",
      summary: "Pure electric propulsion for zero-emission, silent urban commuting.",
      description: "In EV Mode, the motorcycle operates using electric propulsion delivered by integrated electric motors. Perfect for quiet city commuting, zero tailpipe emissions, instant throttle response, and minimal daily operating costs.",
      specs: ["2.0 kW Total Electric Output", "Instant Low-Speed Torque", "Zero Emissions & Near-Silent Operation"],
    },
    {
      id: "ASSIST",
      name: "ASSIST",
      tagline: "Combined Power Assist",
      icon: "🔥",
      summary: "Dual-power synergy combining electric torque assistance with internal combustion.",
      description: "In Assist Mode, the electric motor actively assists the conventional internal combustion engine. Provides dynamic acceleration boost during overtaking, steep hill climbs, and heavy payloads while maximizing fuel efficiency.",
      specs: ["26.5 Nm Combined Peak Torque", "Dual-Wheel All-Wheel Traction", "Dynamic Power Distribution"],
    },
  ];

  const features = [
    {
      num: "01",
      badge: "ENGINEERING",
      title: "Designed for Indian Roads",
      description: "High ground clearance, reinforced suspension, and rugged chassis engineered to endure varied Indian road conditions.",
    },
    {
      num: "02",
      badge: "ECONOMY",
      title: "Low Running Cost",
      description: "EV electric mode slashes daily commuting fuel expenses while dual-power hybrid technology optimizes overall mileage.",
    },
    {
      num: "03",
      badge: "RELIABILITY",
      title: "Low Maintenance",
      description: "Simplified hybrid transmission and durable dual-powertrain components reduce wear and long-term service cost.",
    },
    {
      num: "04",
      badge: "PERFORMANCE",
      title: "Instant Electric Torque",
      description: "26.5 Nm combined maximum torque provides immediate linear acceleration for effortless city overtakes.",
    },
    {
      num: "05",
      badge: "TELEMETRY",
      title: "Smart TFT Display & Connectivity",
      description: "Connected digital instrument cluster providing real-time telemetry, trip analytics, and navigation guidance.",
    },
    {
      num: "06",
      badge: "SAFETY",
      title: "Enhanced Safety Features",
      description: "Integrated dual-channel braking, high-voltage battery cutoff, and emergency isolation for maximum rider security.",
    },
    {
      num: "07",
      badge: "RANGE",
      title: "Improved Range",
      description: "180 km total ICE + EV range eliminates range anxiety completely for both daily commutes and highway trips.",
    },
    {
      num: "08",
      badge: "EFFICIENCY",
      title: "Superior Mileage",
      description: "Optimized engine operation coupled with twin electric motors delivers industry-leading fuel economy.",
    },
    {
      num: "09",
      badge: "VERSATILITY",
      title: "3 Hybrid Modes",
      description: "Switch seamlessly between Petrol, EV, and Assist modes depending on your ride requirements.",
    },
    {
      num: "10",
      badge: "TRACTION",
      title: "AWD Capability",
      description: "Dual electric motors (1.5 + 0.5 kW) deliver dual-wheel traction for enhanced stability on slippery or steep surfaces.",
    },
    {
      num: "11",
      badge: "REGENERATION",
      title: "Self-Recharging System",
      description: "Regenerative braking and engine kinetic recovery automatically replenish the battery pack while riding.",
    },
    {
      num: "12",
      badge: "SUSTAINABILITY",
      title: "Eco-Friendly Commuting",
      description: "Reduced carbon emissions in EV and Assist modes helping clean urban air without charging station delays.",
    },
  ];

  return (
    <div className="choose-page">
      
      {/* HERO */}
      <section className="choose-hero">
        <div className="choose-hero-overlay"></div>
        <div className="container choose-hero-content">
          <Reveal>
            <div className="section-label">WHY CHOOSE HMI</div>
            <h1>
              Engineered Without<br />
              Compromise.
            </h1>
            <p className="hero-subtext">
              Discover how HybriMoto India combines the independence of conventional fuel with the efficiency of electric mobility.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THREE HYBRID MODES INTERACTIVE SECTION */}
      <section className="modes-interactive-section">
        <div className="container">
          <Reveal className="choose-header">
            <div className="section-number">01</div>
            <div className="section-label">DYNAMIC DRIVE SYSTEM</div>
            <h2>THREE HYBRID MODES</h2>
            <p>Select a driving mode to explore its mechanical operation and performance characteristics.</p>
          </Reveal>

          <div className="modes-selector-grid">
            {hybridModes.map((mode) => {
              const isSelected = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  className={`mode-card ${isSelected ? "active" : ""}`}
                  onClick={() => setActiveMode(mode.id)}
                  aria-pressed={isSelected}
                >
                  <div className="mode-card-header">
                    <span className="mode-icon">{mode.icon}</span>
                    <span className="mode-badge">{isSelected ? "ACTIVE MODE" : "SELECT MODE"}</span>
                  </div>
                  <h3>{mode.name}</h3>
                  <h4>{mode.tagline}</h4>
                  <p>{mode.summary}</p>
                  <div className="mode-indicator-bar"></div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE MODE DISPLAY PANEL */}
          {(() => {
            const current = hybridModes.find((m) => m.id === activeMode) || hybridModes[0];
            return (
              <div key={current.id} className="mode-detail-panel">
                <div className="detail-panel-left">
                  <span className="detail-mode-badge">{current.icon} {current.name} MODE ACTIVE</span>
                  <h3>{current.tagline}</h3>
                  <p className="detail-description">{current.description}</p>
                </div>
                <div className="detail-panel-right">
                  <h4>KEY SPECIFICATIONS</h4>
                  <ul>
                    {current.specs.map((spec, i) => (
                      <li key={i}>
                        <span className="spec-check">✓</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section className="choose-grid-section">
        <div className="container">
          <Reveal className="choose-header">
            <div className="section-number">02</div>
            <div className="section-label">KEY ADVANTAGES</div>
            <h2>Built for Indian Commuters</h2>
            <p>12 core engineering innovations designed to transform your daily ride.</p>
          </Reveal>

          {/* 3-4 COLUMNS ON DESKTOP, 2 ON TABLET, 1 ON MOBILE */}
          <div className="features-grid">
            {features.map((item, idx) => (
              <Reveal
                key={item.num}
                delay={(idx % 4) * 80}
                className="feature-card"
              >
                <div className="card-top">
                  <span className="card-num">{item.num}</span>
                  <span className="card-badge">{item.badge}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="choose-cta">
        <div className="container">
          <Reveal>
            <div className="cta-label">JOIN THE HYBRID REVOLUTION</div>
            <h2>Ready to Upgrade Your Daily Ride?</h2>
            <button onClick={() => navigate("/contact")}>
              GET IN TOUCH WITH HMI <span>↗</span>
            </button>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

export default ChooseHMI;