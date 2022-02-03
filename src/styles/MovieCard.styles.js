import styled from 'styled-components';

export const CardContainer = styled.div`
  padding: 1rem;
  cursor: pointer;

  .card {
    transition: 300ms;

    :hover {
      transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
      transform: scale(1.05);
      transition-duration: 200ms;
      z-index: 50;
    }
  }

  .card-text {
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    .card-img-top {
      width: 100%;
      height: 30vw;
      object-fit: cover;
    }
  }
`;

export const ListContainer = styled.div`
  display: flex;
  cursor: pointer;
  padding: 1rem;
  color: #000000;

  .movie-info {
    padding-left: 1rem;
  }

  .movie-img {
    display: none;
  }

  img {
    max-height: 483px;
    max-width: 280px;
    object-fit: cover;
  }

  @media (min-width: 640px) {
    .movie-img {
      display: flex;
    }
  }
`;
