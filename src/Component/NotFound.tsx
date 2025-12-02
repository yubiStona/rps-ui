// src/components/NotFound.tsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body className="p-5">
              <div className="display-1 text-muted mb-4">404</div>
              <h2 className="h4 text-muted mb-3">Page Not Found</h2>
              <p className="text-muted mb-4">
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Button variant="primary">
                <Link to={"/"}>
                Go Back to Home
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;