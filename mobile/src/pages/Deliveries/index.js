import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    function displayStatus(delivery) {
      if (delivery.canceled) {
        return 'CANCELADA';
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
      return '';
    }

    function getCurrentPosition(delivery) {
      if (delivery.canceled) {
        return 0;
      }

      if (delivery.delivered) {
        return 2;
      }

      if (delivery.pending) {
        return 1;
      }

      if (delivery.available) {
        return 0;
      }
      return 0;
    }

    async function loadDeliveries() {
      const response = await api.get(
        `deliveryman/${profile.id}/deliveries/${filter}`
      );

      const data = response.data.map(delivery => ({
        ...delivery,
        createdAt_formatted: format(parseISO(delivery.createdAt), 'dd/MM/yyyy'),
        start_date_formatted: delivery.start_date
          ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
          : delivery.start_date,
        end_date_formatted: delivery.end_date
          ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
          : null,

        status: displayStatus(delivery),
        position: getCurrentPosition(delivery),
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
  }, [filter, profile.id]);

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
                uri: profile.avatar
                  ? profile.avatar.url
                  : 'https://api.adorable.io/avatars/136/abott@adorable.png',
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
            <FilterButton onPress={() => setFilter('pending')}>
              <FilterText active={filter === 'pending'}>Pendentes</FilterText>
            </FilterButton>
            <FilterButton onPress={() => setFilter('delivered')}>
              <FilterText active={filter === 'delivered'}>Entregue</FilterText>
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

Deliveries.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
