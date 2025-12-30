import { useEffect, useState } from "react";
import { Table, Badge, Spinner, Form } from "react-bootstrap";
import api from "../../services/apiClient.js";

const statusVariant = (status) => {
  if (status === "PLACED") return "secondary";
  if (status === "SHIPPED") return "info";
  if (status === "DELIVERED") return "success";
  if (status === "CANCELLED") return "danger";
  return "secondary";
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
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
      <h2 className="h4 mb-3">Manage orders</h2>
      <Table bordered size="sm" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id.slice(-6)}</td>
              <td>{o.user?.name}</td>
              <td>₹{o.totalAmount.toFixed(2)}</td>
              <td>
                <Badge bg={statusVariant(o.status)}>{o.status}</Badge>
              </td>
              <td>
                <Form.Select
                  size="sm"
                  value={o.status}
                  onChange={(e) =>
                    handleStatusChange(o._id, e.target.value)
                  }
                >
                  <option value="PLACED">PLACED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminOrdersPage;



