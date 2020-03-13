import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

import { Container } from './styles';

export default function Loading({ loading }) {
  return (
    <Container>
      <FadeLoader size={150} color="#7D40E7" loading={loading} />
    </Container>
  );
}
