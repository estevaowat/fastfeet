import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '~/assets/fastfeet-logo.png';
import { Container, Content } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo fastfeet" />
          <NavLink to="/deliveries" activeClassName="active">
            ENCOMENDAS{' '}
          </NavLink>
          <NavLink to="/delivery-men">ENTREGADORES</NavLink>
          <NavLink to="/recipients">DESTINATÁRIOS</NavLink>
          <NavLink to="/problems">PROBLEMAS</NavLink>
        </nav>

        <aside>
          <strong>Admin FastFeet</strong>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
