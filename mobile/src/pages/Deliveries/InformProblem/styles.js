import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  margin: 0 20px 0 30px;
`;

export const ProblemInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  multiline: true,
  numberOfLines: 10,
})`
  padding: 20px;
  height: 300px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  elevation: 3;
  color: #444;
  font-size: 16px;
`;

export const InformButton = styled(Button)`
  margin-top: 15px;
  background: #7d40e7;
`;
