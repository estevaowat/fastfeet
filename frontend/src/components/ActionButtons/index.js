import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdVisibility,
  MdModeEdit,
  MdDeleteForever
} from 'react-icons/md';
import Modal from 'react-modal';
import { Container, ActionList, Action } from './styles';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-215px',
    marginLeft: '-225px',
    background: '#fff',
    width: '450px',
    height: '430px',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '25px'
  }
};
export default function ActionButtons({
  visualizable,
  modalComponent: ModalBody,
  onEdit,
  onDelete,
  editable,
  labelDelete
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
            <Modal id="modal" isOpen={isOpen} style={customStyles}>
              <ModalBody />
            </Modal>
          </Action>
        )}
        {editable && (
          <Action onClick={onEdit}>
            <MdModeEdit size={20} color="#4D85EE" /> <span>Editar</span>
          </Action>
        )}
        <Action onClick={handleDelete}>
          <MdDeleteForever size={20} color="#DE3B3B" />
          <span>{labelDelete || 'Deletar'} </span>
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
