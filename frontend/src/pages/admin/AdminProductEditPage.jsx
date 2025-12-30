import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import api from "../../services/apiClient.js";

const AdminProductEditPage = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    category: "",
    brand: "",
    images: [""],
    description: "",
    price: 0,
    stock: 0,
  });
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      const res = await api.get("/categories");
      setCategories(res.data);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (mode !== "edit" || !id) return;
      setLoading(true);
      try {
        const res = await api.get(`/products`);
        const existing = res.data.find((p) => p._id === id);
        if (existing) {
          setProduct({
            name: existing.name,
            slug: existing.slug,
            category: existing.category?._id || "",
            brand: existing.brand || "",
            images: existing.images?.length ? existing.images : [""],
            description: existing.description || "",
            price: existing.price,
            stock: existing.stock,
          });
        }
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      };
      if (mode === "create") {
        await api.post("/products", payload);
      } else {
        await api.put(`/products/${id}`, payload);
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="h5 mb-3">
          {mode === "create" ? "Add product" : "Edit product"}
        </Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit} className="small">
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              name="slug"
              value={product.slug}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              name="brand"
              value={product.brand}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              name="images"
              value={product.images[0] || ""}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, images: [e.target.value] }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdminProductEditPage;



