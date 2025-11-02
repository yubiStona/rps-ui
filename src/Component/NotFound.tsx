// src/components/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 text-center">
            {/* Animated 404 Graphic */}
            <div className="mb-4">
              <div className="position-relative d-inline-block">
                <div className="display-1 fw-bold text-primary opacity-25">404</div>
                <div className="position-absolute top-50 start-50 translate-middle">
                  <i className="bi bi-exclamation-triangle-fill text-warning display-3"></i>
                </div>
              </div>
            </div>

            {/* Message */}
            <h1 className="display-5 fw-bold text-dark mb-3">Page Not Found</h1>
            <p className="lead text-muted mb-4">
              Oops! The page you're looking for seems to have wandered off into the digital void. 
              Don't worry, even the best results systems sometimes can't find what they're looking for.
            </p>

            {/* Quick Actions */}
            <div className="row g-3 mb-5">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <i className="bi bi-house-door display-6 text-primary mb-3"></i>
                    <h5>Go Home</h5>
                    <p className="small text-muted">Return to the homepage</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <i className="bi bi-graph-up display-6 text-success mb-3"></i>
                    <h5>View Results</h5>
                    <p className="small text-muted">Check student results</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <i className="bi bi-telephone display-6 text-info mb-3"></i>
                    <h5>Get Help</h5>
                    <p className="small text-muted">Contact support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5">
              <Link to="/" className="btn btn-primary btn-lg px-4 py-2">
                <i className="bi bi-house me-2"></i>
                Back to Homepage
              </Link>
              <Link to="/results" className="btn btn-outline-primary btn-lg px-4 py-2">
                <i className="bi bi-graph-up me-2"></i>
                View Results
              </Link>
              <Link to="/contact" className="btn btn-outline-secondary btn-lg px-4 py-2">
                <i className="bi bi-headset me-2"></i>
                Contact Support
              </Link>
            </div>

            {/* Search Suggestion */}
            <div className="card border-0 shadow-sm bg-white">
              <div className="card-body">
                <h6 className="fw-semibold mb-3">Can't find what you're looking for?</h6>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search our website..."
                    onClick={() => alert('Search functionality would be implemented here!')}
                  />
                  <button className="btn btn-primary" type="button">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Help */}
            <div className="mt-4">
              <p className="text-muted small">
                If you believe this is an error, please <Link to="/contact" className="text-decoration-none">contact our support team</Link> 
                {' '}and let us know what you were looking for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;