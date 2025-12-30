import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Row, Col, Card, Button, Form, Spinner, Badge } from "react-bootstrap";
import api from "../../services/apiClient.js";
import { useCart } from "../../context/CartContext.jsx";

const ProductsPage = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const { addToCart } = useCart();

  useEffect(() => {
    const loadCategories = async () => {
      const res = await api.get("/categories");
      setCategories(res.data);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (params.slug) query.set("category", params.slug);
        if (search) query.set("search", search);
        const res = await api.get(`/products?${query.toString()}`);
        setProducts(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.slug, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      if (search) p.set("q", search);
      else p.delete("q");
      return p;
    });
  };

  return (
    <Row className="g-3">
      <Col md={3}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title className="fs-6">Categories</Card.Title>
            <div className="d-flex flex-column gap-1 small">
              <Link to="/products">All</Link>
              {categories.map((c) => (
                <Link key={c._id} to={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              ))}
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title className="fs-6">Search</Card.Title>
            <Form onSubmit={handleSearchSubmit}>
              <Form.Control
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
              />
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={9}>
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="fw-semibold">
                Products{" "}
                <Badge bg="secondary" pill>
                  {products.length}
                </Badge>
              </div>
            </div>
            <Row xs={1} sm={2} md={3} lg={3} className="g-3">
              {products.map((p) => (
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
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProductsPage;

