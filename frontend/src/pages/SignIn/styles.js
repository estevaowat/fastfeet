import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 315px;
  background: #fff;
  border-radius: 4px;
  padding: 40px 30px;

  form {
    margin-top: 15px;
    display: flex;
    flex-direction: column;

    label {
      font-weight: bold;
      margin-bottom: 5px;
      color: #444;
      margin-top: 15px;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #444;
    }

    button {
      margin-top: 15px;
      background: #7d40e7;
      border-radius: 4px;
      color: #fff;
      height: 45px;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;
