import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdVisibility,
  MdModeEdit,
  MdDeleteForever
} from 'react-icons/md';
import Modal from '~/components/Modal';
import { Container, ActionList, Action } from './styles';

export default function ActionButtons({
  visualizable,
  modalComponent: ModalComponent,
  onEdit,
  onDelete
}) {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  function handleActionsToggle() {
    return setVisible(!visible);
  }

  function handleModalToggle() {
    setVisible(!visible);
    setIsOpen(!isOpen);
  }

  function handleDelete() {
    setVisible(!visible);
    onDelete();
  }

  return (
    <Container>
      <button type="button" onClick={handleActionsToggle}>
        <MdMoreHoriz size={20} color="#C6C6C6" />
      </button>
      <ActionList visible={visible}>
        {visualizable && (
          <Action onClick={handleModalToggle}>
            <MdVisibility size={20} color="#8E5BE8" /> <span>Visualizar</span>
            <Modal isOpen={isOpen}>
              <ModalComponent />
            </Modal>
          </Action>
        )}
        <Action onClick={onEdit}>
          <MdModeEdit size={20} color="#4D85EE" /> <span>Editar</span>
        </Action>
        <Action onClick={handleDelete}>
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
