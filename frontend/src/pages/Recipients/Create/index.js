import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form } from '@unform/web';
import api from '~/services/api';
import history from '~/services/history';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';
import { Container, Header, Button } from './styles';

export default function Create({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get(`/recipients/${id}`);

      formRef.current.setData(response.data);
    }
    loadRecipient();
  }, [id]);

  async function handleSubmit(data, { reset }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        address: Yup.string().required('Endereço é obrigatório'),
        number: Yup.string().required('Número é obrigatório'),
        address_complement: Yup.string(),
        city: Yup.string().required('Cidade é obrigatória'),
        state: Yup.string().required('Estado é obrigatório'),
        zip_code: Yup.string().required('CEP é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });
      if (id) {
        await api.put(`/recipients/${id}`, data);
      } else {
        await api.post('/recipients', data);
        reset();
      }

      toast.success('Destinatário salvo com sucesso');
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
        <strong>Gerenciando destinatários</strong>
        <div>
          <Button
            type="button"
            back
            onClick={() => history.push('/recipients')}
          >
            <MdKeyboardArrowLeft size={20} color="#fff" /> VOLTAR
          </Button>
          <Button type="submit" form="form-recipients">
            <MdDone size={20} color="#fff" /> SALVAR
          </Button>
        </div>
      </Header>
      <Form ref={formRef} onSubmit={handleSubmit} id="form-recipients">
        <Input name="name" label="Nome" placeholder="Ludwig van Beethoven" />
        <div>
          <Input name="address" label="Rua" placeholder="Rua Beethoven" />
          <Input
            name="number"
            label="Número"
            placeholder="Número"
            width={150}
          />
          <Input name="address_complement" label="Complemento" width={140} />
        </div>
        <div>
          <Input name="city" label="Cidade" placeholder="Diadema" />
          <Input name="state" label="Estado" placeholder="São Paulo" />
          <InputMask
            name="zip_code"
            mask="99999-999"
            label="CEP"
            placeholder="09960-580"
          />
        </div>
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
