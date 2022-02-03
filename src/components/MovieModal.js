import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

const MovieModal = () => {
  const showModal = useStoreState((state) => state.modalView.showModal);
  const movieCardDetails = useStoreState(
    (state) => state.modalView.movieDetails
  );
  const isFavourite = useStoreState((state) => state.movies.isFavourite);

  const [movieDetails, setMovieDetails] = useState({});

  const changeVisibility = useStoreActions(
    (actions) => actions.modalView.displayModal
  );

  const checkFavourite = useStoreActions(
    (actions) => actions.movies.checkFavourite
  );

  useEffect(() => {
    checkFavourite(movieCardDetails.imdbID);
  }, [checkFavourite, movieCardDetails.imdbID]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        await fetch(
          `https://movie-database-imdb-alternative.p.rapidapi.com/?i=${movieCardDetails.imdbID}&r=json`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
              'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
            },
            signal: abortController.signal,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setMovieDetails(data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [movieCardDetails.imdbID]);

  const removeMovie = useStoreActions((actions) => actions.movies.removeMovie);
  const addMovie = useStoreActions((actions) => actions.movies.addMovie);

  const onSubmit = (e) => {
    e.preventDefault();

    isFavourite ? removeMovie(movieCardDetails) : addMovie(movieCardDetails);

    checkFavourite(movieCardDetails.imdbID);
  };

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
        {Object.entries(movieDetails).map(([key, value]) => (
          <div key={key}>
            {key !== 'Ratings' ? (
              <StyledParagraph key={key}>
                <b>{`${key}: `}</b>
                {value}
              </StyledParagraph>
            ) : (
              <>
                {value.map((item) => (
                  <StyledParagraph key={item.Source}>
                    <b>{`${item.Source}: `}</b>
                    {item.Value}
                  </StyledParagraph>
                ))}
              </>
            )}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={`${(isFavourite && 'danger') || 'primary'}`}
          onClick={onSubmit}
        >{`${
          (isFavourite && 'Remove from Favourites') || 'Add to Favourites'
        }`}</Button>
      </Modal.Footer>
    </Modal>
  );
};

const StyledParagraph = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default MovieModal;
