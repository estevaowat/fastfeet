import styled from 'styled-components';

export const Container = styled.div`
  margin: 35px auto;
  padding: 0 120px;

  strong {
    font-size: 24px;
    font-weight: bold;
    color: #444;
  }
`;

export const Controls = styled.div`
  margin-top: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 4px;
    background: #7d40e7;
    color: #fff;
    font-weight: bold;
    height: 36px;
    padding: 0 15px;

    svg {
      margin-right: 6px;
    }
  }
`;

export const Grid = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;
  border-radius: 4px;
  thead {
    font-size: 16px;
    font-weight: bold;
    text-align: left;

    th {
      padding: 20px 15px 0;
    }
  }

  tbody {
    background: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    color: #666;

    tr {
      margin: 0 0 20px;

      td {
        border: none;
        padding: 18px 0 18px 15px;
        border-radius: 4px;
      }
    }
  }
`;
