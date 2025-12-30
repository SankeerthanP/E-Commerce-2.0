import { Table, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Alert variant="info">
        Your cart is empty. <Link to="/products">Browse products</Link>
      </Alert>
    );
  }

  return (
    <>
      <h2 className="h4 mb-3">Shopping cart</h2>
      <Table bordered responsive size="sm">
        <thead>
          <tr>
            <th>Product</th>
            <th style={{ width: 100 }}>Price</th>
            <th style={{ width: 100 }}>Qty</th>
            <th style={{ width: 100 }}>Total</th>
            <th style={{ width: 80 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.product._id}>
              <td>{it.product.name}</td>
              <td>₹{it.product.price}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={it.quantity}
                  onChange={(e) =>
                    updateQuantity(it.product._id, Number(e.target.value))
                  }
                  className="form-control form-control-sm"
                />
              </td>
              <td>₹{it.quantity * it.product.price}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => removeFromCart(it.product._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          Items: {totalItems} • Total:{" "}
          <strong>₹{totalPrice.toFixed(2)}</strong>
        </div>
        <Button variant="primary" onClick={() => navigate("/checkout")}>
          Proceed to checkout
        </Button>
      </div>
    </>
  );
};

export default CartPage;



