import { useEffect, useState } from "react";
import { Table, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/apiClient.js";

const statusVariant = (status) => {
  if (status === "PLACED") return "secondary";
  if (status === "SHIPPED") return "info";
  if (status === "DELIVERED") return "success";
  if (status === "CANCELLED") return "danger";
  return "secondary";
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/orders/my");
        setOrders(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h2 className="h4 mb-3">My orders</h2>
      <Table bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Placed</th>
            <th>Total</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id.slice(-6)}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>₹{o.totalAmount.toFixed(2)}</td>
              <td>
                <Badge bg={statusVariant(o.status)}>{o.status}</Badge>
              </td>
              <td>
                <Link to={`/orders/${o._id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrdersPage;




