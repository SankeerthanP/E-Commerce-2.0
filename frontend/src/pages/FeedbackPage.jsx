import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import api from "../services/apiClient.js";
import { useAuth } from "../context/AuthContext.jsx";

const FeedbackPage = () => {
  const { user } = useAuth();

  // Admins should not see the feedback form – they see feedback list via /admin/feedback
  if (user?.role === "admin") {
    return (
      <div className="text-center text-muted">
        Admins can view all user feedback from the <strong>Admin &gt; Feedback</strong> section.
      </div>
    );
  }
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await api.post("/feedback", {
        name,
        email,
        message,
        userId: user?.id,
      });
      setSuccess("Thank you for your feedback!");
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="shadow-sm" style={{ maxWidth: 520, width: "100%" }}>
        <Card.Body>
          <Card.Title className="mb-3 text-center">Feedback</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Sending..." : "Send feedback"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FeedbackPage;


