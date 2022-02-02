import { Container } from 'react-bootstrap';
import Movies from '../components/Movies';
import NavigationBar from '../components/NavigationBar';

const Favourites = () => {
  return (
    <Container fluid>
      <h1>Results Page</h1>
      <NavigationBar />
      <Movies query={null} />
    </Container>
  );
};

export default Favourites;
