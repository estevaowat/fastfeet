import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import history from '~/services/history';
import Input from '~/components/Input';
import AvatarInput from '../AvatarInput';
import { Container, Header, Button } from './styles';

export default function Create() {
  const formRef = useRef(null);

  function handleSubmit(data) {}

  return (
    <Container>
      <Header>
        <strong>Gerenciando entregadores</strong>
        <div>
          <Button
            type="button"
            back
            onClick={() => history.push('/delivery-men')}
          >
            <MdKeyboardArrowLeft size={20} color="#fff" /> VOLTAR
          </Button>
          <Button type="submit" form="form-delivery-men">
            <MdDone size={20} color="#fff" /> SALVAR
          </Button>
        </div>
      </Header>
      <Form ref={formRef} onSubmit={handleSubmit} id="delivery-men">
        <AvatarInput />
        <Input name="name" label="Nome" placeholder="Nome completo" />
        <Input name="email" label="E-mail" placeholder="Seu e-mail" />
      </Form>
    </Container>
  );
}
