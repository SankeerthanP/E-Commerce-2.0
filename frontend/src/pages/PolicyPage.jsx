import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { useState } from "react";

const PolicyPage = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Our Policies</h1>

          <Row>
            {/* Sidebar Navigation */}
            <Col md={3} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Nav className="flex-column">
                    <Nav.Link
                      className={activeTab === "privacy" ? "active fw-bold" : ""}
                      onClick={() => setActiveTab("privacy")}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="bi bi-shield-lock me-2"></i>
                      Privacy Policy
                    </Nav.Link>
                    <Nav.Link
                      className={activeTab === "terms" ? "active fw-bold" : ""}
                      onClick={() => setActiveTab("terms")}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="bi bi-file-text me-2"></i>
                      Terms of Service
                    </Nav.Link>
                    <Nav.Link
                      className={activeTab === "refund" ? "active fw-bold" : ""}
                      onClick={() => setActiveTab("refund")}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="bi bi-arrow-counterclockwise me-2"></i>
                      Refund Policy
                    </Nav.Link>
                  </Nav>
                </Card.Body>
              </Card>
            </Col>

            {/* Policy Content */}
            <Col md={9}>
              {activeTab === "privacy" && (
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 className="h4 mb-3">
                      <i className="bi bi-shield-lock me-2 text-primary"></i>
                      Privacy Policy
                    </h2>
                    <p className="text-muted small mb-3">Last updated: {new Date().toLocaleDateString()}</p>

                    <h5 className="h6 mt-4">1. Information We Collect</h5>
                    <p>
                      We collect information that you provide directly to us, including when you create an account, 
                      make a purchase, contact us, or use our services. This may include:
                    </p>
                    <ul>
                      <li>Name, email address, phone number, and shipping address</li>
                      <li>Payment information (processed securely through our payment partners)</li>
                      <li>Order history and preferences</li>
                      <li>Communication preferences</li>
                    </ul>

                    <h5 className="h6 mt-4">2. How We Use Your Information</h5>
                    <p>We use the information we collect to:</p>
                    <ul>
                      <li>Process and fulfill your orders</li>
                      <li>Send you order confirmations and updates</li>
                      <li>Respond to your inquiries and provide customer support</li>
                      <li>Send you marketing communications (with your consent)</li>
                      <li>Improve our website and services</li>
                      <li>Detect and prevent fraud</li>
                    </ul>

                    <h5 className="h6 mt-4">3. Information Sharing</h5>
                    <p>
                      We do not sell your personal information. We may share your information with:
                    </p>
                    <ul>
                      <li>Service providers who help us operate our business</li>
                      <li>Payment processors for transaction processing</li>
                      <li>Shipping partners for order fulfillment</li>
                      <li>Legal authorities when required by law</li>
                    </ul>

                    <h5 className="h6 mt-4">4. Data Security</h5>
                    <p>
                      We implement appropriate security measures to protect your personal information. 
                      However, no method of transmission over the internet is 100% secure.
                    </p>

                    <h5 className="h6 mt-4">5. Your Rights</h5>
                    <p>You have the right to:</p>
                    <ul>
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Request deletion of your information</li>
                      <li>Opt-out of marketing communications</li>
                    </ul>
                  </Card.Body>
                </Card>
              )}

              {activeTab === "terms" && (
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 className="h4 mb-3">
                      <i className="bi bi-file-text me-2 text-primary"></i>
                      Terms of Service
                    </h2>
                    <p className="text-muted small mb-3">Last updated: {new Date().toLocaleDateString()}</p>

                    <h5 className="h6 mt-4">1. Acceptance of Terms</h5>
                    <p>
                      By accessing and using ECOMX, you accept and agree to be bound by these Terms of Service. 
                      If you do not agree, please do not use our services.
                    </p>

                    <h5 className="h6 mt-4">2. Use of the Website</h5>
                    <p>You agree to:</p>
                    <ul>
                      <li>Use the website only for lawful purposes</li>
                      <li>Provide accurate and complete information</li>
                      <li>Maintain the security of your account</li>
                      <li>Not engage in any fraudulent or harmful activities</li>
                    </ul>

                    <h5 className="h6 mt-4">3. Products and Pricing</h5>
                    <p>
                      We strive to provide accurate product descriptions and pricing. However, we reserve the right 
                      to correct errors and modify prices. Product availability is subject to change.
                    </p>

                    <h5 className="h6 mt-4">4. Orders and Payment</h5>
                    <p>
                      All orders are subject to acceptance by us. We reserve the right to refuse or cancel any order. 
                      Payment must be made at the time of purchase through our secure payment gateway.
                    </p>

                    <h5 className="h6 mt-4">5. Shipping and Delivery</h5>
                    <p>
                      Shipping times are estimates and may vary. We are not responsible for delays caused by shipping 
                      carriers or circumstances beyond our control.
                    </p>

                    <h5 className="h6 mt-4">6. Returns and Refunds</h5>
                    <p>
                      Please refer to our Refund Policy for details on returns and refunds. We reserve the right to 
                      refuse returns that do not meet our return policy requirements.
                    </p>

                    <h5 className="h6 mt-4">7. Limitation of Liability</h5>
                    <p>
                      ECOMX shall not be liable for any indirect, incidental, or consequential damages arising from 
                      your use of our services.
                    </p>
                  </Card.Body>
                </Card>
              )}

              {activeTab === "refund" && (
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 className="h4 mb-3">
                      <i className="bi bi-arrow-counterclockwise me-2 text-primary"></i>
                      Refund Policy
                    </h2>
                    <p className="text-muted small mb-3">Last updated: {new Date().toLocaleDateString()}</p>

                    <h5 className="h6 mt-4">1. Return Eligibility</h5>
                    <p>You may return products within 7 days of delivery if:</p>
                    <ul>
                      <li>The product is unused and in its original packaging</li>
                      <li>All tags and labels are intact</li>
                      <li>You have the original invoice</li>
                      <li>The product is not in the non-returnable category</li>
                    </ul>

                    <h5 className="h6 mt-4">2. Non-Returnable Items</h5>
                    <p>The following items cannot be returned:</p>
                    <ul>
                      <li>Personal care items (opened)</li>
                      <li>Grocery items</li>
                      <li>Items damaged by misuse</li>
                      <li>Customized or personalized products</li>
                    </ul>

                    <h5 className="h6 mt-4">3. Return Process</h5>
                    <p>To initiate a return:</p>
                    <ol>
                      <li>Log in to your account and go to "My Orders"</li>
                      <li>Select the order you want to return</li>
                      <li>Click "Return" and select the reason</li>
                      <li>Wait for return approval</li>
                      <li>Pack the item securely and ship it back</li>
                    </ol>

                    <h5 className="h6 mt-4">4. Refund Processing</h5>
                    <p>
                      Once we receive and inspect the returned item, we will process your refund within 5-7 business days. 
                      Refunds will be issued to the original payment method.
                    </p>

                    <h5 className="h6 mt-4">5. Shipping Costs</h5>
                    <p>
                      Return shipping costs are the responsibility of the customer unless the return is due to our error 
                      or a defective product.
                    </p>

                    <h5 className="h6 mt-4">6. Exchange Policy</h5>
                    <p>
                      We currently do not offer direct exchanges. To exchange an item, please return the original item 
                      and place a new order for the desired product.
                    </p>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PolicyPage;


