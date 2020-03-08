import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';

import history from '~/services/history';
import api from '~/services/api';
import Input from '~/components/Input';
import AvatarInput from '../AvatarInput';
import { Container, Header, Button } from './styles';

export default function Create({ match }) {
  const formRef = useRef(null);
  const { id } = match.params;
  const [deliveryMan, setDeliveryMan] = useState({});

  useEffect(() => {
    async function loadDeliveryMen() {
      const response = await api.get(`/deliveryman/${id}`);

      formRef.current.setData(response.data);
      setDeliveryMan(response.data);
    }
    loadDeliveryMen();
  }, [id]);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .email('E-mail precisa ser válido')
          .required('E-mail é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      if (id) {
        await api.put(`/deliveryman/${id}`, data);
        toast.success('Alteração feita com sucesso.');
      } else {
        await api.post(`/deliveryman`, data);
        toast.success('Entregador salvo com sucesso.');
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Erro ao salvar dados');
      }
    }
  }

  return (
    <Container>
      <Header>
        <strong>Cadastro de entregadores</strong>
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
      <Form ref={formRef} onSubmit={handleSubmit} id="form-delivery-men">
        <AvatarInput
          name="avatar_id"
          image={deliveryMan.avatar && deliveryMan.avatar.url}
        />
        <Input name="name" label="Nome" placeholder="Nome completo" />
        <Input name="email" label="E-mail" placeholder="Seu e-mail" />
      </Form>
    </Container>
  );
}

Create.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

Create.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null
    })
  })
};
