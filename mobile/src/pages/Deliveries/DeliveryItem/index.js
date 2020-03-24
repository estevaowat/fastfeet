import React from 'react';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressSteps from '~/components/ProgressSteps';
import {
  Container,
  Header,
  Product,
  Details,
  DetailInfo,
  Label,
  DetailDescription,
  DetailButton,
  DetailButtonText,
} from './styles';

export default function DeliveryItem({ data, navigation }) {
  return (
    <Container>
      <Header>
        <Icon name="local-shipping" size={18} color="#7D40E7" />
        <Product>{data.product}</Product>
      </Header>
      <ProgressSteps
        data={data}
        labels={['Aguardando retirada', 'Retirada', 'Entregue']}
      />
      <Details>
        <DetailInfo>
          <Label>Data</Label>
          <DetailDescription>{data.createdAt_formatted} </DetailDescription>
        </DetailInfo>
        <DetailInfo>
          <Label>Cidade</Label>
          <DetailDescription>{data.recipient.city}</DetailDescription>
        </DetailInfo>
        <DetailButton
          onPress={() =>
            navigation.navigate('DeliveryDetails', { delivery: data })
          }
        >
          <DetailButtonText>Ver detalhes</DetailButtonText>
        </DetailButton>
      </Details>
    </Container>
  );
}

DeliveryItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
