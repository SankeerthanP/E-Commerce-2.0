import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Contact Us</h1>

          <Row>
            {/* Contact Form */}
            <Col md={7} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <h2 className="h5 mb-3">
                    <i className="bi bi-envelope me-2 text-primary"></i>
                    Send us a Message
                  </h2>
                  {submitted && (
                    <Alert variant="success">
                      Thank you for contacting us! We'll get back to you soon.
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What is this regarding?"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us how we can help you..."
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      <i className="bi bi-send me-2"></i>
                      Send Message
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Information */}
            <Col md={5}>
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <h2 className="h5 mb-3">
                    <i className="bi bi-info-circle me-2 text-primary"></i>
                    Get in Touch
                  </h2>
                  <div className="mb-3">
                    <h6 className="fw-bold">
                      <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                      Address
                    </h6>
                    <p className="text-muted small mb-0">
                      ECOMX Internet Private Limited<br />
                      Buildings Alyssa, Begonia & Clove<br />
                      Embassy Tech Village, Outer Ring Road<br />
                      Devarabeesanahalli Village<br />
                      Bengaluru, Karnataka 560103<br />
                      India
                    </p>
                  </div>
                  <div className="mb-3">
                    <h6 className="fw-bold">
                      <i className="bi bi-telephone-fill me-2 text-primary"></i>
                      Phone
                    </h6>
                    <p className="text-muted small mb-0">
                      <a href="tel:+9118001234567" className="text-decoration-none">
                        +91 1800-123-4567
                      </a>
                      <br />
                      <span className="text-muted">Mon-Sat: 9:00 AM - 8:00 PM</span>
                    </p>
                  </div>
                  <div className="mb-3">
                    <h6 className="fw-bold">
                      <i className="bi bi-envelope-fill me-2 text-primary"></i>
                      Email
                    </h6>
                    <p className="text-muted small mb-0">
                      <a href="mailto:help@ecomx.com" className="text-decoration-none">
                        help@ecomx.com
                      </a>
                      <br />
                      <a href="mailto:support@ecomx.com" className="text-decoration-none">
                        support@ecomx.com
                      </a>
                    </p>
                  </div>
                </Card.Body>
              </Card>

              <Card className="shadow-sm">
                <Card.Body>
                  <h2 className="h5 mb-3">
                    <i className="bi bi-question-circle me-2 text-primary"></i>
                    Support
                  </h2>
                  <p className="small text-muted">
                    Need help with your order? Have questions about our products? Our customer support team is here to help you.
                  </p>
                  <ul className="list-unstyled small">
                    <li className="mb-2">
                      <i className="bi bi-check-circle me-2 text-success"></i>
                      Track your order status
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle me-2 text-success"></i>
                      Get help with returns & refunds
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle me-2 text-success"></i>
                      Product inquiries
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle me-2 text-success"></i>
                      Technical support
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;


