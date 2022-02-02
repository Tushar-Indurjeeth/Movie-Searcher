import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import logo from './imdb-logo.png';

const Header = () => {
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

    // console.log('Card view: ' + isCardView);
  };

  const viewFavourites = (e) => {
    e.preventDefault();

    navigate(`../favourites`);
  };

  const search = (e) => {
    e.preventDefault();

    const term = searchInputRef.current.value;

    if (!term) return;

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
            {`${isCardView ? 'Change to Card View' : 'Change to List view'}`}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    padding-bottom: 1rem;
    object-fit: contain;
  }

  .form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1.5rem;
  }

  .form-control {
    width: 60%;
    height: 3rem;
    margin-left: auto;
    margin-right: auto;

    border-width: 1px;
    border-radius: 9999px;
    border-color: #9e9e9e;

    outline: 0;
    -webkit-appearance: none;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;

    :focus {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 0.5rem;

  @media (min-width: 640px) {
    margin-top: 0.1rem;

    flex-direction: row;
    margin-left: 1rem;
  }

  .btn-light {
    padding: 0.75rem;
    border-radius: 0.375rem;
    --ring-color: #e5e7eb;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #1f2937;

    :hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    :focus {
      outline: 0;
      -webkit-appearance: none;
    }

    :active {
      --ring-color: #d1d5db;
    }

    :disabled {
      cursor: not-allowed !important;
    }
  }
`;

export default Header;
