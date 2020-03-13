import React from 'react';
import { MdSentimentNeutral } from 'react-icons/md';
import { Container } from './styles';

export default function EmptyList() {
  return (
    <Container>
      <MdSentimentNeutral size={120} color="#7D40E7" />
      Nenhum registro encontrado
    </Container>
  );
}
