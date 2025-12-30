import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Badge, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/apiClient";

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", role: "user" });

    const fetchUsers = async () => {
        try {
            const { data } = await api.get("/admin/users");
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
            console.error("Failed to fetch users", error);
            alert("Failed to load users: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                await api.delete(`/admin/users/${id}`);
                setUsers(users.filter((u) => u._id !== id));
            } catch (error) {
                console.error(error);
                alert("Failed to delete user");
            }
        }
    };

    const handleEditClick = (user) => {
        setCurrentUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role });
        setShowEdit(true);
    };

    const handleSave = async () => {
        try {
            const { data } = await api.put(`/admin/users/${currentUser._id}`, formData);
            // Update the user in the local state. 
            // API returns { message, user: { ... } }
            setUsers(users.map((u) => (u._id === currentUser._id ? { ...u, ...data.user } : u)));
            setShowEdit(false);
        } catch (error) {
            console.error(error);
            alert("Failed to update user");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading users...</div>;

    return (
        <>
            <Row className="mb-3 align-items-center">
                <Col>
                    <h2 className="h4">Manage Users</h2>
                    <p className="text-muted small">
                        Total registered users: {users.length}
                    </p>
                </Col>
            </Row>

            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="bg-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Registered</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="small text-muted">{user._id.substring(user._id.length - 6)}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Badge bg={user.role === "admin" ? "danger" : "secondary"}>
                                    {user.role}
                                </Badge>
                            </td>
                            <td className="small">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEditClick(user)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(user._id)}
                                    disabled={user.role === 'admin' && user._id === currentUser?._id} // Prevent self-delete logic if needed, but simplistic for now
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Edit User Modal */}
            <Modal show={showEdit} onHide={() => setShowEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEdit(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminUsersPage;
