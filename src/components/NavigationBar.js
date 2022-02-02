import { useStoreState } from 'easy-peasy';
import { useRef } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const favourites = useStoreState((state) => state.movies.favourites);

  const search = (e) => {
    e.preventDefault();

    const term = searchInputRef.current.value;

    if (!term) return;

    navigate(`../results/?query=${term}`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              disabled={favourites.length < 1}
              to="/favourites"
            >
              Favourites
            </Nav.Link>
            <Nav.Link href="#">Card view</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={searchInputRef}
            />
            <Button variant="outline-success" type="submit" onClick={search}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
