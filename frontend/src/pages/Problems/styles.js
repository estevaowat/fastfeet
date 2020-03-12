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

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
    }
  }
`;
