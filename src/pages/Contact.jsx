import { useState } from "react";
import Reveal from "../components/Reveal";
import { sendEmailPayload } from "../services/emailService";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (status.error) {
      setStatus((prev) => ({ ...prev, error: "" }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter your name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      return "Please enter your message.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setStatus({ submitting: false, submitted: false, error: validationError });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: "" });

    try {
      const result = await sendEmailPayload({
        type: "contact",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
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
      console.error("Form Submission Error:", err);
      setStatus({
        submitting: false,
        submitted: false,
        error: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="container contact-hero-content">
          <Reveal>
            <div className="section-label">GET IN TOUCH</div>
            <h1>
              Let's Build<br />
              Something Better.
            </h1>
            <p className="hero-subtext">
              Have questions about HybriMoto motorcycles, technology, partnerships, or investor inquiries? Get in touch with our leadership team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT INFO & FORM SECTION */}
      <section className="contact-section">
        <div className="container contact-grid">
          
          {/* CONTACT INFO COLUMN */}
          <Reveal className="contact-info">
            <div className="section-number">01</div>
            <div className="section-label">CONTACT HYBRIMOTO</div>
            <h2>We'd love to hear from you.</h2>
            <p className="contact-description">
              Whether you're interested in our hybrid vehicle specs, hosting a workshop, exploring career opportunities, or corporate partnerships, our team is ready to respond.
            </p>

            <div className="contact-details-list">
              <div className="detail-item">
                <span className="detail-label">OFFICIAL RECEIVING EMAIL</span>
                <a href="mailto:team@hybrimotoindia.com" className="detail-value">
                  team@hybrimotoindia.com <span>↗</span>
                </a>
              </div>

              <div className="detail-item">
                <span className="detail-label">HEADQUARTERS LOCATION</span>
                <p className="detail-value-text">HybriMoto India R&D Center, India</p>
              </div>
            </div>
          </Reveal>

          {/* FORM COLUMN */}
          <Reveal delay={200} className="contact-form-wrapper">
            {!status.submitted ? (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {status.error && (
                  <div className="form-error-banner">
                    ⚠️ {status.error}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">YOUR NAME *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">EMAIL ADDRESS *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">PHONE NUMBER</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">SUBJECT</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="e.g. Pre-order inquiry, Workshop, Partnership"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">MESSAGE *</label>
                  <textarea
                    id="message"
                    rows="6"
                    required
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={status.submitting}
                >
                  {status.submitting ? "SENDING..." : "SEND MESSAGE ↗"}
                </button>
              </form>
            ) : (
              <div className="form-success-card">
                <div className="success-badge">✓</div>
                <h3>MESSAGE SENT</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Your inquiry regarding "{formData.subject || "HybriMoto India"}" has been delivered to <strong>team@hybrimotoindia.com</strong>.
                </p>
                <button
                  className="reset-form-btn"
                  onClick={() => {
                    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                    setStatus({ submitting: false, submitted: false, error: "" });
                  }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            )}
          </Reveal>

        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="contact-bottom">
        <div className="container">
          <Reveal>
            <div className="cta-label">THE FUTURE OF MOBILITY</div>
            <h2>
              Powering Tomorrow.<br />
              Driven By Innovation.
            </h2>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

export default Contact;