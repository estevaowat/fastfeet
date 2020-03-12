import React from 'react';

import { Container } from './styles';

export default function ProblemInfo({ description }) {
  return (
    <Container>
      <strong>Visualizar problema</strong>
      <p>{description}</p>
    </Container>
  );
}
