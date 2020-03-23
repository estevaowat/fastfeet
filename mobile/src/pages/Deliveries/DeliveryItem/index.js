import React from 'react';
import PropTypes from 'prop-types';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  const labels = ['Aguardando Retirada', 'Retirada', 'Entregue'];

  const customStyles = {
    stepIndicatorSize: 9,
    currentStepIndicatorSize: 9,
    separatorStrokeWidth: 1,
    stepStrokeCurrentColor: '#7D40E7',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#7D40E7',
    stepStrokeUnFinishedColor: '#fff',
    separatorFinishedColor: '#7D40E7',
    separatorUnFinishedColor: '#7D40E7',
    stepIndicatorFinishedColor: '#7D40E7',
    stepIndicatorUnFinishedColor: '#7D40E7',
    stepIndicatorCurrentColor: '#7D40E7',
    stepIndicatorLabelFontSize: 9,
    currentStepIndicatorLabelFontSize: 9,
    stepIndicatorLabelCurrentColor: '#7D40E7',
    stepIndicatorLabelFinishedColor: '#7D40E7',
    stepIndicatorLabelUnFinishedColor: '#7D40E7',
    labelColor: '#999',
    labelSize: 8,
    currentStepLabelColor: '#999',
  };

  return (
    <Container>
      <Header>
        <Icon name="local-shipping" size={18} color="#7D40E7" />
        <Product>{data.product}</Product>
      </Header>
      <StepIndicator
        labels={labels}
        customStyles={customStyles}
        stepCount={3}
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