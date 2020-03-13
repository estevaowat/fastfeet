import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  button {
    border: 0;
    display: flex;
    justify-content: flex-end;
    z-index: 0;
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
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);

  &::before {
    position: absolute;
    left: calc(50% - 9px);
    top: -7px;
    width: 0;
    height: 0;
    background: #fff;
    content: '';

    border-width: 0 7px 9px 7px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;

    box-shadow: 0px 0px 6px rgba (0, 0, 0, 0.1);
  }
`;

export const Action = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  cursor: pointer;

  & + li {
    padding-top: 15px;
    margin-top: 15px;
    border-top: 1px solid #eee;
  }

  svg {
    margin-right: 15px;
  }

  span {
    font-size: 16px;
    color: #999;
  }
`;
