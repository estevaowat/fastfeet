import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  padding: 13px 0 0 15px;
  margin-bottom: 28px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Product = styled.Text`
  margin-left: 10px;
  color: #7d40e7;
  font-weight: bold;
  margin-bottom: 25px;
`;

export const Details = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
  background: #f8f9fd;
  padding: 20px;
`;

export const DetailInfo = styled.View``;

export const Label = styled.Text`
  color: #999;
  font-size: 8px;
  font-weight: bold;
`;

export const DetailDescription = styled.Text`
  color: #444;
  font-size: 12px;
  font-weight: bold;
`;

export const DetailButton = styled(RectButton)``;

export const DetailButtonText = styled.Text`
  color: #7d40e7;
  font-size: 12px;
  font-weight: bold;
`;
