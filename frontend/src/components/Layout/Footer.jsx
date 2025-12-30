import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/Logo.png"; // site logo image

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto">
      {/* Main Footer Content */}
      <Container className="py-4">
        <Row>
          {/* Company Info */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <img src={logo} alt="ECOMX" className="me-2 rounded" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
              <div className="footer-brand-container">
                <h5 className="mb-0 fw-bold">ECOMX</h5>
                <small className="footer-subheading">Shop Everything</small>
              </div>
            </div>
            <p className="text-white-50 small">
              Your one-stop destination for all your shopping needs. Quality products, fast delivery, and excellent customer service.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white" style={{ fontSize: "20px" }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white" style={{ fontSize: "20px" }}>
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white" style={{ fontSize: "20px" }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white" style={{ fontSize: "20px" }}>
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={6} md={2} className="mb-4 mb-md-0">
            <h6 className="text-white mb-3 fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/products" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  All Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/feedback" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Feedback
                </Link>
              </li>
            </ul>
          </Col>

          {/* About Us */}
          <Col xs={6} md={2} className="mb-4 mb-md-0">
            <h6 className="text-white mb-3 fw-bold">About Us</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/about" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Our Story
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Mission & Vision
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Team
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact */}
          <Col xs={6} md={2} className="mb-4 mb-md-0">
            <h6 className="text-white mb-3 fw-bold">Contact</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/contact" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Support
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Help Center
                </Link>
              </li>
            </ul>
          </Col>

          {/* Our Policy */}
          <Col xs={6} md={2} className="mb-4 mb-md-0">
            <h6 className="text-white mb-3 fw-bold">Our Policy</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/policy" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/policy" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/policy" className="text-white-50 text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
