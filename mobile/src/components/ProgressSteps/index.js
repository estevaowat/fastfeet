import React from 'react';
import PropTypes from 'prop-types';
import StepIndicatorRN from 'react-native-step-indicator';

import { Container } from './styles';

export default function ProgressSteps({ data, labels }) {
  const customStyles = {
    stepIndicatorSize: 9,
    currentStepIndicatorSize: 9,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 1,
    stepStrokeCurrentColor: '#7D40E7',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#7D40E7',
    stepStrokeUnFinishedColor: '#7D40E7',
    separatorFinishedColor: '#7D40E7',
    separatorUnFinishedColor: '#7D40E7',
    stepIndicatorFinishedColor: '#7D40E7',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#7D40E7',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#7D40E7',
    stepIndicatorLabelFinishedColor: '#7D40E7',
    stepIndicatorLabelUnFinishedColor: '#fff',
    labelColor: '#999999',
    labelSize: 8,
    currentStepLabelColor: '#999',
  };

  return (
    <Container>
      <StepIndicatorRN
        currentPosition={data.position}
        customStyles={customStyles}
        labels={labels}
        stepCount={labels.length}
      />
    </Container>
  );
}

ProgressSteps.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  labels: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
