import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
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

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleForgotPassword(e) {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        setIsLoading(true);
        try {
            // Replace with your actual forgot password API endpoint
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to send reset email.");
            }
            setMessage("Password reset instructions have been sent to your email.");
        } catch (err) {
            setError(err.message || "Something went wrong.");
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
                            <CardTitle className="mb-0">Forgot Password</CardTitle>
                        </CardHeader>
                        <CardBody>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleForgotPassword}>
                                <Form.Group className="mb-3" controlId="forgotPasswordEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                                    {isLoading ? <Spinner animation="border" size="sm" /> : "Send Reset Link"}
                                </Button>
                            </Form>
                            <div className="d-flex justify-content-between mt-3">
                                <Link to="/login">Back to Login</Link>
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}