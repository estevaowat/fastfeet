import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '~/components/Input';
import { Container } from './styles';
import logo from '~/assets/fastfeet-logo.png';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  async function handleSubmit({ email, password }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('E-mail é inválido')
          .required('E-mail é obrigatório'),
        password: Yup.string().required('Senha é obrigatória')
      });

      await schema.validate(
        { email, password },
        {
          abortEarly: false
        }
      );

      dispatch(signInRequest(email, password));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Container>
      <img src={logo} alt="Logo FastFeet" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          label="SEU E-MAIL"
          placeholder="exemplo@email.com"
          type="email"
        />
        <Input
          name="password"
          label="SUA SENHA"
          placeholder="*********"
          type="password"
        />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </Container>
  );
}
