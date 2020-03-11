import React from 'react';
import ReactModal from 'react-modal';
import { Container } from './styles';

const customStyles = {
  content: {
    right: 'auto',
    bottom: 'auto'
  }
};

export default function Modal({ children, isOpen }) {
  return (
    <Container>
      <ReactModal isOpen={isOpen} style={customStyles}>
        {children}
      </ReactModal>
    </Container>
  );
}
