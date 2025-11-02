// src/components/Contact.tsx
import React, { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent successfully! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <i className="bi bi-graph-up me-2"></i>
            Result Processing System
          </a>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h1 className="display-4 fw-bold text-dark">Contact Us</h1>
            <p className="lead text-muted">Get in touch with our support team</p>
          </div>
        </div>

        <div className="row g-5">
          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="h4 fw-bold mb-4">Get In Touch</h3>
                
                <div className="d-flex mb-4">
                  <div className="flex-shrink-0">
                    <i className="bi bi-geo-alt text-primary fs-4"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fw-semibold">Address</h5>
                    <p className="text-muted mb-0">
                      123 Education Street<br />
                      Academic City, AC 12345
                    </p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="flex-shrink-0">
                    <i className="bi bi-telephone text-primary fs-4"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fw-semibold">Phone</h5>
                    <p className="text-muted mb-0">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="flex-shrink-0">
                    <i className="bi bi-envelope text-primary fs-4"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fw-semibold">Email</h5>
                    <p className="text-muted mb-0">support@rpsystem.edu</p>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <i className="bi bi-clock text-primary fs-4"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fw-semibold">Support Hours</h5>
                    <p className="text-muted mb-0">
                      Mon - Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="social-links">
                  <h6 className="fw-semibold mb-3">Follow Us</h6>
                  <div className="d-flex gap-3">
                    <a href="#" className="text-primary fs-5">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="text-primary fs-5">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="text-primary fs-5">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" className="text-primary fs-5">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h3 className="h4 fw-bold mb-4">Send us a Message</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">Subject *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary px-4 py-2">
                        <i className="bi bi-send me-2"></i>
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Frequently Asked Questions</h4>
                
                <div className="accordion" id="faqAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq1"
                      >
                        How do I reset my password?
                      </button>
                    </h2>
                    <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Click on "Forgot Password" on the login page and follow the instructions sent to your registered email.
                      </div>
                    </div>
                  </div>
                  
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq2"
                      >
                        How can I download my result?
                      </button>
                    </h2>
                    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Go to the Results page, find your result, and click the download button next to your record.
                      </div>
                    </div>
                  </div>
                  
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq3"
                      >
                        What should I do if my result is missing?
                      </button>
                    </h2>
                    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Contact your course instructor or use this contact form to report the issue to our support team.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;