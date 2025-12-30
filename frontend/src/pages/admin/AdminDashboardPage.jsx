import { useEffect, useState } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import api from "../../services/apiClient.js";

const AdminDashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [products, orders, feedback] = await Promise.all([
          api.get("/products"),
          api.get("/orders"),
          api.get("/feedback"),
        ]);
        setSummary({
          products: products.data.length,
          orders: orders.data.length,
          feedback: feedback.data.length,
          recentOrders: orders.data.slice(0, 5),
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading || !summary) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h2 className="h4 mb-3">Admin dashboard</h2>
      <Row className="g-3 mb-3">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total products</Card.Title>
              <Card.Text className="display-6">{summary.products}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total orders</Card.Title>
              <Card.Text className="display-6">{summary.orders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Feedback</Card.Title>
              <Card.Text className="display-6">{summary.feedback}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="h6">Recent orders</Card.Title>
          <ul className="small mb-0">
            {summary.recentOrders.map((o) => (
              <li key={o._id}>
                {o._id.slice(-6)} • {o.status} • ₹{o.totalAmount.toFixed(2)}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};

export default AdminDashboardPage;



