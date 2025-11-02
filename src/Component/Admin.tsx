// src/components/Admin.tsx
import React, { useState } from 'react';

interface AdminFormData {
  courseName: string;
  studentName: string;
  rollNumber: string;
  marks: string;
  grade: string;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [formData, setFormData] = useState<AdminFormData>({
    courseName: '',
    studentName: '',
    rollNumber: '',
    marks: '',
    grade: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Result submitted successfully!');
    setFormData({
      courseName: '',
      studentName: '',
      rollNumber: '',
      marks: '',
      grade: ''
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`File "${file.name}" uploaded successfully!`);
    }
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
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h2 className="h3 mb-0 text-center fw-bold">Admin Panel</h2>
              </div>
              <div className="card-body p-0">
                {/* Navigation Tabs */}
                <ul className="nav nav-tabs nav-justified" role="tablist">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'upload' ? 'active' : ''}`}
                      onClick={() => setActiveTab('upload')}
                    >
                      <i className="bi bi-upload me-2"></i>
                      Bulk Upload
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'manual' ? 'active' : ''}`}
                      onClick={() => setActiveTab('manual')}
                    >
                      <i className="bi bi-pencil me-2"></i>
                      Manual Entry
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'manage' ? 'active' : ''}`}
                      onClick={() => setActiveTab('manage')}
                    >
                      <i className="bi bi-gear me-2"></i>
                      Manage Results
                    </button>
                  </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content p-4">
                  {/* Bulk Upload Tab */}
                  {activeTab === 'upload' && (
                    <div className="tab-pane fade show active">
                      <div className="text-center py-4">
                        <i className="bi bi-cloud-upload display-1 text-primary"></i>
                        <h3 className="mt-3">Bulk Results Upload</h3>
                        <p className="text-muted mb-4">
                          Upload Excel or CSV files containing student results
                        </p>
                        
                        <div className="border-2 border-dashed rounded-3 p-5 bg-light">
                          <input
                            type="file"
                            id="fileUpload"
                            className="d-none"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleFileUpload}
                          />
                          <label htmlFor="fileUpload" className="btn btn-primary btn-lg">
                            <i className="bi bi-folder2-open me-2"></i>
                            Choose File
                          </label>
                          <p className="small text-muted mt-3">
                            Supported formats: .xlsx, .xls, .csv
                          </p>
                        </div>

                        <div className="mt-4">
                          <h5>Upload Guidelines:</h5>
                          <ul className="list-unstyled text-start d-inline-block">
                            <li><i className="bi bi-check text-success me-2"></i>Include student roll numbers</li>
                            <li><i className="bi bi-check text-success me-2"></i>Ensure correct course codes</li>
                            <li><i className="bi bi-check text-success me-2"></i>Marks should be numerical values</li>
                            <li><i className="bi bi-check text-success me-2"></i>File size should be under 10MB</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Manual Entry Tab */}
                  {activeTab === 'manual' && (
                    <div className="tab-pane fade show active">
                      <h4 className="mb-4">Manual Result Entry</h4>
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor="courseName" className="form-label">Course Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="courseName"
                              name="courseName"
                              value={formData.courseName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="studentName" className="form-label">Student Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="studentName"
                              name="studentName"
                              value={formData.studentName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="rollNumber" className="form-label">Roll Number</label>
                            <input
                              type="text"
                              className="form-control"
                              id="rollNumber"
                              name="rollNumber"
                              value={formData.rollNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="marks" className="form-label">Marks</label>
                            <input
                              type="number"
                              className="form-control"
                              id="marks"
                              name="marks"
                              value={formData.marks}
                              onChange={handleInputChange}
                              min="0"
                              max="100"
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="grade" className="form-label">Grade</label>
                            <select
                              className="form-select"
                              id="grade"
                              name="grade"
                              value={formData.grade}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select Grade</option>
                              <option value="A+">A+</option>
                              <option value="A">A</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B">B</option>
                              <option value="C+">C+</option>
                              <option value="C">C</option>
                              <option value="F">F</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <button type="submit" className="btn btn-primary px-4">
                            <i className="bi bi-check-circle me-2"></i>
                            Submit Result
                          </button>
                          <button type="reset" className="btn btn-outline-secondary ms-2">
                            Reset Form
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Manage Results Tab */}
                  {activeTab === 'manage' && (
                    <div className="tab-pane fade show active">
                      <h4 className="mb-4">Manage Results</h4>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                              <i className="bi bi-eye display-4 text-primary"></i>
                              <h5 className="mt-3">View All Results</h5>
                              <p className="text-muted">Browse and review all student results</p>
                              <button className="btn btn-outline-primary">View Results</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                              <i className="bi bi-pencil display-4 text-warning"></i>
                              <h5 className="mt-3">Edit Results</h5>
                              <p className="text-muted">Modify existing student results</p>
                              <button className="btn btn-outline-warning">Edit Results</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                              <i className="bi bi-trash display-4 text-danger"></i>
                              <h5 className="mt-3">Delete Results</h5>
                              <p className="text-muted">Remove student results from system</p>
                              <button className="btn btn-outline-danger">Delete Results</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                              <i className="bi bi-graph-up display-4 text-success"></i>
                              <h5 className="mt-3">Generate Reports</h5>
                              <p className="text-muted">Create analytical reports</p>
                              <button className="btn btn-outline-success">Generate Report</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;