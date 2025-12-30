import { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/apiClient.js";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    load();
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Manage products</h2>
        <Button onClick={() => navigate("/admin/products/new")}>
          Add product
        </Button>
      </div>
      <Table bordered size="sm" responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category?.name}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <Button
                  as={Link}
                  to={`/admin/products/${p._id}/edit`}
                  size="sm"
                  variant="outline-primary"
                  className="me-1"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminProductsPage;




