import { useStoreActions, useStoreState } from 'easy-peasy';
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

  const switchViewAction = useStoreActions(
    (actions) => actions.cardView.switchView
  );

  const isCardView = useStoreState((state) => state.cardView.isCardView);

  const search = (e) => {
    e.preventDefault();

    let term = searchInputRef.current.value;

    if (!term) return;
    term = term.trim();

    term = term.replaceAll(' ', '%20');

    navigate(`../results/?query=${term}`);
  };

  const switchView = (e) => {
    e.preventDefault();
    switchViewAction();
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ marginTop: '1.5rem' }}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
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
            <Nav>
              <Nav.Link as={Button} variant="link" onClick={switchView}>
                {`${
                  isCardView ? 'Change to List View' : 'Change to Card view'
                }`}
              </Nav.Link>
            </Nav>
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
