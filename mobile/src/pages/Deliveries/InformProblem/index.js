import React, { useState } from 'react';
import { Alert } from 'react-native';
import api from '~/services/api';
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
    <Container>
      <ProblemInput
        onChangeText={text => setDescription(text)}
        placeholder="Inclua aqui o problema que aconteceu na entrega"
        value={description}
      />
      <InformButton onPress={handleInformProblem}> Enviar </InformButton>
    </Container>
  );
}
