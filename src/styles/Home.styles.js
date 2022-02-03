import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const FormContainer = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    padding-bottom: 1rem;
    object-fit: contain;
  }

  .form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1.5rem;
  }

  .form-control {
    width:80%
    height: 3rem;
    margin-left: auto;
    margin-right: auto;

    border-width: 1px;
    border-radius: 9999px;
    border-color: #9e9e9e;

    outline: 0;
    -webkit-appearance: none;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;

    :focus {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    @media (min-width: 1024px) {
      width: 50%;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 0.5rem;

  @media (min-width: 640px) {
    margin-top: 0.1rem;

    flex-direction: row;
    margin-left: 1rem;
  }

  .btn-light {
    padding: 0.75rem;
    border-radius: 0.375rem;
    --ring-color: #e5e7eb;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #1f2937;

    :hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    :focus {
      outline: 0;
      -webkit-appearance: none;
    }

    :active {
      --ring-color: #d1d5db;
    }

    :disabled {
      cursor: not-allowed !important;
    }
  }
`;

export { ButtonGroup, FormContainer };
