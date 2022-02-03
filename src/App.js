import 'bootstrap/dist/css/bootstrap.min.css';
import { useStoreRehydrated } from 'easy-peasy';
import { Container } from 'react-bootstrap';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Loading from './components/Loading';
import MovieModal from './components/MovieModal';
import Favourites from './pages/Favourites';
import Home from './pages/Home';
import Results from './pages/Results';

function App() {
  const isRehydrated = useStoreRehydrated();
  const location = useLocation();
  const state = location.state;

  return isRehydrated ? (
    <AppContainer>
      <Routes location={state?.backgroundLocation || location}>
        <Route exact path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />

        <Route path="/:query" element={<Results />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/:query" element={<MovieModal />} />
          <Route path="/favourites" element={<MovieModal />} />
        </Routes>
      )}
    </AppContainer>
  ) : (
    <Loading />
  );
}

const AppContainer = styled(Container)`
  background-color: #f8f8ff; ;
`;

export default App;
