import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "react-bootstrap";

const fitnessInfo = [
  {
    title: "Personalized Plans",
    subtitle: "Tailored to your goals",
    text: "Create custom workout routines that adapt to your fitness level and objectives.",
    icon: "💪",
  },
  {
    title: "Progress Tracking",
    subtitle: "Visual growth",
    text: "Track your workouts, monitor improvements, and stay motivated with visual progress.",
    icon: "📈",
  },
  {
    title: "Nutrition Guidance",
    subtitle: "Eat smart",
    text: "Get meal suggestions and tips that support your workouts and overall wellness.",
    icon: "🥗",
  },
];

export default function FitnessInformation() {
  return (
    <section className="py-5 bg-light">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Why Choose Gain Plan?</h2>
        <p className="text-muted">We offer tools to transform your fitness journey.</p>
      </div>
      <Row className="g-4 justify-content-center px-3">
        {fitnessInfo.map((info, index) => (
          <Col xs={12} md={6} lg={4} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <Card className="shadow h-100 border-0 rounded-4">
              <CardBody className="text-center">
                <div style={{ fontSize: "2.5rem" }}>{info.icon}</div>
                <CardTitle className="fw-bold mt-3">{info.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">{info.subtitle}</CardSubtitle>
                <CardText className="mt-2">{info.text}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
