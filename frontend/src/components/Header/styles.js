import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  padding: 0 30px;
  background: #fff;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 64px;
  max-width: 900px;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 26px;
      width: 135px;

      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid #979797;
    }

    a {
      font-weight: bold;
      color: #999;
      padding: 0 15px;
    }

    a.active {
      color: #444;
      font-weight: bold;
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    strong {
      color: #666;
    }

    button {
      margin-top: 5px;
      border: 0;
      background: transparent;
      color: #de3b3b;

      &:hover {
        color: ${lighten(0.3, '#de3b3b')};
      }
    }
  }
`;
