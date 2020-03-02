import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  background: transparent;
  border: 0;
  margin-right: 50px;

  svg {
    color: ${props => (props.disabled ? '#999' : '#666')};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;
