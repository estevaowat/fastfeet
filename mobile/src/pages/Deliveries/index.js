import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
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
  PendentButton,
  PendentText,
  DeliveredButton,
  DeliveredText,
  DeliveriesList,
} from './styles';

export default function Deliveries() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    setDeliveries([
      {
        id: 1,
        product: 'Carregador Iphone 8',
        createdAt: new Date(),
        city: 'Rio Sul',
      },
      {
        id: 2,
        product: 'Carregador Iphone 8',
        createdAt: new Date(),
        city: 'Rio Sul',
      },
    ]);
  }, []);

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
            <PendentButton>
              <PendentText>Pendentes</PendentText>
            </PendentButton>
            <DeliveredButton>
              <DeliveredText>Entregue</DeliveredText>
            </DeliveredButton>
          </Buttons>
        </Controls>

        <DeliveriesList
          data={deliveries}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <DeliveryItem data={item} />}
        />
      </Container>
    </Background>
  );
}
