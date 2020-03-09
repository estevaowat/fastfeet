import React, { useRef } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form } from '@unform/web';
import api from '~/services/api';
import history from '~/services/history';
import Input from '~/components/Input';
import AsyncSelect from '~/components/AsyncSelect';
import { Container, Header, Button } from './styles';

export default function Create({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  function handleSubmit(data, { reset }) {}
  return (
    <Container>
      <Header>
        <strong>Cadastro de encomendas</strong>
        <div>
          <Button
            type="button"
            back
            onClick={() => history.push('/deliveries')}
          >
            <MdKeyboardArrowLeft size={20} color="#fff" /> VOLTAR
          </Button>
          <Button type="submit" form="form-recipients">
            <MdDone size={20} color="#fff" /> SALVAR
          </Button>
        </div>
      </Header>
      <Form ref={formRef} onSubmit={handleSubmit} id="form-recipients">
        <div>
          <AsyncSelect
            name="recipient"
            label="Destinatário"
            placeholder="Ludwig van Beethoven"
          />
          <AsyncSelect
            name="deliveryman"
            label="Entregador"
            placeholder="John Doe"
          />
        </div>
        <Input
          name="product"
          label="Nome do produto"
          placeholder="Yamaha SX7"
        />
      </Form>
    </Container>
  );
}
