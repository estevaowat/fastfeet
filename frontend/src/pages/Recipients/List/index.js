import React, { useState, useEffect, useMemo } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import history from '~/services/history';
import api from '~/services/api';
import EmptyList from '~/components/EmptyList';
import Loading from '~/components/Loading';
import ActionButtons from '~/components/ActionButtons';
import Pagination from '~/components/Pagination';
import { Container, Controls, Grid } from './styles';

export default function List() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState({});
  const nextPageDisabled = useMemo(() => {
    return page >= perPage;
  }, [page, perPage]);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('/recipients', {
        params: {
          page,
          query: search
        }
      });

      setPerPage(response.data.count / 20);

      const data = response.data.rows.map(recipient => ({
        ...recipient,
        address_formatted: `${recipient.address}, ${recipient.number} ${
          recipient.address_complement
            ? `, ${recipient.address_complement}`
            : '-'
        }
           ${recipient.city} - ${recipient.state}`
      }));

      setRecipients(data);
    }
    setLoading(true);
    loadRecipients();
    setLoading(false);
  }, [page, search]);

  function handleDelete(id) {
    MySwal.fire({
      title: 'Você tem certeza?',
      text: 'Se você fizer isso não poderá voltar atrás!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then(async result => {
      if (result.value) {
        try {
          await api.delete(`/recipients/${id}`);
          setRecipients(recipients.filter(recipient => recipient.id !== id));

          Swal.fire(
            'Destinatário deletado!',
            'Destinatário deletado com sucesso.',
            'success'
          );
        } catch (error) {
          Swal.fire('Erro!', 'Erro ao deletar destinatário.', 'error');
        }
      }
    });
  }

  return (
    <Container>
      <strong>Gerenciando destinatários</strong>
      <Controls>
        <label htmlFor="search">
          <MdSearch size={20} color="#999" />
          <input
            id="search"
            placeholder="Buscar por destinatários"
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
        </label>

        <button
          type="button"
          onClick={() => history.push('/recipients/create')}
        >
          <MdAdd size={20} color="#fff" /> CADASTRAR
        </button>
      </Controls>
      {loading && <Loading loading={loading} />}
      {recipients.length ? (
        <>
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
              {recipients.map(recipient => (
                <tr key={recipient.id}>
                  <td>#{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>{recipient.address_formatted}</td>
                  <td>
                    <ActionButtons
                      visualizable={false}
                      onEdit={() =>
                        history.push(`/recipients/create/${recipient.id}`)
                      }
                      onDelete={() => handleDelete(recipient.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Grid>
          <Pagination
            onLeftChevron={() => {
              setPage(page - 1);
            }}
            onRightChevron={() => !nextPageDisabled && setPage(page + 1)}
            leftDisabled={page === 1}
            rightDisabled={nextPageDisabled}
          />
        </>
      ) : (
        <EmptyList />
      )}
    </Container>
  );
}
