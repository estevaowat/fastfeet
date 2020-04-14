import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Button from '~/components/Button';

export const PendingViewContainer = styled.View`
  flex: 1;
  background-color: lightgreen;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 20px;
`;

export const PreviewImage = styled.Image`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const ButtonCamera = styled(TouchableOpacity)`
  background-color: rgba(0, 0, 0, 0.3);
  height: 61px;
  width: 61px;
  border-radius: 30.5px;
  padding: 15px 20px;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const GenericButton = styled(Button)`
  margin-top: 15px;
  background: #7d40e7;
`;
