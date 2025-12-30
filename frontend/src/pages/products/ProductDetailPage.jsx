import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Button, Spinner, Form } from "react-bootstrap";
import api from "../../services/apiClient.js";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${slug}`);
        setProduct(res.data);
        const rev = await api.get(`/reviews/product/${res.data._id}`);
        setReviews(rev.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      await api.post("/reviews", {
        productId: product._id,
        rating,
        comment,
      });
      const rev = await api.get(`/reviews/product/${product._id}`);
      setReviews(rev.data);
      setComment("");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !product) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Row className="g-4">
      <Col md={5}>
        <Card>
          {product.images?.[0] && (
            <Card.Img
              src={product.images[0]}
              alt={product.name}
              style={{ objectFit: "cover", height: 320 }}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/600x400?text=No+Image")
              }
            />
          )}
        </Card>
      </Col>
      <Col md={4}>
        <h3 className="h4">{product.name}</h3>
        <div className="mb-2 text-muted small">
          {product.category?.name} • {product.brand}
        </div>
        <div className="fs-4 fw-bold mb-2">₹{product.price}</div>
        <div className="mb-2">
          Rating: {product.averageRating.toFixed(1)} / 5 ({product.numReviews}{" "}
          reviews)
        </div>
        <p>{product.description}</p>
        <Button variant="primary" onClick={() => addToCart(product, 1)}>
          Add to cart
        </Button>
      </Col>
      <Col md={3}>
        <h5 className="h6">Customer reviews</h5>
        <div className="mb-3" style={{ maxHeight: 220, overflowY: "auto" }}>
          {reviews.length === 0 && (
            <div className="text-muted small">No reviews yet.</div>
          )}
          {reviews.map((r) => (
            <div key={r._id} className="border-bottom pb-2 mb-2 small">
              <div className="fw-semibold">{r.user?.name}</div>
              <div>Rating: {r.rating}/5</div>
              <div>{r.comment}</div>
            </div>
          ))}
        </div>
        {user && (
          <>
            <h6 className="h6">Write a review</h6>
            <Form onSubmit={handleReviewSubmit} className="small">
              <Form.Group className="mb-2">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button
                type="submit"
                size="sm"
                variant="primary"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProductDetailPage;

