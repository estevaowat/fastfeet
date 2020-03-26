import styled from 'styled-components/native';

export const Container = styled.View``;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 13px 20px 0 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const Problem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
  margin-bottom: 16px;
  border-radius: 4px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #999;
  max-width: 250px;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;
