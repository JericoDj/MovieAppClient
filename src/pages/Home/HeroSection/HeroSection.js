// src/components/HeroSection/HeroSection.js
import React from "react";
import { Carousel } from "react-bootstrap";
import "./HeroSection.css";

const HeroSection = () => {
  const movies = [
    {
      id: 1,
      title: "Top Gun: Maverick",
      year: 2022,
      rating: 8.4,
      description:
        "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs.",
      image:
        "https://thumbnails.cbsig.net/CBS_Production_Entertainment_VMS/2022/10/26/2091444291941/TGMAV_SAlone_16_9_1920x1080_1781067_1920x1080.jpg",
    },
    {
      id: 2,
      title: "Dune: Part Two",
      year: 2023,
      rating: 8.8,
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*SvqveyU-E2RAHPwHykl5YQ.jpeg",
    },
    {
      id: 3,
      title: "Avatar: The Way of Water",
      year: 2022,
      rating: 7.6,
      description:
        "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
      image:
        "https://lumiere-a.akamaihd.net/v1/images/avatar-twow-videobg01_cdd3dcb8.jpeg?region=0,0,1920,1080&width=768",
    },
  ];

  return (
    <div className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="tagline">
              <span>PREMIUM MOVIE STREAMING</span>
            </div>
            <h1>Watch Movies Anytime, Anywhere</h1>
            <p className="lead">
              Stream the latest blockbusters and timeless classics. Your movie
              journey begins here.
            </p>

            <div className="features">
              <div className="feature">
                <div className="feature-icon"></div>
                <div className="feature-text">
                  <h4>Unlimited Access</h4>
                  <p>Stream thousands of movies 24/7</p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon"></div>
                <div className="feature-text">
                  <h4>Premium Content</h4>
                  <p>Exclusive movies and TV shows</p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon"></div>
                <div className="feature-text">
                  <h4>No Ads, Ever</h4>
                  <p>Enjoy uninterrupted viewing</p>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <button className="cta-button">Get Started</button>

              <div className="download-apps">
                <p>DOWNLOAD ON</p>
                <div className="app-badges">
                  <div className="app-badge">
                    <div className="badge-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                      </svg>
                    </div>
                    <div className="badge-text">
                      <span>Download on the</span>
                      <strong>App Store</strong>
                    </div>
                  </div>

                  <div className="app-badge">
                    <div className="badge-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                      </svg>
                    </div>
                    <div className="badge-text">
                      <span>GET IT ON</span>
                      <strong>Google Play</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-carousel">
            <Carousel fade interval={5000} controls={true} indicators={true}>
              {movies.map((movie) => (
                <Carousel.Item key={movie.id}>
                  <div
                    className="movie-slide"
                    style={{ backgroundImage: `url(${movie.image})` }}
                  >
                    <div className="movie-overlay"></div>
                    <div className="movie-info">
                      <div className="movie-rating">{movie.rating}/10</div>
                      <h3>{movie.title}</h3>
                      <p>{movie.description}</p>
                      <div className="movie-year">{movie.year}</div>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
