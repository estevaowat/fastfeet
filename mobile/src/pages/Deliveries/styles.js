import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  margin: 0 20px 0 30px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
  margin-right: 15px;
`;

export const Welcome = styled.View``;
export const WelcomeText = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const LogoutButton = styled(RectButton)``;

export const Controls = styled.View`
  margin-top: 22px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;
export const Buttons = styled.View`
  flex-direction: row;
`;
export const FilterButton = styled(RectButton)`
  margin: 0 7px;
`;
export const FilterText = styled.Text`
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  color: ${props => (props.active ? '#7d40e7' : '#999')};

  ${props =>
    props.active &&
    css`
      text-decoration: underline;
    `}
`;

export const DeliveriesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
  border-radius: 4px;
`;
