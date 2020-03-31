import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import HeaderBackground from '~/components/HeaderBackground';
import {
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
  DeliveryButton,
  Separator,
  DeliveryButtonText,
} from './styles';

export default function DeliveryDetails({ navigation, route }) {
  const { delivery } = route.params;
  return (
    <Background color="#fff">
      <Container>
        <HeaderBackground />
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
                    {delivery.start_date_formatted
                      ? delivery.start_date_formatted
                      : '--/--/--'}
                  </InfoDescriptionText>
                </InfoDescription>
              </Dates>
              <Dates>
                <InfoTitle>
                  <InfoTitleText>DATA DE ENTREGA</InfoTitleText>
                </InfoTitle>
                <InfoDescription>
                  <InfoDescriptionText>
                    {delivery.end_date_formatted
                      ? delivery.end_date_formatted
                      : '--/--/--'}
                  </InfoDescriptionText>
                </InfoDescription>
              </Dates>
            </DateContainer>
          </InfoContent>
        </Status>
        <Controls>
          <DeliveryButton
            onPress={() => navigation.navigate('InformProblem', { delivery })}
          >
            <Icon name="remove-circle-outline" size={20} color="#E74040" />
            <DeliveryButtonText>Informar problema</DeliveryButtonText>
          </DeliveryButton>
          <Separator />
          <DeliveryButton
            onPress={() => navigation.navigate('Problems', { delivery })}
          >
            <Icon name="error-outline" size={20} color="#E7BA40" />
            <DeliveryButtonText>Visualizar problemas</DeliveryButtonText>
          </DeliveryButton>
          <Separator />
          <DeliveryButton
            onPress={() => navigation.navigate('ConfirmDelivery', { delivery })}
          >
            <Icon name="check-circle" size={20} color="#7D40E7" />
            <DeliveryButtonText>Confirmar entrega</DeliveryButtonText>
          </DeliveryButton>
        </Controls>
      </Container>
    </Background>
  );
}

DeliveryDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
