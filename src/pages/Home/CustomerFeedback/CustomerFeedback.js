import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Sophia R.",
    feedback: "Gain Plan changed my life. The workouts are effective and easy to follow!",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Mark T.",
    feedback: "I’ve lost 10kg in 3 months. This app keeps me on track and motivated.",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    name: "Emily J.",
    feedback: "The nutrition tips helped me build a sustainable lifestyle. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?img=24",
  },
];

export default function CustomerFeedback() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">What Our Users Say</h2>
          <p className="text-muted">Real stories from people on their fitness journey.</p>
        </div>

        <Row className="g-4 justify-content-center">
          {testimonials.map((item, index) => (
            <Col xs={12} md={6} lg={4} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <Card className="h-100 shadow-sm border-0 rounded-4 text-center p-3">
                <Card.Img
                  variant="top"
                  src={item.avatar}
                  alt={item.name}
                  className="rounded-circle mx-auto"
                  style={{ width: "80px", height: "80px", objectFit: "cover", marginTop: "10px" }}
                />
                <Card.Body>
                  <Card.Text className="fst-italic text-muted">"{item.feedback}"</Card.Text>
                  <Card.Title className="mt-3">{item.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <Link to="/feedback">
            <Button variant="outline-primary" size="lg">
              Add Your Feedback
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
