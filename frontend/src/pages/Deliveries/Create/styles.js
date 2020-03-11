import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 35px auto;
  padding: 0 120px;

  form {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    margin-top: 20px;
    padding: 10px 30px 20px 30px;
    background: #fff;

    label {
      font-weight: bold;
      display: block;
      margin-top: 10px;
      padding-bottom: 9px;
    }

    span {
      margin-top: 5px;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      font-size: 16px;
      margin: 0 15px 0 0;
      padding: 0 15px;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  strong {
    font-size: 24px;
    font-weight: bold;
    color: #444;
  }

  div {
    display: flex;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  margin-left: 15px;
  border-radius: 4px;
  background: ${props => (props.back ? '#CCC' : '#7d40e7')};
  color: #fff;
  font-weight: bold;
  height: 36px;
  max-height: 36px;
  padding: 0 15px;

  &:hover {
    background: ${props => darken(0.2, props.back ? '#CCC' : '#7d40e7')};
  }

  svg {
    margin-right: 6px;
  }
`;
