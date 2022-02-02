import { dummyData } from './dummyData';
import MovieCard from './MovieCard';
import { Col, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const Movies = ({ query }) => {
  const location = useLocation();
  const favourites = useStoreState((state) => state.movies.favourites);

  //   const [movies, setMovies] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       await fetch(
  //         `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${query}&page=1&r=json`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
  //             'x-rapidapi-key':
  //               'xx9c5252b19dmsh81d3921adf10497p17b6b8jsna4b140248f85',
  //           },
  //         }
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setMovies(data.Search);
  //         });
  //     };
  //     fetchData();

  //     return () => {};
  //   }, [movies, query]);

  return (
    <div>
      <Row xs={1} md={3} lg={4} className="g-4">
        {query
          ? // {movies.map((movie) => (
            dummyData.Search.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/results/?query=${query}`}
                state={{ backgroundLocation: location }}
              >
                <Col>
                  <MovieCard movie={movie} />
                </Col>
              </Link>
            ))
          : favourites.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/favourites`}
                state={{ backgroundLocation: location }}
              >
                <Col>
                  <MovieCard movie={movie} />
                </Col>
              </Link>
            ))}
      </Row>
    </div>
  );
};

export default Movies;
