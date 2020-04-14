import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Background from '~/components/Background';
import HeaderBackground from '~/components/HeaderBackground';
import {
  Container,
  ProblemsList,
  Title,
  Problem,
  Description,
  Date,
  EmptyList,
  EmptyListText,
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
    <Background color="#fff">
      <Container>
        <HeaderBackground />
        <Title>{delivery.product}</Title>

        {problems.length ? (
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
        ) : (
          <EmptyList>
            <Icon name="sentiment-very-satisfied" size={36} color="#444" />
            <EmptyListText>Nenhum problema encontrado</EmptyListText>
          </EmptyList>
        )}
      </Container>
    </Background>
  );
}

Problems.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        id: PropTypes.number.isRequired,
        product: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
};
