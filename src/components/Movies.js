import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import styled from 'styled-components';

import Loading from '../components/Loading';
import NoResults from './NoResults';

const Movies = ({ query }) => {
  const location = useLocation();
  const favourites = useStoreState((state) => state.movies.favourites);
  const isCardView = useStoreState((state) => state.cardView.isCardView);

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        await fetch(
          `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${query}&page=1&r=json`,
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
            setMovies(data.Search);
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // console.log('Fetching data');

    return () => {
      abortController.abort();
    };
  }, [query]);

  if (isLoading) return <Loading />;
  if (typeof movies === 'undefined' && !isLoading) return <NoResults />;

  return isCardView ? (
    <Row xs={1} md={3} lg={4} className="g-4">
      {query
        ? movies?.map((movie) => (
            <StyledLink
              key={movie.imdbID}
              to={`/results/?query=${query}`}
              state={{ backgroundLocation: location }}
            >
              <Col>
                <MovieCard movie={movie} />
              </Col>
            </StyledLink>
          ))
        : favourites?.map((movie) => (
            <StyledLink
              key={movie.imdbID}
              to={`/favourites`}
              state={{ backgroundLocation: location }}
            >
              <Col>
                <MovieCard movie={movie} />
              </Col>
            </StyledLink>
          ))}
    </Row>
  ) : (
    <Container>
      {query
        ? movies?.map((movie) => (
            // dummyData.Search.map((movie) => (
            <StyledLink
              key={movie.imdbID}
              to={`/results/?query=${query}`}
              state={{ backgroundLocation: location }}
            >
              <Row>
                <MovieCard movie={movie} />
              </Row>
            </StyledLink>
          ))
        : favourites?.map((movie) => (
            <StyledLink
              key={movie.imdbID}
              to={`/favourites`}
              state={{ backgroundLocation: location }}
            >
              <Row>
                <MovieCard movie={movie} />
              </Row>
            </StyledLink>
          ))}
    </Container>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default Movies;
