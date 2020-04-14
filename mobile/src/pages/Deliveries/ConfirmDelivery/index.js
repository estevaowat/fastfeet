import React, { useState } from 'react';
import { Alert, View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import {
  Container,
  PendingViewContainer,
  PreviewImage,
  Camera,
  ButtonCamera,
  GenericButton,
} from './styles';

const PendingView = () => (
  <PendingViewContainer>
    <Text>Waiting</Text>
  </PendingViewContainer>
);

export default function ConfirmDelivery({ route, navigation }) {
  const { delivery } = route.params;
  const [previewUrl, setPreviewUrl] = useState('');

  async function takePicture(camera) {
    const { uri } = await camera.takePictureAsync({
      quality: 0.5,
      base64: true,
    });

    setPreviewUrl(uri);
  }

  function resetPreviewUrl() {
    setPreviewUrl('');
  }

  async function handleSendButton() {
    try {
      const formData = new FormData();

      formData.append('file', {
        uri: previewUrl,
        type: 'image/jpeg',
        name: `${previewUrl}`,
      });

      await api.post(
        `/deliveryman/${delivery.deliveryman_id}/deliveries/${delivery.id}/finish`,
        formData
      );

      navigation.navigate('Deliveries');
    } catch (error) {
      console.tron.log(error);
      Alert.alert(
        'Erro ao finalizar entrega',
        'Ocorreu um erro ao finalizar entrega, tente novamente.'
      );
    }
  }

  return (
    <Container>
      {previewUrl ? (
        <>
          <PreviewImage source={{ uri: previewUrl }} />
          <GenericButton onPress={resetPreviewUrl}>
            Tirar outra foto
          </GenericButton>
          <GenericButton onPress={handleSendButton}>Enviar</GenericButton>
        </>
      ) : (
        <Camera
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <ButtonCamera onPress={() => takePicture(camera)}>
                  <Icon name="camera-alt" size={25} color="#FFF" />
                </ButtonCamera>
              </View>
            );
          }}
        </Camera>
      )}
    </Container>
  );
}
