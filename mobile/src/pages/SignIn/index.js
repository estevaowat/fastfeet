import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Background from '~/components/Background';
import { Container, Image, Form, FormInput, SubmitButton } from './styles';
import logo from '~/assets/fastfeet-logo.png';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit() {
    setLoading(true);

    dispatch(signInRequest(id));

    setLoading(false);
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            keyboardType="email-address"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
