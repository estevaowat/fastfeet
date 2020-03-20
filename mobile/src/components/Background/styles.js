import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${props => (props.color ? props.color : '#7d40e7')};
`;
