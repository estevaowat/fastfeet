import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  padding: ${Platform.OS === 'ios' ? '78px 20px 20px' : '88px 20px 20px'};
  position: relative;
`;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 12px 20px 0 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin-top: 26px;
`;

export const Problem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
  margin-bottom: 16px;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  elevation: 3;
`;

export const Description = styled.Text.attrs({
  ellipsizeMode: 'tail',
})`
  font-size: 16px;
  line-height: 21px;
  color: #999;
  max-width: 215px;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;
