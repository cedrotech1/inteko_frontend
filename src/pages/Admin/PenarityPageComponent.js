import { useEffect, useState } from "react";
import { Card, Container, Spinner, Badge, Alert, Row, Col } from "react-bootstrap";
import { ExclamationCircleFill, CheckCircleFill, ExclamationTriangleFill, Calendar2EventFill } from "react-bootstrap-icons";

const FinesList = () => {
  const [penalties, setPenalties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPenalties = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/penalties/mypenarities", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        });
        const result = await response.json();
        if (Array.isArray(result) && result.length > 0) {
          setPenalties(result);
        } else {
          setError("No fines found.");
        }
      } catch (error) {
        setError("Failed to fetch fines.");
      } finally {
        setLoading(false);
      }
    };

    fetchPenalties();
  }, []);

  if (loading) return <div className="text-center mt-4"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="text-center mt-4">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">🚨 My Fines</h1>
      <Row>
        {penalties.map((penalty) => (
          <Col md={6} lg={4} key={penalty.id} className="mb-4">
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title>Penarity on post <hr/>
               
                  </Card.Title>
                 
               
                <p className="text-muted">
                {penalty.post.title} post On:{" "}
                  {new Date(penalty.post.createdAt).toLocaleDateString()}
                
                <p/>
                  <strong>Status:</strong>{" "}
                  <Badge bg={penalty.status === "offered" ? "warning" : "success"}>
                    {penalty.status}
                  </Badge>
                </p>

                {/* Date Fine Was Offered */}
                <p className="text-muted">
                  <Calendar2EventFill className="me-1" /> Offered On:{" "}
                  {new Date(penalty.createdAt).toLocaleDateString()}
                </p>

                {/* Penalty Information */}
                {penalty.status === "offered" ? (
                  <>
                    <p className="text-danger fw-bold">
                      <ExclamationCircleFill className="me-1" /> Fine: {penalty.penarity} (Pending)
                    </p>
                    <Alert variant="warning">
                      <ExclamationTriangleFill className="me-1" /> You must go to the village to report about this fine.
                    </Alert>
                  </>
                ) : (
                  <>
                    <p className="text-success fw-bold">
                      <CheckCircleFill className="me-1" /> Fine {penalty.penarity} Paid!
                    </p>
                    <Alert variant="success">
                      <CheckCircleFill className="me-1" /> Congratulations! Your penalty has been resolved.
                    </Alert>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FinesList;
