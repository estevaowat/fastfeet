import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Background = styled.View`
  background: #7d40e7;
  height: 155px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  top: 34px;
  overflow: visible;
`;

export const Info = styled.View`
  flex-direction: column;
  background: #fff;
  border: 1px solid #999;
  border-radius: 4px;
  padding: 15px;
  margin: 0 20px 5px 20px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const HeaderText = styled.Text`
  margin-left: 5px;
  color: #7d40e7;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const InfoContent = styled.View``;

export const InfoTitle = styled.View`
  flex-direction: column;
`;

export const InfoTitleText = styled.Text`
  color: #999;
  font-weight: bold;
  line-height: 26px;
`;

export const InfoDescription = styled.View``;

export const InfoDescriptionText = styled.Text`
  color: #666;
  line-height: 26px;
`;

export const Dates = styled.View`
  flex-direction: column;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Status = styled.View`
  flex-direction: column;
  background: #fff;
  padding: 15px;
  border: 1px solid #999;
  border-radius: 4px;
  margin: 0 20px 5px 20px;
`;

export const Controls = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background: #f8f9fd;
  border-radius: 4px;
  height: 83px;
  margin: 0 20px 0 20px;
`;

export const DeliveryButton = styled(RectButton)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  height: 83px;
`;

export const Separator = styled.View`
  border-left-width: 1px;
  border-left-color: rgba(0, 0, 0, 0.1);
  height: 83px;
`;

export const DeliveryButtonText = styled.Text`
  margin-top: 2px;
  font-size: 12px;
  max-width: 60px;
  color: #999;
`;
