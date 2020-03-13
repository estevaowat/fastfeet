import React, { useState, useEffect, useMemo } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import history from '~/services/history';
import api from '~/services/api';
import ActionButtons from '~/components/ActionButtons';
import EmptyList from '~/components/EmptyList';
import Loading from '~/components/Loading';
import Pagination from '~/components/Pagination';
import { Container, Controls, Grid } from './styles';

export default function List() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [perPage, setPerPage] = useState({});
  const nextPageDisabled = useMemo(() => {
    return page >= perPage;
  }, [page, perPage]);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function loadDeliveryMen() {
      const response = await api.get('/deliveryman', {
        params: {
          page,
          query: search
        }
      });

      setPerPage(response.data.count / 20);
      setDeliveryMen(response.data.rows);
    }
    setLoading(true);
    loadDeliveryMen();
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
          await api.delete(`/deliveryman/${id}`);
          setDeliveryMen(
            deliveryMen.filter(deliveryMan => deliveryMan.id !== id)
          );

          Swal.fire(
            'Entregador deletado!',
            'Entregador deletado com sucesso.',
            'success'
          );
        } catch (error) {
          Swal.fire('Erro!', 'Erro ao deletar entregador.', 'error');
        }
      }
    });
  }

  return (
    <Container>
      <strong>Gerenciando entregadores</strong>
      <Controls>
        <label htmlFor="search">
          <MdSearch size={20} color="#999" />
          <input
            id="search"
            placeholder="Buscar por entregadores"
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
        </label>

        <button
          type="button"
          onClick={() => history.push('/delivery-men/create')}
        >
          <MdAdd size={20} color="#fff" /> CADASTRAR
        </button>
      </Controls>
      {loading && <Loading loading={loading} />}
      {deliveryMen.length ? (
        <>
          <Grid>
            <thead>
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliveryMen.map(deliveryMan => (
                <tr key={deliveryMan.id}>
                  <td>#{deliveryMan.id}</td>
                  <td>
                    <img
                      src={
                        deliveryMan.avatar
                          ? deliveryMan.avatar.url
                          : `https://api.adorable.io/avatars/40/${deliveryMan.name}.png`
                      }
                      alt={deliveryMan.name}
                    />
                  </td>
                  <td>{deliveryMan.name}</td>
                  <td>{deliveryMan.email}</td>
                  <td>
                    <ActionButtons
                      visualizable={false}
                      onEdit={() =>
                        history.push(`/delivery-men/create/${deliveryMan.id}`)
                      }
                      onDelete={() => handleDelete(deliveryMan.id)}
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
