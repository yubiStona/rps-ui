import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-vh-100 bg-light">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="bi bi-graph-up me-2"></i>
            Result Processing System
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/results">Results</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Streamlined Result Processing
              </h1>
              <p className="lead mb-4">
                Efficient, accurate, and secure result management system for educational institutions. 
                Process, analyze, and publish results with ease.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <button className="btn btn-light btn-lg px-4 py-2 fw-semibold">
                  View Results
                </button>
                <button className="btn btn-outline-light btn-lg px-4 py-2">
                  Admin Login
                </button>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="hero-image mt-5 mt-lg-0">
                <div className="bg-white rounded-3 p-4 shadow-lg">
                  <i className="bi bi-bar-chart-fill text-primary" style={{ fontSize: '8rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">Key Features</h2>
            <p className="text-muted lead">Comprehensive result management solutions</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-speedometer2 text-primary" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold">Fast Processing</h5>
                  <p className="card-text text-muted">
                    Process large volumes of results quickly with our optimized system architecture.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-shield-check text-success" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold">Secure & Reliable</h5>
                  <p className="card-text text-muted">
                    Enterprise-grade security with data encryption and secure access controls.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <div className="card-body text-center p-4">
                  <div className="feature-icon bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-graph-up-arrow text-info" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold">Analytics Ready</h5>
                  <p className="card-text text-muted">
                    Advanced analytics and reporting features for data-driven decision making.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-3">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-primary mb-2">50K+</h3>
                <p className="text-muted fw-semibold">Results Processed</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-success mb-2">99.9%</h3>
                <p className="text-muted fw-semibold">Uptime</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-info mb-2">100+</h3>
                <p className="text-muted fw-semibold">Institutions</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-warning mb-2">24/7</h3>
                <p className="text-muted fw-semibold">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center py-5">
          <h2 className="display-5 fw-bold mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4 opacity-75">
            Join hundreds of educational institutions using our result processing system
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-light btn-lg px-5 py-3 fw-semibold">
              Get Started Today
            </button>
            <button className="btn btn-outline-light btn-lg px-5 py-3">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">&copy; 2024 Result Processing System. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex justify-content-md-end gap-4">
                <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
                <a href="#" className="text-white text-decoration-none">Terms of Service</a>
                <a href="#" className="text-white text-decoration-none">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;