import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import logo from "../../assets/Logo.png"; // site logo image

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Top Bar - Announcement (hidden for admin users) */}
      {user?.role !== "admin" && (
        <div className="bg-dark text-white py-1 small">
          <Container className="d-flex justify-content-between align-items-center">
            <div>
              <i className="bi bi-truck me-1"></i>
              Free shipping on orders over ₹999
            </div>
            <div className="d-none d-md-flex gap-3">
              <span>
                <i className="bi bi-telephone me-1"></i>
                Support: +91 1800-123-4567
              </span>
              <span>
                <i className="bi bi-envelope me-1"></i>
                help@ecomx.com
              </span>
            </div>
          </Container>
        </div>
      )}

      {/* Main Navbar */}
      <BsNavbar
        bg="white"
        variant="light"
        expand="lg"
        sticky="top"
        className="shadow-sm border-bottom"
        style={{ minHeight: "70px" }}
      >
        <Container>
          {/* Logo */}
          <BsNavbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center me-4"
          >
            <img
              src={logo}
              alt="ECOMX"
              className="me-2"
              style={{ width: "45px", height: "45px", objectFit: "contain" }}
            />
            <div className="d-flex flex-column">
              <span
                className="fw-bold text-dark"
                style={{ fontSize: "24px", lineHeight: "1" }}
              >
                ECOMX
              </span>
              <small
                className="text-muted"
                style={{ fontSize: "10px", marginTop: "-2px" }}
              >
                Shop Everything
              </small>
            </div>
          </BsNavbar.Brand>

          <BsNavbar.Toggle aria-controls="main-navbar" />

          <BsNavbar.Collapse id="main-navbar">
            {/* Search Bar */}
            <Form
              className="d-flex flex-grow-1 mx-3 my-2 my-lg-0"
              style={{ maxWidth: "600px" }}
            >
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Search products, brands and more..."
                  className="border-end-0"
                  style={{ borderRadius: "4px 0 0 4px" }}
                />
                <InputGroup.Text
                  className="bg-primary text-white border-start-0"
                  style={{ borderRadius: "0 4px 4px 0", cursor: "pointer" }}
                >
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
              </InputGroup>
            </Form>

            <Nav className="ms-auto align-items-center">
              {/* Products Link */}
              <Nav.Link
                as={NavLink}
                to="/products"
                className="d-flex align-items-center"
              >
                <i className="bi bi-grid-3x3-gap me-1"></i>
                <span className="d-none d-lg-inline">Products</span>
              </Nav.Link>

              {/* User Role Based Links */}
              {user?.role !== "admin" && (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/feedback"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-chat-left-text me-1"></i>
                    <span className="d-none d-lg-inline">Feedback</span>
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/cart"
                    className="d-flex align-items-center position-relative"
                  >
                    <i className="bi bi-cart3" style={{ fontSize: "20px" }}></i>
                    {totalItems > 0 && (
                      <Badge
                        bg="danger"
                        pill
                        className="position-absolute top-0 start-100 translate-middle"
                        style={{
                          fontSize: "10px",
                          minWidth: "18px",
                          height: "18px",
                        }}
                      >
                        {totalItems}
                      </Badge>
                    )}
                    <span className="d-none d-lg-inline ms-2">Cart</span>
                  </Nav.Link>
                </>
              )}

              {user?.role === "admin" && (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/admin"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-speedometer2 me-1"></i>
                    <span className="d-none d-lg-inline">Dashboard</span>
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/admin/users"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-people me-1"></i>
                    <span className="d-none d-lg-inline">Users</span>
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/admin/products"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-box-seam me-1"></i>
                    <span className="d-none d-lg-inline">Products</span>
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/admin/orders"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-receipt me-1"></i>
                    <span className="d-none d-lg-inline">Orders</span>
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/admin/feedback"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-chat-dots me-1"></i>
                    <span className="d-none d-lg-inline">Feedback</span>
                  </Nav.Link>
                </>
              )}

              {/* User Account */}
              {user ? (
                <>
                  {user.role !== "admin" && (
                    <Nav.Link
                      as={NavLink}
                      to="/orders"
                      className="d-flex align-items-center"
                    >
                      <i className="bi bi-bag-check me-1"></i>
                      <span className="d-none d-lg-inline">Orders</span>
                    </Nav.Link>
                  )}
                  <NavDropdown
                    align="end"
                    title={
                      <span className="d-inline-flex align-items-center">
                        <span
                          className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center me-2"
                          style={{
                            width: "32px",
                            height: "32px",
                            fontSize: "14px",
                          }}
                        >
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                        <span className="d-none d-lg-inline">
                          {user.role === "admin"
                            ? "Admin"
                            : user.name?.split(" ")[0] || "Account"}
                        </span>
                      </span>
                    }
                    id="user-menu"
                  >
                    <NavDropdown.Item
                      as={NavLink}
                      to="/profile"
                      className="d-flex align-items-center"
                    >
                      <i className="bi bi-person me-2"></i>
                      My Profile
                    </NavDropdown.Item>
                    {user.role !== "admin" && (
                      <NavDropdown.Item
                        as={NavLink}
                        to="/orders"
                        className="d-flex align-items-center"
                      >
                        <i className="bi bi-bag-check me-2"></i>
                        My Orders
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={handleLogout}
                      className="d-flex align-items-center text-danger"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    <span className="d-none d-lg-inline">Login</span>
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/register"
                    className="d-flex align-items-center bg-primary text-white rounded px-3"
                    style={{ borderRadius: "4px" }}
                  >
                    <i className="bi bi-person-plus me-1"></i>
                    <span className="d-none d-lg-inline">Sign Up</span>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>
    </>
  );
};

export default Navbar;
