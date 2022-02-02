import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

const MovieModal = () => {
  const showModal = useStoreState((state) => state.modalView.showModal);
  const movieDetails = useStoreState((state) => state.modalView.movieDetails);
  const isFavourite = useStoreState((state) => state.movies.isFavourite);

  const changeVisibility = useStoreActions(
    (actions) => actions.modalView.displayModal
  );

  const checkFavourite = useStoreActions(
    (actions) => actions.movies.checkFavourite
  );

  useEffect(() => {
    checkFavourite(movieDetails.imdbID);
    console.log(`${isFavourite}`);

    return () => {};
  }, [checkFavourite, isFavourite, movieDetails.imdbID]);

  const removeMovie = useStoreActions((actions) => actions.movies.removeMovie);
  const addMovie = useStoreActions((actions) => actions.movies.addMovie);

  const onSubmit = (e) => {
    e.preventDefault();
    // checkFavourite(movieDetails.imdbID);

    isFavourite ? removeMovie(movieDetails) : addMovie(movieDetails);

    checkFavourite(movieDetails.imdbID);

    console.log(`Favourites ${isFavourite}`);
  };

  // console.log(`Adding movie details... ${movieDetails}`);
  return (
    <Modal
      onHide={() => changeVisibility()}
      show={showModal}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">More Info:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {`Movie name: ${movieDetails.Title}`}
          <br />
          {`Year Released: ${movieDetails.Year}`}
          <br />
          {`Type: ${movieDetails.Type}`}
          <br />
          {`IMDB ID: ${movieDetails.imdbID}`}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>{`${
          (isFavourite && `Remove from Favourites`) || `Add to Favourites`
        }`}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
