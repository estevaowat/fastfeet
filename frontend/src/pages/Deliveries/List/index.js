import React, { useEffect, useState, useMemo } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';
import DeliveryInfo from '../DeliveryInfo';
import Pagination from '~/components/Pagination';
import ActionButtons from '~/components/ActionButtons';

import { Container, Controls, Grid } from './styles';

export default function List() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(1);
  const [deliveries, setDeliveries] = useState([]);
  const [perPage, setPerPage] = useState({});
  const nextPageDisabled = useMemo(() => {
    return page >= perPage;
  }, [page, perPage]);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('/deliveries', {
        page,
        query: search
      });

      setPerPage(response.data.count / 20);

      setDeliveries(response.data.rows);
    }

    loadDeliveries();
  }, [page, search]);

  function handleDelete(id) {}

  return (
    <Container>
      <strong>Gerenciando encomendas</strong>
      <Controls>
        <label htmlFor="search">
          <MdSearch size={20} color="#999" />
          <input
            id="search"
            placeholder="Buscar por encomendas"
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
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td>#{delivery.id}</td>
              <td> {delivery.recipient.name}</td>
              <td>
                <div>
                  <img
                    src={
                      delivery.delivery_man.avatar
                        ? delivery.delivery_man.avatar.url
                        : `https://api.adorable.io/avatars/40/${delivery.delivery_man.name}.png`
                    }
                    alt={delivery.name}
                  />
                  {delivery.delivery_man.name}
                </div>
              </td>
              <td> {delivery.recipient.city}</td>
              <td> {delivery.recipient.state}</td>
              <td>{delivery.status}</td>
              <td>
                <ActionButtons
                  visualizable
                  modalComponent={() => <DeliveryInfo delivery={delivery} />}
                  onEdit={() =>
                    history.push(`/deliveries/create/${delivery.id}`)
                  }
                  onDelete={() => handleDelete(delivery.id)}
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
