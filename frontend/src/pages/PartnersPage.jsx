import { Container, Row, Col, Card } from "react-bootstrap";

const PartnersPage = () => {
  const partners = [
    {
      category: "Payment Partners",
      partners: [
        { name: "Razorpay", description: "Secure payment processing" },
        { name: "PayU", description: "Payment gateway solutions" },
        { name: "Stripe", description: "International payments" },
      ],
    },
    {
      category: "Shipping Partners",
      partners: [
        { name: "BlueDart", description: "Express delivery services" },
        { name: "FedEx", description: "International shipping" },
        { name: "Delhivery", description: "Logistics and delivery" },
        { name: "Ecom Express", description: "E-commerce logistics" },
      ],
    },
    {
      category: "Technology Partners",
      partners: [
        { name: "AWS", description: "Cloud infrastructure" },
        { name: "MongoDB", description: "Database solutions" },
        { name: "Vercel", description: "Hosting and deployment" },
      ],
    },
    {
      category: "Brand Partners",
      partners: [
        { name: "Apple", description: "Electronics and gadgets" },
        { name: "Samsung", description: "Mobile and electronics" },
        { name: "Nike", description: "Sports and footwear" },
        { name: "Adidas", description: "Sports and fashion" },
        { name: "Sony", description: "Electronics and entertainment" },
      ],
    },
  ];

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Our Partners</h1>
          <p className="lead text-muted mb-5">
            We work with trusted partners to provide you with the best shopping experience, 
            secure payments, fast delivery, and quality products.
          </p>

          {partners.map((section, idx) => (
            <Card key={idx} className="mb-4 shadow-sm">
              <Card.Body>
                <h2 className="h5 mb-4">
                  <i className="bi bi-handshake me-2 text-primary"></i>
                  {section.category}
                </h2>
                <Row>
                  {section.partners.map((partner, pIdx) => (
                    <Col md={4} key={pIdx} className="mb-3">
                      <div className="d-flex align-items-start">
                        <div
                          className="bg-primary text-white rounded d-flex align-items-center justify-content-center me-3"
                          style={{ width: "50px", height: "50px", fontSize: "20px", minWidth: "50px" }}
                        >
                          {partner.name.charAt(0)}
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">{partner.name}</h6>
                          <p className="small text-muted mb-0">{partner.description}</p>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          ))}

          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="h5 mb-3">
                <i className="bi bi-info-circle me-2 text-primary"></i>
                Partner With Us
              </h2>
              <p>
                Are you interested in partnering with ECOMX? We're always looking for reliable partners 
                who share our commitment to quality and customer satisfaction.
              </p>
              <p className="mb-0">
                For partnership inquiries, please contact us at{" "}
                <a href="mailto:partners@ecomx.com">partners@ecomx.com</a> or call{" "}
                <a href="tel:+9118001234567">+91 1800-123-4567</a>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PartnersPage;


