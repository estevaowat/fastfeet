import styled from 'styled-components';
import { lighten } from 'polished';

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

  label {
    display: flex;
    background: #fff;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 4px;

    input {
      border: 0;
      height: 36px;
      padding-right: 45px;
      color: #444;
      width: 100%;
    }

    svg {
      color: #999;
      margin: 0 15px 0 8px;
    }
  }

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

    &:hover {
      background: ${lighten(0.2, '#7d40e7')};
    }

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

    th:last-child {
      text-align: center;
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
