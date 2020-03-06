import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 23px;

  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }

    img {
      width: 150px;
      height: 120px;
      border-radius: 50%;
      border: 3px dashed #ddd;
    }
    input {
      display: none;
    }
  }
`;

export const AddPhoto = styled.div`
  background: ${props => props.backgroundColor};
  border: 3px dashed #ddd;
  border-radius: 50%;
  color: #ddd;
  width: 150px;
  height: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
