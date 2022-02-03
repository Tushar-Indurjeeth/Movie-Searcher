import { Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { CardContainer, ListContainer } from '../styles/MovieCard.styles';

const MovieCard = ({ movie }) => {
  const isCardView = useStoreState((state) => state.cardView.isCardView);

  const changeVisibility = useStoreActions(
    (actions) => actions.modalView.displayModal
  );

  const addMovieDetails = useStoreActions(
    (actions) => actions.modalView.addMovieDetails
  );

  const showDetails = () => {
    addMovieDetails(movie);
    changeVisibility();
  };

  return isCardView ? (
    <CardContainer key={`${movie.imdbID}C`}>
      <Card border="light" bg="dark" text="light" onClick={showDetails}>
        <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{`Type: ${movie.Type}`}</Card.Text>
          <Card.Text>{`Year Released: ${movie.Year}`}</Card.Text>
        </Card.Body>
      </Card>
    </CardContainer>
  ) : (
    <ListContainer key={`${movie.imdbID}L`} onClick={showDetails}>
      <div className="movie-img">
        <Image fluid rounded src={movie.Poster} alt={movie.Title} />
      </div>

      <div className="movie-info">
        <h2>{movie.Title}</h2>
        {`Type: ${movie.Type}`}
        <br />
        {`Year Released: ${movie.Year}`}
      </div>
    </ListContainer>
  );
};

export default MovieCard;
