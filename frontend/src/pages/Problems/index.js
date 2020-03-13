import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '~/services/api';
import ActionButtons from '~/components/ActionButtons';
import Pagination from '~/components/Pagination';
import EmptyList from '~/components/EmptyList';
import Loading from '~/components/Loading';
import ProblemInfo from './ProblemInfo';
import { Container, Grid } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState({});
  const nextPageDisabled = useMemo(() => {
    return page >= perPage;
  }, [page, perPage]);

  const MySwal = withReactContent(Swal);

  function handleCancelDelivery(id) {
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

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('/problems', {
        params: { page }
      });

      setPerPage(response.data.count / 20);
      setProblems(response.data.rows);
    }
    setLoading(true);
    loadProblems();
    setLoading(false);
  }, []);

  return (
    <Container>
      <strong>Problemas na entrega</strong>
      {loading && <Loading loading={loading} />}
      {problems.length ? (
        <>
          <Grid>
            <thead>
              <tr>
                <th>Encomenda</th>
                <th>Problema</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                <tr key={problem.id}>
                  <td>#{problem.delivery.id}</td>
                  <td>
                    {problem.description.length > 100
                      ? `${problem.description.substring(0, 100)}...`
                      : problem.description}
                  </td>
                  <td>
                    <ActionButtons
                      visualizable
                      editable={false}
                      modalComponent={() => (
                        <ProblemInfo description={problem.description} />
                      )}
                      labelDelete="Cancelar encomenda"
                      onDelete={() => handleCancelDelivery(problem.delivery.id)}
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
