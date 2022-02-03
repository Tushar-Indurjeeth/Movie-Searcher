import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import logo from '../components/imdb-logo.png';
import { ButtonGroup, FormContainer } from '../styles/Home.styles';

const Home = () => {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const favourites = useStoreState((state) => state.movies.favourites);

  const switchViewAction = useStoreActions(
    (actions) => actions.cardView.switchView
  );

  const isCardView = useStoreState((state) => state.cardView.isCardView);

  const switchView = (e) => {
    e.preventDefault();
    switchViewAction();
  };

  const viewFavourites = (e) => {
    e.preventDefault();

    navigate(`../favourites`);
  };

  const search = (e) => {
    e.preventDefault();

    let term = searchInputRef.current.value;

    if (!term) return;
    term = term.trim();

    term = term.replaceAll(' ', '%20');

    navigate(`../results/?query=${term}`);
  };

  return (
    <FormContainer>
      <img src={logo} alt="imdb logo" height="220" width="500" />
      <Form className="form">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search for movie"
            ref={searchInputRef}
          />
        </Form.Group>

        <Button hidden type="submit" onClick={search}>
          Search
        </Button>

        <ButtonGroup>
          <Button
            variant="light"
            onClick={viewFavourites}
            disabled={favourites.length < 1}
          >
            View favourites
          </Button>
          <Button variant="light" onClick={switchView}>
            {`${isCardView ? 'Change to List View' : 'Change to Card view'}`}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default Home;
