import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  padding: ${Platform.OS === 'ios' ? '78px 20px 20px' : '88px 20px 20px'};
  position: relative;
  padding: 0 20px;
`;

export const ProblemInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  multiline: true,
  numberOfLines: 10,
})`
  margin: 40px 20px 0;
  padding: 20px;
  height: 350px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  elevation: 3;
  color: #444;
  font-size: 16px;
`;

export const InformButton = styled(Button)`
  margin: 15px 20px 0px;
  background: #7d40e7;
`;
