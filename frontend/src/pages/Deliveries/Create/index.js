import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import api from '~/services/api';
import history from '~/services/history';
import Input from '~/components/Input';
import AsyncSelect from '~/components/AsyncSelect';
import { Container, Header, Button } from './styles';

export default function Create({ match }) {
  const { id } = match.params;

  const formRef = useRef(null);

  useEffect(() => {
    async function loadDelivery() {
      const { data } = await api.get(`deliveries/${id}`);

      formRef.current.setData(data);

      formRef.current.setFieldValue('deliveryman_id', {
        value: data.delivery_man.id,
        label: data.delivery_man.name
      });

      formRef.current.setFieldValue('recipient_id', {
        value: data.recipient.id,
        label: data.recipient.name
      });
    }

    loadDelivery();
  }, [id]);

  async function loadRecipients() {
    const response = await api.get('recipients', {
      params: {
        all: true
      }
    });

    return response.data.map(recipient => ({
      label: recipient.name,
      value: recipient.id
    }));
  }

  async function loadDeliveryMen() {
    const response = await api.get('deliveryman', {
      params: {
        all: true
      }
    });

    return response.data.map(deliveryMan => ({
      label: deliveryMan.name,
      value: deliveryMan.id
    }));
  }

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.string().required('Destinatário é obrigatório'),
        deliveryman_id: Yup.string().required('Entregador é obrigatório'),
        product: Yup.string().required('Produto é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      if (id) {
        await api.put(`deliveries/${id}`, data);
      } else {
        await api.post('deliveries', data);
        reset();
      }

      toast.success('Encomenda salva com sucesso');
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Erro ao salvar encomenda');
      }
    }
  }
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
            name="recipient_id"
            label="Destinatário"
            placeholder="Ludwig van Beethoven"
            loadOptions={loadRecipients}
          />
          <AsyncSelect
            name="deliveryman_id"
            label="Entregador"
            placeholder="John Doe"
            loadOptions={loadDeliveryMen}
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
