import React, { useEffect, useState, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { MdSearch, MdAdd } from 'react-icons/md';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '~/services/api';
import history from '~/services/history';
import DeliveryInfo from '../DeliveryInfo';
import Pagination from '~/components/Pagination';
import EmptyList from '~/components/EmptyList';
import Loading from '~/components/Loading';

import ActionButtons from '~/components/ActionButtons';

import { Container, Controls, Grid, Status } from './styles';

export default function List() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [canceled, setCanceled] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [perPage, setPerPage] = useState({});
  const nextPageDisabled = useMemo(() => {
    return page >= perPage;
  }, [page, perPage]);

  const MySwal = withReactContent(Swal);

  function formatStatusDelivery({ canceled, delivered, pending, available }) {
    if (canceled) {
      return {
        textColor: '#DE3B3B',
        colorOutside: '#FAB0B0',
        text: 'CANCELADA'
      };
    }
    if (delivered) {
      return {
        textColor: '#2CA42B',
        colorOutside: '#DFF0DF',
        text: 'ENTREGUE'
      };
    }
    if (pending) {
      return {
        textColor: '#C1BC35',
        colorOutside: '#F0F0DF',
        text: 'PENDENTE'
      };
    }
    if (available) {
      return {
        textColor: '#4D85EE',
        colorOutside: '#BAD2FF',
        text: 'RETIRADA'
      };
    }

    return '';
  }

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('/deliveries', {
        params: {
          page,
          query: search,
          canceled: canceled ? true : null
        }
      });

      setPerPage(response.data.count / 20);

      const data = response.data.rows.map(delivery => ({
        ...delivery,
        status: formatStatusDelivery(delivery),
        start_date_formatted: delivery.start_date
          ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
          : null,
        end_date_formatted: delivery.end_date
          ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
          : null
      }));

      setDeliveries(data);
    }
    setLoading(true);
    loadDeliveries();
    setLoading(false);
  }, [page, search, canceled]);

  function handleDelete(id) {
    MySwal.fire({
      title: 'Você tem certeza?',
      text: 'Se você fizer isso não poderá voltar atrás!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, cancelar!',
      cancelButtonText: 'Cancelar'
    }).then(async result => {
      if (result.value) {
        try {
          await api.delete(`/deliveries/${id}`);
          // colocar um objeto para canceled === true
          setDeliveries(
            deliveries.map(delivery =>
              delivery.id === id
                ? {
                    ...delivery,
                    canceled: true,
                    status: formatStatusDelivery({
                      ...delivery,
                      canceled: true
                    })
                  }
                : delivery
            )
          );

          Swal.fire(
            'Encomenda cancelada!',
            'Encomenda cancelada com sucesso.',
            'success'
          );
        } catch (error) {
          Swal.fire('Erro!', 'Erro ao cancelar encomenda.', 'error');
        }
      }
    });
  }

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
        <label htmlFor="canceled">
          <input
            id="canceled"
            type="checkbox"
            checked={canceled}
            onChange={() => {
              setCanceled(!canceled);
            }}
          />
          <span>Encomendas canceladas</span>
        </label>

        <button
          type="button"
          onClick={() => history.push('/deliveries/create')}
        >
          <MdAdd size={20} color="#fff" /> CADASTRAR
        </button>
      </Controls>
      {loading && <Loading loading={loading} />}
      {deliveries.length ? (
        <>
          <Grid>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
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
                  <td> {delivery.product}</td>
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
                  <td>
                    <Status
                      color={delivery.status.textColor}
                      colorOutside={delivery.status.colorOutside}
                    >
                      <div>{delivery.status.text}</div>
                    </Status>
                  </td>
                  <td>
                    <ActionButtons
                      visualizable
                      editable
                      modalComponent={() => (
                        <DeliveryInfo delivery={delivery} />
                      )}
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
        </>
      ) : (
        <EmptyList />
      )}
    </Container>
  );
}
