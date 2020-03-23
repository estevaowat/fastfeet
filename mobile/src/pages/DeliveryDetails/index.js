import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Background,
  Container,
  Info,
  Header,
  HeaderText,
  InfoContent,
  InfoTitle,
  InfoTitleText,
  InfoDescription,
  InfoDescriptionText,
  DateContainer,
  Status,
  Dates,
  Controls,
} from './styles';

export default function DeliveryDetails({ route }) {
  const { delivery } = route.params;
  console.tron.log(delivery);
  return (
    <Background>
      <Container>
        <Info>
          <Header>
            <Icon name="local-shipping" size={20} color="#7D40E7" />
            <HeaderText>Informações da entrega</HeaderText>
          </Header>

          <InfoContent>
            <InfoTitle>
              <InfoTitleText>DESTINATÁRIO</InfoTitleText>
            </InfoTitle>
            <InfoDescription>
              <InfoDescriptionText>
                {delivery.recipient.name}
              </InfoDescriptionText>
            </InfoDescription>
            <InfoTitle>
              <InfoTitleText>ENDEREÇO DE ENTREGA</InfoTitleText>
            </InfoTitle>
            <InfoDescription>
              <InfoDescriptionText>
                {delivery.address_formatted}
              </InfoDescriptionText>
            </InfoDescription>
            <InfoTitle>
              <InfoTitleText>PRODUTO</InfoTitleText>
            </InfoTitle>
            <InfoDescription>
              <InfoDescriptionText> {delivery.product}</InfoDescriptionText>
            </InfoDescription>
          </InfoContent>
        </Info>

        <Status>
          <Header>
            <Icon name="local-shipping" size={20} color="#7D40E7" />
            <HeaderText>Situação da entrega</HeaderText>
          </Header>
          <InfoContent>
            <InfoTitle>
              <InfoTitleText>STATUS</InfoTitleText>
            </InfoTitle>
            <InfoDescription>
              <InfoDescriptionText>{delivery.status}</InfoDescriptionText>
            </InfoDescription>
            <DateContainer>
              <Dates>
                <InfoTitle>
                  <InfoTitleText>DATA DE RETIRADA</InfoTitleText>
                </InfoTitle>
                <InfoDescription>
                  <InfoDescriptionText>
                    {delivery.start_date ? delivery.start_date : '--/--/--'}
                  </InfoDescriptionText>
                </InfoDescription>
              </Dates>
              <Dates>
                <InfoTitle>
                  <InfoTitleText>DATA DE ENTREGA</InfoTitleText>
                </InfoTitle>
                <InfoDescription>
                  <InfoDescriptionText>
                    {delivery.end_date ? delivery.end_date : '--/--/--'}
                  </InfoDescriptionText>
                </InfoDescription>
              </Dates>
            </DateContainer>
          </InfoContent>
        </Status>
        <Controls />
      </Container>
    </Background>
  );
}
