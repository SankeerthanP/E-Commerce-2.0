import { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import api from "../../services/apiClient.js";

const AdminFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/feedback");
        setFeedbacks(res.data);
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
      <h2 className="h4 mb-3">User feedback</h2>
      <Table bordered size="sm" responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((f) => (
            <tr key={f._id}>
              <td>{new Date(f.createdAt).toLocaleString()}</td>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminFeedbackPage;




