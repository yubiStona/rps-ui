// src/components/Results.tsx
import React, { useState } from 'react';

interface Result {
  id: number;
  studentName: string;
  rollNumber: string;
  course: string;
  grade: string;
  percentage: number;
  status: 'Pass' | 'Fail';
}

const Results: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const results: Result[] = [
    { id: 1, studentName: 'John Doe', rollNumber: '2024001', course: 'Computer Science', grade: 'A+', percentage: 92.5, status: 'Pass' },
    { id: 2, studentName: 'Jane Smith', rollNumber: '2024002', course: 'Mathematics', grade: 'A', percentage: 88.0, status: 'Pass' },
    { id: 3, studentName: 'Mike Johnson', rollNumber: '2024003', course: 'Physics', grade: 'B+', percentage: 78.5, status: 'Pass' },
    { id: 4, studentName: 'Sarah Wilson', rollNumber: '2024004', course: 'Computer Science', grade: 'F', percentage: 45.0, status: 'Fail' },
    { id: 5, studentName: 'David Brown', rollNumber: '2024005', course: 'Chemistry', grade: 'A-', percentage: 85.5, status: 'Pass' },
  ];

  const filteredResults = results.filter(result => 
    result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.rollNumber.includes(searchTerm)
  ).filter(result => 
    selectedCourse === 'all' || result.course === selectedCourse
  );

  const courses = ['all', ...Array.from(new Set(results.map(r => r.course)))];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'success';
      case 'A': return 'success';
      case 'A-': return 'success';
      case 'B+': return 'info';
      case 'B': return 'info';
      case 'C+': return 'warning';
      case 'C': return 'warning';
      case 'F': return 'danger';
      default: return 'secondary';
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
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="display-5 fw-bold text-dark">Student Results</h1>
              <button className="btn btn-primary">
                <i className="bi bi-download me-2"></i>
                Export Results
              </button>
            </div>

            {/* Search and Filter Section */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="search" className="form-label">Search Students</label>
                    <input
                      type="text"
                      className="form-control"
                      id="search"
                      placeholder="Search by name or roll number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="course" className="form-label">Filter by Course</label>
                    <select
                      className="form-select"
                      id="course"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                      {courses.map(course => (
                        <option key={course} value={course}>
                          {course === 'all' ? 'All Courses' : course}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Roll No.</th>
                        <th>Student Name</th>
                        <th>Course</th>
                        <th>Grade</th>
                        <th>Percentage</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map(result => (
                        <tr key={result.id}>
                          <td className="fw-semibold">{result.rollNumber}</td>
                          <td>{result.studentName}</td>
                          <td>{result.course}</td>
                          <td>
                            <span className={`badge bg-${getGradeColor(result.grade)}`}>
                              {result.grade}
                            </span>
                          </td>
                          <td>
                            <span className="fw-semibold">{result.percentage}%</span>
                          </td>
                          <td>
                            <span className={`badge bg-${result.status === 'Pass' ? 'success' : 'danger'}`}>
                              {result.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">
                              <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-success">
                              <i className="bi bi-download"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredResults.length === 0 && (
                  <div className="text-center py-4">
                    <i className="bi bi-search display-1 text-muted"></i>
                    <h4 className="text-muted mt-3">No results found</h4>
                    <p className="text-muted">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div className="row mt-4">
              <div className="col-md-3">
                <div className="card bg-primary text-white">
                  <div className="card-body text-center">
                    <h3 className="mb-0">{results.length}</h3>
                    <p className="mb-0">Total Students</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-success text-white">
                  <div className="card-body text-center">
                    <h3 className="mb-0">{results.filter(r => r.status === 'Pass').length}</h3>
                    <p className="mb-0">Passed</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-danger text-white">
                  <div className="card-body text-center">
                    <h3 className="mb-0">{results.filter(r => r.status === 'Fail').length}</h3>
                    <p className="mb-0">Failed</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-info text-white">
                  <div className="card-body text-center">
                    <h3 className="mb-0">
                      {((results.filter(r => r.status === 'Pass').length / results.length) * 100).toFixed(1)}%
                    </h3>
                    <p className="mb-0">Pass Rate</p>
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

export default Results;