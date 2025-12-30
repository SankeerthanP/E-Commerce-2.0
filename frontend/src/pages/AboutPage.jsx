import { Container, Row, Col, Card } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">About ECOMX</h1>

          {/* Our Story */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h2 className="h4 mb-3">
                <i className="bi bi-book me-2 text-primary"></i>
                Our Story
              </h2>
              <p>
                ECOMX was founded with a simple mission: to make online shopping accessible, convenient, and enjoyable for everyone. 
                We started as a small team of passionate individuals who believed that shopping should be effortless and trustworthy.
              </p>
              <p>
                Since our inception, we have grown into a trusted e-commerce platform serving thousands of customers across the country. 
                We are committed to providing quality products, competitive prices, and exceptional customer service.
              </p>
              <p>
                Our journey has been marked by continuous innovation, customer-centric approach, and a dedication to excellence. 
                We strive to be more than just an online store – we aim to be your trusted shopping partner.
              </p>
            </Card.Body>
          </Card>

          {/* Mission & Vision */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h3 className="h5 mb-3">
                    <i className="bi bi-bullseye me-2 text-primary"></i>
                    Our Mission
                  </h3>
                  <p>
                    To provide customers with a seamless online shopping experience by offering a wide range of quality products 
                    at competitive prices, backed by reliable customer service and fast delivery.
                  </p>
                  <p>
                    We aim to build trust and long-lasting relationships with our customers by being transparent, 
                    reliable, and always putting customer satisfaction first.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h3 className="h5 mb-3">
                    <i className="bi bi-eye me-2 text-primary"></i>
                    Our Vision
                  </h3>
                  <p>
                    To become India's most trusted and preferred online shopping destination, known for quality, 
                    innovation, and exceptional customer experience.
                  </p>
                  <p>
                    We envision a future where shopping is effortless, where customers can find everything they need 
                    in one place, and where technology makes life easier for everyone.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Our Values */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h2 className="h4 mb-3">
                <i className="bi bi-heart me-2 text-primary"></i>
                Our Values
              </h2>
              <Row>
                <Col md={4} className="mb-3">
                  <h5 className="h6">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Customer First
                  </h5>
                  <p className="small text-muted">
                    Every decision we make is centered around our customers' needs and satisfaction.
                  </p>
                </Col>
                <Col md={4} className="mb-3">
                  <h5 className="h6">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Quality Assurance
                  </h5>
                  <p className="small text-muted">
                    We ensure all products meet high quality standards before reaching our customers.
                  </p>
                </Col>
                <Col md={4} className="mb-3">
                  <h5 className="h6">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Transparency
                  </h5>
                  <p className="small text-muted">
                    We believe in honest communication and transparent business practices.
                  </p>
                </Col>
                <Col md={4} className="mb-3">
                  <h5 className="h6">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Innovation
                  </h5>
                  <p className="small text-muted">
                    We continuously innovate to improve our platform and services.
                  </p>
                </Col>
                <Col md={4} className="mb-3">
                  <h5 className="h6">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Integrity
                  </h5>
                  <p className="small text-muted">
                    We conduct business with the highest ethical standards and integrity.
                  </p>
                </Col>
                <Col md={4} className="mb-3">
                  <h5 className="h6">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Excellence
                  </h5>
                  <p className="small text-muted">
                    We strive for excellence in everything we do, from product selection to customer service.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Team */}
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="h4 mb-3">
                <i className="bi bi-people me-2 text-primary"></i>
                Our Team
              </h2>
              <p>
                ECOMX is powered by a diverse team of talented individuals who are passionate about e-commerce and customer service. 
                Our team includes experts in technology, logistics, customer support, marketing, and more.
              </p>
              <p>
                We believe in fostering a collaborative work environment where every team member can contribute their best. 
                Our success is a result of the hard work, dedication, and innovation of our entire team.
              </p>
              <p className="mb-0">
                If you're interested in joining our team, please visit our careers page or contact us at{" "}
                <a href="mailto:careers@ecomx.com">careers@ecomx.com</a>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;


