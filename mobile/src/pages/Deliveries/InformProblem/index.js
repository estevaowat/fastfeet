import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import api from '~/services/api';
import Background from '~/components/Background';
import HeaderBackground from '~/components/HeaderBackground';
import { Container, ProblemInput, InformButton } from './styles';

export default function InformProblem({ route }) {
  const { delivery } = route.params;

  const [description, setDescription] = useState('');

  async function handleInformProblem() {
    console.tron.log(description);
    try {
      await api.post(`delivery/${delivery.id}/problems`, {
        description,
      });

      setDescription('');

      Alert.alert(
        'Problema enviado com sucesso',
        'Problema informado com sucesso'
      );
    } catch (error) {
      Alert.alert('Falha ao informar problema', 'Informe o problema novamente');
    }
  }

  return (
    <Background color="#fff">
      <Container>
        <HeaderBackground />
        <ProblemInput
          onChangeText={text => setDescription(text)}
          placeholder="Inclua aqui o problema que aconteceu na entrega"
          value={description}
        />
        <InformButton onPress={handleInformProblem}> Enviar </InformButton>
      </Container>
    </Background>
  );
}

InformProblem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    }).isRequired,
  }).isRequired,
};
