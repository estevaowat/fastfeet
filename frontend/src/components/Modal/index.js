import React from 'react';
import ReactModal from 'react-modal';
import { Container } from './styles';

export default function Modal({ children, isOpen }) {
  return (
    <Container>
      <ReactModal isOpen={isOpen}>{children}</ReactModal>
    </Container>
  );
}
