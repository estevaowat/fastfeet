import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, Button } from './styles';

export default function Pagination({
  onLeftChevron,
  onRightChevron,
  leftDisabled,
  rightDisabled
}) {
  return (
    <Container>
      <Button type="button" onClick={onLeftChevron} disabled={leftDisabled}>
        <MdChevronLeft size={32} />
      </Button>

      <Button type="button" onClick={MdChevronRight} disabled={rightDisabled}>
        <MdChevronRight onClick={onRightChevron} size={32} />
      </Button>
    </Container>
  );
}

Pagination.propTypes = {
  onLeftChevron: PropTypes.func.isRequired,
  onRightChevron: PropTypes.func.isRequired,
  leftDisabled: PropTypes.bool,
  rightDisabled: PropTypes.bool
};

Pagination.defaultProps = {
  leftDisabled: true,
  rightDisabled: false
};
