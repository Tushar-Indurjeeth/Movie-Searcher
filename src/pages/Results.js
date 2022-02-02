import { Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Movies from '../components/Movies';
import NavigationBar from '../components/NavigationBar';

const Results = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('query');

  return (
    <Container fluid>
      <h1>Results Page</h1>
      <NavigationBar />
      <Movies query={searchQuery} />
    </Container>
  );
};

export default Results;
