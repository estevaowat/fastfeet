import React from 'react';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';
import { Container, Controls, Grid } from './styles';

export default function List() {
  return (
    <Container>
      <strong>Gerenciando destinatários</strong>
      <Controls>
        <input placeholder="Buscar por destinatário" />
        <button type="button">
          <MdAdd size={20} color="#fff" /> CADASTRAR
        </button>
      </Controls>
      <Grid>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Ludwig van Beethoven</td>
            <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
            <td>
              <button type="button">
                <MdMoreHoriz size={20} color="#C6C6C6" />
              </button>
            </td>
          </tr>
          <tr>
            <td>#01</td>
            <td>Ludwig van Beethoven</td>
            <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
            <td>
              <button type="button">
                <MdMoreHoriz size={20} color="#C6C6C6" />
              </button>
            </td>
          </tr>
          <tr>
            <td>#01</td>
            <td>Ludwig van Beethoven</td>
            <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
            <td>
              <button type="button">
                <MdMoreHoriz size={20} color="#C6C6C6" />
              </button>
            </td>
          </tr>
          <tr>
            <td>#01</td>
            <td>Ludwig van Beethoven</td>
            <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
            <td>
              <button type="button">
                <MdMoreHoriz size={20} color="#C6C6C6" />
              </button>
            </td>
          </tr>
        </tbody>
      </Grid>
    </Container>
  );
}
