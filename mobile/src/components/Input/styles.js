import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 4px;
  padding: 0 15px;
  height: 45px;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 16px;
  margin-left: 15px;
  color: #444;
`;
