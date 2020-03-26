import React, { useEffect, useState } from 'react';

import { format, parseISO } from 'date-fns';
import api from '~/services/api';
import {
  Container,
  ProblemsList,
  Title,
  Problem,
  Description,
  Date,
} from './styles';

export default function Problems({ route }) {
  const { delivery } = route.params;

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`delivery/${delivery.id}/problems`);
      const data = response.data.map(item => ({
        ...item,
        createdAt_formatted: format(parseISO(item.createdAt), 'dd/MM/yyyy'),
      }));
      setProblems(data);
    }

    loadProblems();
  }, [delivery.id]);

  return (
    <Container>
      <Title>{delivery.product}</Title>

      <ProblemsList
        data={problems}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Problem>
            <Description>{item.description}</Description>
            <Date>{item.createdAt_formatted}</Date>
          </Problem>
        )}
      />
    </Container>
  );
}
