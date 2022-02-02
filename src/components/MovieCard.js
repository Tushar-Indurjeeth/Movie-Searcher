import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { useStoreActions } from 'easy-peasy';

const MovieCard = ({ movie }) => {
  const changeVisibility = useStoreActions(
    (actions) => actions.modalView.displayModal
  );

  const addMovieDetails = useStoreActions(
    (actions) => actions.modalView.addMovieDetails
  );

  const showDetails = () => {
    changeVisibility();
    addMovieDetails({ ...movie });
  };

  return (
    <Container>
      <Card bg="dark" text="light" onClick={() => showDetails()}>
        <Card.Img variant="top" src={movie.Poster} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{`Type: ${movie.Type} Year: ${movie.Year}`}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieCard;

const Container = styled.div`
  padding: 1rem;
  cursor: pointer;

  .card {
    transition: 300ms;

    :hover {
      transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
      transform: scale(1.05);
      transition-duration: 200ms;
      z-index: 50;
    }
  }

  @media (min-width: 768px) {
    .card-img-top {
      width: 100%;
      height: 30vw;
      object-fit: cover;
    }
  }
`;
