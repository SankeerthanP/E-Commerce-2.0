import { useEffect, useState } from "react";
import { Row, Col, Card, Button, Spinner, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../services/apiClient.js";
import { useCart } from "../context/CartContext.jsx";

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/products?sort=rating");
        setFeatured(res.data.slice(0, 8));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <section className="mb-4">
        <Carousel variant="dark">
          <Carousel.Item>
            <div className="rounded bg-primary text-light p-4 d-flex flex-column flex-md-row align-items-center">
              <div className="flex-grow-1">
                <h1 className="display-6 mb-1">Mega Electronics Sale</h1>
                <p className="lead mb-0">
                  Up to 40% off on mobiles, laptops &amp; gadgets.
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="rounded bg-warning-subtle p-4 d-flex flex-column flex-md-row align-items-center">
              <div className="flex-grow-1">
                <h2 className="h3 mb-1">Fashion Fest</h2>
                <p className="mb-0">
                  Hoodies, shirts, pants &amp; more starting at ₹499.
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="rounded bg-success-subtle p-4 d-flex flex-column flex-md-row align-items-center">
              <div className="flex-grow-1">
                <h2 className="h3 mb-1">Daily Essentials</h2>
                <p className="mb-0">
                  Groceries &amp; home needs delivered to your door.
                </p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>
      <h2 className="h4 mb-3">Top rated picks</h2>
      {loading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {featured.map((p) => (
            <Col key={p._id}>
              <Card className="h-100 shadow-sm">
                {p.images?.[0] && (
                  <Card.Img
                    variant="top"
                    src={p.images[0]}
                    alt={p.name}
                    style={{ objectFit: "cover", height: 180 }}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/500x500?text=No+Image")
                    }
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6">{p.name}</Card.Title>
                  <Card.Text className="mb-1 fw-bold">₹{p.price}</Card.Text>
                  <Card.Text className="text-muted small flex-grow-1">
                    {p.description?.slice(0, 60)}...
                  </Card.Text>
                  <div className="d-flex gap-2">
                    <Button
                      as={Link}
                      to={`/product/${p.slug}`}
                      size="sm"
                      variant="outline-primary"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => addToCart(p, 1)}
                    >
                      Add to cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
