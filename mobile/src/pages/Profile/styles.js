import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  min-width: 136px;
  min-height: 136px;
  border-radius: 68px;
  margin-bottom: 20px;
`;

export const Info = styled.View`
  align-self: stretch;

  margin: 20px 36px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Description = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const SignOutButton = styled(Button)`
  margin-top: 15px;
  background: #e74040;
`;
