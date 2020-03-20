import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import {
  Container,
  Image,
  Info,
  Title,
  Description,
  SignOutButton,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  console.tron.log(profile);

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Image
        source={{
          uri: profile.avatar
            ? profile.avatar.url
            : `https://api.adorable.io/avatars/136/${profile.name}.png`,
        }}
      />
      <Info>
        <Title>Nome completo</Title>
        <Description>{profile.name}</Description>
        <Title>E-mail</Title>
        <Description>{profile.email}</Description>
        <Title>Data de cadastro</Title>
        <Description>{profile.createdAt_formatted}</Description>

        <SignOutButton onPress={handleSignOut}> Logout </SignOutButton>
      </Info>
    </Container>
  );
}
