import React from 'react';
import { MdAdd } from 'react-icons/md';
import history from '~/services/history';
import ActionButtons from '~/components/ActionButtons';
import { Container, Controls, Grid } from './styles';

export default function List() {
  function handleDelete() {
    console.log('Open confirmation to delete');
  }

  return (
    <Container>
      <strong>Gerenciando destinatários</strong>
      <Controls>
        <input placeholder="Buscar por destinatário" />
        <button
          type="button"
          onClick={() => history.push('/recipients/create')}
        >
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
              <ActionButtons
                visualizable={false}
                onEdit={() => history.push('/recipients/create/123')}
                onDelete={() => handleDelete()}
              />
            </td>
          </tr>
          <tr>
            <td>#01</td>
            <td>Ludwig van Beethoven</td>
            <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
            <td>
              <ActionButtons
                visualizable={false}
                onEdit={() => history.push('/recipients/create/123')}
                onDelete={() => handleDelete()}
              />
            </td>
          </tr>
          <tr>
            <td>#01</td>
            <td>Ludwig van Beethoven</td>
            <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
            <td>
              <ActionButtons
                visualizable={false}
                onEdit={() => history.push('/recipients/create/123')}
                onDelete={() => handleDelete()}
              />
            </td>
          </tr>
          <tr>
            <td>#01</td>
            <td>Ludwig van Beethoven</td>
            <td>Rua Beethoven, 1729, Diadema - São Paulo</td>
            <td>
              <ActionButtons
                visualizable={false}
                onEdit={() => history.push('/recipients/create/123')}
                onDelete={() => handleDelete()}
              />
            </td>
          </tr>
        </tbody>
      </Grid>
    </Container>
  );
}
