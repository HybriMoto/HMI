import { useState } from "react";
import Reveal from "../components/Reveal";
import { sendEmailPayload } from "../services/emailService";
import "./Careers.css";

function Careers() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    domain: "",
    college: "",
    course: "",
    year: "",
    resumeLink: "",
    notes: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const domains = [
    { title: "Research & Development", icon: "🔬", desc: "Advanced hybrid algorithms, dual-power simulation, and energy recovery research." },
    { title: "Industrial & Product Design", icon: "✏️", desc: "Aesthetic styling, ergonomics, CAD surfacing, and clay modeling for next-gen motorcycles." },
    { title: "Mechanical & Manufacturing", icon: "⚙️", desc: "Chassis structural dynamics, suspension tuning, tooling, and low-volume production assembly." },
    { title: "Powertrain & Hybrid Systems", icon: "⚡", desc: "Engine-motor mechanical coupling, AWD gearboxes, and power-split transmission engineering." },
    { title: "Electrical & Electronics", icon: "🔌", desc: "High-voltage wiring harnesses, BMS hardware, inverter circuits, and CAN bus integration." },
    { title: "Data, Software & UI", icon: "💻", desc: "TFT digital instrument cluster UI, IoT telemetry, remote diagnostics, and mobile companion apps." },
    { title: "Marketing & Digital Media", icon: "📢", desc: "Brand narrative, automotive journalism outreach, digital launch campaigns, and community growth." },
    { title: "Operations & Admin", icon: "📋", desc: "Supply chain sourcing, vendor partnerships, regulatory compliance, and workshop coordination." },
  ];

  const positions = [
    { id: 1, title: "Powertrain Integration Engineer", domain: "Powertrain & Hybrid Systems", location: "India", type: "Full-Time" },
    { id: 2, title: "Embedded BMS Firmware Developer", domain: "Electrical & Electronics", location: "India", type: "Full-Time" },
    { id: 3, title: "Automotive Industrial Designer (CAD)", domain: "Industrial & Product Design", location: "India", type: "Full-Time" },
    { id: 4, title: "Full-Stack UI/Software Developer", domain: "Data, Software & UI", location: "Remote / Hybrid", type: "Full-Time" },
    { id: 5, title: "Mechanical Prototype Specialist", domain: "Mechanical & Manufacturing", location: "India", type: "Full-Time" },
  ];

  const handleApplyClick = (posTitle = "General Internship Application") => {
    setSelectedPosition(posTitle);
    setFormData((prev) => ({ ...prev, domain: posTitle }));
    setStatus({ submitting: false, submitted: false, error: "" });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedExtensions = ["pdf", "doc", "docx"];
    const ext = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      setStatus((prev) => ({ ...prev, error: "Invalid file type. Please upload a PDF, DOC, or DOCX document." }));
      setSelectedFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatus((prev) => ({ ...prev, error: "File size is too large. Maximum allowed size is 5MB." }));
      setSelectedFile(null);
      return;
    }

    setStatus((prev) => ({ ...prev, error: "" }));
    setSelectedFile(file);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter your full name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!formData.resumeLink.trim() && !selectedFile) {
      return "Please provide a resume link or upload a resume file.";
    }
    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErr = validateForm();
    if (validationErr) {
      setStatus({ submitting: false, submitted: false, error: validationErr });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: "" });

    try {
      let fileData = null;
      if (selectedFile) {
        fileData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              name: selectedFile.name,
              size: selectedFile.size,
              type: selectedFile.type,
              base64: reader.result,
            });
          };
          reader.readAsDataURL(selectedFile);
        });
      }

      const result = await sendEmailPayload({
        type: "career",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        domain: selectedPosition || formData.domain,
        college: formData.college.trim(),
        course: formData.course.trim(),
        year: formData.year.trim(),
        resumeLink: formData.resumeLink.trim(),
        resumeFile: fileData,
        message: formData.notes.trim(),
      });

      if (result.success) {
        setStatus({ submitting: false, submitted: true, error: "" });
      } else {
        setStatus({
          submitting: false,
          submitted: false,
          error: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      console.error("Application Error:", err);
      setStatus({
        submitting: false,
        submitted: false,
        error: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="careers-page">

      {/* HERO SECTION */}
      <section className="careers-hero">
        <div className="careers-hero-overlay"></div>
        <div className="container careers-hero-content">
          <Reveal>
            <div className="section-label">CAREERS AT HYBRIMOTO</div>
            <h1>
              Build the Future of<br />
              Hybrid Mobility.
            </h1>
            <p className="hero-subtext">
              Join an ambitious engineering team building India's first eco-efficient dual-powered hybrid motorcycle ecosystem from the ground up.
            </p>
            <button className="apply-hero-btn" onClick={() => handleApplyClick("General Internship / Engineering Application")}>
              APPLY NOW <span>↗</span>
            </button>
          </Reveal>
        </div>
      </section>

      {/* WHY WORK AT HMI */}
      <section className="careers-why">
        <div className="container">
          <Reveal className="careers-header">
            <div className="section-number">01</div>
            <div className="section-label">WHY HYBRIMOTO?</div>
            <h2>Why Build With Us?</h2>
          </Reveal>

          <div className="benefits-grid">
            <Reveal delay={100} className="benefit-card">
              <span className="b-num">01</span>
              <h3>Direct Work With Founders</h3>
              <p>Collaborate daily with founders across engineering, product design, testing, and strategic operations.</p>
            </Reveal>

            <Reveal delay={150} className="benefit-card">
              <span className="b-num">02</span>
              <h3>Hands-On Prototype Testing</h3>
              <p>Get involved with physical hardware, chassis assembly, dyno testing, and track validation.</p>
            </Reveal>

            <Reveal delay={200} className="benefit-card">
              <span className="b-num">03</span>
              <h3>End-to-End Ownership</h3>
              <p>Own critical modules from initial concept sketches through CAD design, bench testing, and commercial release.</p>
            </Reveal>

            <Reveal delay={250} className="benefit-card">
              <span className="b-num">04</span>
              <h3>Build Before Launch</h3>
              <p>Help shape an iconic automotive brand while the platform and core technologies are actively being forged.</p>
            </Reveal>

            <Reveal delay={300} className="benefit-card">
              <span className="b-num">05</span>
              <h3>High-Speed Environment</h3>
              <p>Rapid iteration cycles, high technical autonomy, and steep personal growth alongside startup pioneers.</p>
            </Reveal>

            <Reveal delay={350} className="benefit-card">
              <span className="b-num">06</span>
              <h3>Tangible Impact</h3>
              <p>Your engineering contributions directly reduce emissions and fuel burden for everyday Indian commuters.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ENGINEERING & OPERATIONAL DOMAINS */}
      <section className="careers-domains">
        <div className="container">
          <Reveal className="careers-header">
            <div className="section-number">02</div>
            <div className="section-label">ENGINEERING DOMAINS</div>
            <h2>Areas of Expertise</h2>
            <p>We invite passionate engineers and creators across these 8 core domains.</p>
          </Reveal>

          <div className="domains-grid">
            {domains.map((d, idx) => (
              <Reveal key={d.title} delay={(idx % 4) * 70} className="domain-card">
                <div className="domain-icon">{d.icon}</div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="careers-positions">
        <div className="container">
          <Reveal className="careers-header">
            <div className="section-number">03</div>
            <div className="section-label">OPEN ROLES</div>
            <h2>Active Openings</h2>
          </Reveal>

          <div className="positions-list">
            {positions.map((pos) => (
              <Reveal key={pos.id} delay={100} className="position-row">
                <div className="pos-info">
                  <div className="pos-tags">
                    <span className="pos-domain">{pos.domain}</span>
                    <span className="pos-type">{pos.type}</span>
                  </div>
                  <h3>{pos.title}</h3>
                  <p>Location: {pos.location}</p>
                </div>
                <button className="pos-apply-btn" onClick={() => handleApplyClick(pos.title)}>
                  APPLY FOR THIS ROLE
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="careers-cta">
        <div className="container">
          <Reveal>
            <div className="cta-label">NO PERFECT FIT LISTED?</div>
            <h2>Still Want to Shape the Future?</h2>
            <p>We are always eager to connect with extraordinary engineers, designers, and builders.</p>
            <button onClick={() => handleApplyClick("Open Speculative Internship Application")}>
              SEND SPECULATIVE APPLICATION <span>↗</span>
            </button>
          </Reveal>
        </div>
      </section>

      {/* APPLICATION MODAL */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>

            {!status.submitted ? (
              <>
                <div className="modal-header">
                  <span className="section-label">HYBRIMOTO CAREERS & INTERNSHIPS</span>
                  <h2>Apply for Role</h2>
                  <p className="modal-role-title">Position / Area: <strong>{selectedPosition}</strong></p>
                </div>

                <form onSubmit={handleFormSubmit} className="careers-form" noValidate>
                  {status.error && (
                    <div className="form-error-banner">
                      ⚠️ {status.error}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="c-name">FULL NAME *</label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="c-email">EMAIL ADDRESS *</label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="c-phone">PHONE NUMBER</label>
                      <input
                        id="c-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="c-college">COLLEGE / UNIVERSITY</label>
                      <input
                        id="c-college"
                        type="text"
                        placeholder="e.g. IIT, NIT, College of Engineering"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="c-course">COURSE / DEGREE & YEAR</label>
                      <input
                        id="c-course"
                        type="text"
                        placeholder="e.g. B.Tech Mechanical (3rd Year)"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="c-resume">RESUME / PORTFOLIO LINK *</label>
                    <input
                      id="c-resume"
                      type="url"
                      placeholder="https://linkedin.com/in/username or Google Drive link"
                      value={formData.resumeLink}
                      onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="c-file">OR UPLOAD RESUME (PDF, DOC, DOCX - MAX 5MB)</label>
                    <input
                      id="c-file"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    {selectedFile && (
                      <span className="file-name-indicator">📄 Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="c-notes">TELL US ABOUT YOUR WORK & INTERESTS</label>
                    <textarea
                      id="c-notes"
                      rows="4"
                      placeholder="Highlight key engineering projects, CAD models, EV builds, or relevant experience..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="submit-app-btn"
                    disabled={status.submitting}
                  >
                    {status.submitting ? "SENDING..." : "SUBMIT APPLICATION"}
                  </button>
                </form>
              </>
            ) : (
              <div className="modal-success">
                <div className="success-icon">✓</div>
                <h2>APPLICATION SUBMITTED</h2>
                <p>Thank you for your interest in HybriMoto India. Your application for <strong>{selectedPosition}</strong> has been successfully delivered to <strong>team@hybrimotoindia.com</strong>.</p>
                <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Careers;