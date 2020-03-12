import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '~/services/api';
import ActionButtons from '~/components/ActionButtons';
import Pagination from '~/components/Pagination';
import ProblemInfo from './ProblemInfo';
import { Container, Grid } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState({});
  const nextPageDisabled = useMemo(() => {
    return page >= perPage;
  }, [page, perPage]);

  const MySwal = withReactContent(Swal);

  function handleCancelDelivery() {}

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('/problems', {
        params: { page }
      });

      setPerPage(response.data.count / 20);
      setProblems(response.data.rows);
    }

    loadProblems();
  }, []);

  return (
    <Container>
      <strong>Problemas na entrega</strong>
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
              <td>{problem.description}</td>
              <td>
                <ActionButtons
                  visualizable
                  editable={false}
                  modalComponent={() => (
                    <ProblemInfo description={problem.description} />
                  )}
                  labelDelete="Cancelar encomenda"
                  onDelete={() => handleCancelDelivery(problem.id)}
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
