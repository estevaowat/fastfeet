import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Background({ children, color }) {
  return <Container color={color}>{children}</Container>;
}

Background.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
