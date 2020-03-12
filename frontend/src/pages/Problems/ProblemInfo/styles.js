import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  p {
    font-size: 16px;
    text-align: justify;
    color: #666;
    line-height: 26px;
  }
`;
