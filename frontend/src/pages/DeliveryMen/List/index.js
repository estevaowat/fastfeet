import React, { useState, useEffect, useMemo } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import history from '~/services/history';
import api from '~/services/api';

import ActionButtons from '~/components/ActionButtons';
import Pagination from '~/components/Pagination';
import { Container, Controls, Grid } from './styles';

export default function List() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [perPage, setPerPage] = useState({});
  const nextPageDisabled = useMemo(() => {
    return page >= perPage;
  }, [page, perPage]);

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
    loadDeliveryMen();
  }, [page, search]);

  function handleDelete() {}

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
    </Container>
  );
}
