import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import logo from "../assets/CineGoLogo (1).png";
import './appNavBar.css';

export default function AppNavBar() {
  const { user, unsetUser, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    unsetUser();
    setExpanded(false); // collapse navbar
    navigate('/');
  };

  const handleNavClick = () => {
    setExpanded(false); // collapse navbar on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      className="custom-navbar"
      sticky="top"
      onToggle={setExpanded}
    >
      <Container fluid className="px-4">
        {/* Logo on the left */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center brand-logo"
        >
          <img src={logo} alt="CineGo Logo" className="logo-img" />
        </Navbar.Brand>

        {/* Mobile toggle button */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
          className="order-lg-last"
        />

        {/* Navigation links on the right */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {!loading && (
              <>
                {/* Always show Home */}
                <Nav.Link
                  as={NavLink}
                  to="/home"
                  className="mx-2 nav-link-custom"
                  onClick={handleNavClick}
                >
                  Home
                </Nav.Link>

                {/* Show Movies for all except admin */}
                {(!user || !user.isAdmin) && (
                  <Nav.Link
                    as={NavLink}
                    to="/movies"
                    className="mx-2 nav-link-custom"
                    onClick={handleNavClick}
                  >
                    Movies
                  </Nav.Link>
                )}

                {/* Show AdminDashboard for admin users */}
                {user?.isAdmin && (
                  <Nav.Link
                    as={NavLink}
                    to="/admin-dashboard"
                    className="mx-2 nav-link-custom"
                    onClick={handleNavClick}
                  >
                    AdminDashboard
                  </Nav.Link>
                )}

                {/* Show Account if not logged in */}

                {/* Show Logout if logged in */}
                {user && (
                  <Nav.Link
                    onClick={handleLogout}
                    className="mx-2 nav-link-custom"
                  >
                    Logout
                  </Nav.Link>
                )}
                {/* Show Login if not logged in */}
                {!user && (
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    className="mx-2 nav-link-custom"
                    onClick={handleNavClick}
                  >
                    Login
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}