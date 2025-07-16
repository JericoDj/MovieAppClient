import React, { useState, useContext } from "react";
import { UserContext, userData } from "../../context/UserContext";
import {
    Row,
    Col,
    Container,
    Form,
    Button,
    Alert,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Spinner,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { login, getUserDetails } = useContext(UserContext);



    async function handleSubmit(e) {
  e.preventDefault();

  if (!email || !password) {
    setError("Please enter both email and password.");
    return;
  }

  setError("");
  setIsLoading(true);

  try {
    const { token, user } = await login(email, password); // ✅ login and fetch user

    console.log("Login success:", { token, user });

    // Optional: you can decide where to go based on role
    if (user.isAdmin) {
      navigate("/adminDashboard");
    } else {
      navigate("/home");
    }

  } catch (err) {
    setError(err?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
}


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="mb-0">Login</CardTitle>
                        </CardHeader>
                        <CardBody>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                                    {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
                                </Button>
                            </Form>
                          <div className="d-flex justify-content-between mt-3">
  <Link to="/register" className="login-link">Register</Link>
  <Link to="/forgot-password" className="login-link">Forgot Password?</Link>
</div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
