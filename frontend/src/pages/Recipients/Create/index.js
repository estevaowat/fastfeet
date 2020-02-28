import React from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form } from '@unform/web';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';
import { Container, Header, Controls } from './styles';

export default function Create() {
  return (
    <Container>
      <Header>
        <strong>Gerenciando destinatários</strong>
        <Controls>
          <button type="button">
            <MdKeyboardArrowLeft size={20} color="#fff" /> VOLTAR
          </button>
          <button type="button">
            <MdDone size={20} color="#fff" /> SALVAR
          </button>
        </Controls>
      </Header>
      <Form>
        <Input name="name" label="Nome" placeholder="Ludwig van Beethoven" />
        <Input name="address" label="Rua" placeholder="Rua Beethoven" />
        <Input name="number" label="Número" placeholder="Número" />
        <Input name="address_complement" label="Complemento" />
        <Input name="city" label="Cidade" placeholder="Diadema" />
        <Input name="state" label="Estado" placeholder="São Paulo" />
        <InputMask name="zipcode" label="CEP" placeholder="09960-580" />
      </Form>
    </Container>
  );
}
