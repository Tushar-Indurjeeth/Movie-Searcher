import { Container } from 'react-bootstrap';
import Movies from '../components/Movies';
import NavigationBar from '../components/NavigationBar';

const Favourites = () => {
  return (
    <Container fluid>
      <NavigationBar />
      <Movies query={null} />
    </Container>
  );
};

export default Favourites;
