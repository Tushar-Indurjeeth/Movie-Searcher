import { Image } from 'react-bootstrap';
import notFoundImg from './notfound.png';

const NoResults = () => {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '85vh' }}>
      <div>
        <div />
        <Image fluid src={notFoundImg} />
      </div>
    </center>
  );
};

export default NoResults;
