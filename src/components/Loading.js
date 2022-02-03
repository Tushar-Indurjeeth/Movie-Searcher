import { Circle } from 'better-react-spinkit';

const Loading = () => {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '85vh' }}>
      <div>
        <div />
        <Circle color="#130705" size={60} />
      </div>
    </center>
  );
};

export default Loading;
