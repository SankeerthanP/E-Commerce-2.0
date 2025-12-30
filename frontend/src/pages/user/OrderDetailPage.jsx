import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Badge, Spinner } from "react-bootstrap";
import api from "../../services/apiClient.js";

const statusVariant = (status) => {
  if (status === "PLACED") return "secondary";
  if (status === "SHIPPED") return "info";
  if (status === "DELIVERED") return "success";
  if (status === "CANCELLED") return "danger";
  return "secondary";
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading || !order) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h2 className="h4 mb-3">Order details</h2>
      <div className="mb-2 small">
        <div>ID: {order._id}</div>
        <div>Placed: {new Date(order.createdAt).toLocaleString()}</div>
        <div>
          Status:{" "}
          <Badge bg={statusVariant(order.status)}>{order.status}</Badge>
        </div>
      </div>
      <h3 className="h6 mt-3">Items</h3>
      <Table bordered size="sm" responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((it) => (
            <tr key={it.product._id}>
              <td>{it.product.name}</td>
              <td>{it.quantity}</td>
              <td>₹{it.priceAtPurchase}</td>
              <td>₹{(it.quantity * it.priceAtPurchase).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="fw-semibold">
        Total amount: ₹{order.totalAmount.toFixed(2)}
      </div>
    </>
  );
};

export default OrderDetailPage;




