import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdVisibility,
  MdModeEdit,
  MdDeleteForever
} from 'react-icons/md';
import { Container, ActionList, Action } from './styles';

export default function ActionButtons({ visualizable, onEdit, onDelete }) {
  const [visible, setVisible] = useState(false);

  function handleActionsToggle() {
    return setVisible(!visible);
  }

  return (
    <Container>
      <button type="button" onClick={handleActionsToggle}>
        <MdMoreHoriz size={20} color="#C6C6C6" />
      </button>
      <ActionList visible={visible}>
        {visualizable && (
          <Action>
            <MdVisibility size={20} color="#8E5BE8" /> <span>Visualizar</span>
          </Action>
        )}
        <Action onClick={onEdit}>
          <MdModeEdit size={20} color="#4D85EE" /> <span>Editar</span>
        </Action>
        <Action onClick={onDelete}>
          <MdDeleteForever size={20} color="#DE3B3B" /> <span>Deletar</span>
        </Action>
      </ActionList>
    </Container>
  );
}

ActionButtons.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  visualizable: PropTypes.bool
};

ActionButtons.defaultProps = {
  visualizable: false
};
