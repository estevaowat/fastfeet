import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import Background from '~/components/Background';
import DeliveryItem from './DeliveryItem';
import {
  Container,
  Header,
  Info,
  Image,
  Welcome,
  WelcomeText,
  Name,
  LogoutButton,
  Controls,
  Title,
  Buttons,
  FilterButton,
  FilterText,
  DeliveriesList,
} from './styles';

export default function Deliveries({ navigation }) {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState('PENDENTES');

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(`deliveryman/1/deliveries`, {
        delivered: filter === 'ENTREGUES',
      });

      const data = response.data.map(delivery => ({
        ...delivery,
        createdAt_formatted: format(parseISO(delivery.createdAt), 'dd/MM/yyyy'),
        status: displayStatus(delivery),
        address_formatted: `${delivery.recipient.address}, ${
          delivery.recipient.number
        }${
          delivery.recipient.address_complement
            ? `, ${delivery.recipient.address_complement}`
            : '-'
        } ${delivery.recipient.city} - ${delivery.recipient.state} - ${
          delivery.recipient.zip_code
        }`,
      }));

      setDeliveries(data);
    }

    loadDeliveries();
  }, [filter]);

  function displayStatus(delivery) {
    if (delivery.canceled) {
      return 'Cancelada';
    }

    if (delivery.delivered) {
      return 'ENTREGUE';
    }

    if (delivery.pending) {
      return 'PENDENTE';
    }

    if (delivery.available) {
      return 'AGUARDANDO RETIRADA';
    }
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Background color="#fff">
      <Container>
        <Header>
          <Info>
            <Image
              source={{
                uri: 'https://api.adorable.io/avatars/136/abott@adorable.png',
              }}
            />
            <Welcome>
              <WelcomeText>Bem-vindx de volta,</WelcomeText>
              <Name>{profile.name}</Name>
            </Welcome>
          </Info>

          <LogoutButton onPress={handleSignOut}>
            <Icon name="input" size={18} color="#E74040" />
          </LogoutButton>
        </Header>
        <Controls>
          <Title>Entregas</Title>
          <Buttons>
            <FilterButton onPress={() => setFilter('PENDENTES')}>
              <FilterText active={filter === 'PENDENTES'}>Pendentes</FilterText>
            </FilterButton>
            <FilterButton onPress={() => setFilter('ENTREGUES')}>
              <FilterText active={filter === 'ENTREGUES'}>Entregue</FilterText>
            </FilterButton>
          </Buttons>
        </Controls>

        <DeliveriesList
          data={deliveries}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <DeliveryItem data={item} navigation={navigation} />
          )}
        />
      </Container>
    </Background>
  );
}
