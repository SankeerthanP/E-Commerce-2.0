import { Card } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext.jsx";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card className="shadow-sm" style={{ maxWidth: 480 }}>
      <Card.Body>
        <Card.Title className="h5 mb-3">Profile</Card.Title>
        <div className="mb-2">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-2">
          <strong>Role:</strong> {user.role}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProfilePage;




