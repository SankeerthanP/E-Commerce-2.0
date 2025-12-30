import { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import api from "../../services/apiClient.js";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    fullName: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
  });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (items.length === 0) {
    return (
      <Alert variant="info">
        Your cart is empty. Add items before checkout.
      </Alert>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const payload = {
        items: items.map((it) => ({
          productId: it.product._id,
          quantity: it.quantity,
        })),
        shippingAddress: shipping,
      };
      const res = await api.post("/orders", payload);
      clearCart();
      setSuccess("Order placed successfully! Status: " + res.data.status);
      setTimeout(() => navigate("/orders"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Row>
      <Col md={7}>
        <h2 className="h4 mb-3">Shipping details</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              name="fullName"
              value={shipping.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Address line 1</Form.Label>
            <Form.Control
              name="addressLine1"
              value={shipping.addressLine1}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  value={shipping.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="state"
                  value={shipping.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Postal code</Form.Label>
                <Form.Control
                  name="postalCode"
                  value={shipping.postalCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={shipping.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary" disabled={placing}>
            {placing ? "Placing order..." : "Place order (Cash on Delivery)"}
          </Button>
        </Form>
      </Col>
      <Col md={5}>
        <h2 className="h5 mb-3">Order summary</h2>
        <div className="border rounded p-3 bg-white shadow-sm small">
          {items.map((it) => (
            <div
              key={it.product._id}
              className="d-flex justify-content-between mb-1"
            >
              <span>
                {it.product.name} × {it.quantity}
              </span>
              <span>₹{(it.product.price * it.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between fw-semibold">
            <span>Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="text-muted mt-2">
            Payment method: Cash on Delivery (simulated)
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CheckoutPage;




