import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import logo from '~/assets/fastfeet-logo.png';
import Input from '~/components/Input';
import { Container } from './styles';

export default function SignIn() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .min(6)
          .required()
      });

      await schema.validate(data, {
        abortEarly: false
      });
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
          id="email"
          placeholder="exemplo@email.com"
          type="email"
        />
        <Input name="password" placeholder="*************" type="password" />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </Container>
  );
}
