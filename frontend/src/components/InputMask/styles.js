import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.width ? `${props.width}px` : `100%`)};
`;
