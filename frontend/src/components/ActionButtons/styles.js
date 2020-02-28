import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  button {
    border: 0;
    display: flex;
    justify-content: flex-end;
  }
`;

export const ActionList = styled.ul`
  position: absolute;
  width: 150px;
  left: calc(50% - 75px);
  top: calc(100% + 20px);
  background: #fff;
  border-radius: 4px;
  padding: 20px 15px;
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 1;

  &::before {
    position: absolute;
    left: calc(50% - 9px);
    top: -7px;
    width: 0;
    height: 0;

    content: '';
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 9px solid #fff;
  }
`;

export const Action = styled.li`
  display: flex;
  align-items: center;

  cursor: pointer;

  & + li {
    padding-top: 15px;
    margin-top: 15px;
    border-top: 1px solid #eeeeee;
  }

  svg {
    margin-right: 15px;
  }

  span {
    font-size: 16px;
    color: #999;
  }
`;
