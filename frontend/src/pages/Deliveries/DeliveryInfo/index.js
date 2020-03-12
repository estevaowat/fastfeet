import React from 'react';

import { Container } from './styles';

export default function DeliveryInfo({ delivery }) {
  return (
    <Container>
      <div>
        <strong>Informações da encomenda</strong>
        <p>{delivery.recipient.address}</p>
        <p>{delivery.recipient.city}</p>
        <p>{delivery.recipient.zipcode}</p>
      </div>
      <div>
        <strong>Datas</strong>
        {delivery.start_date_formatted && (
          <p>
            <strong>Retirada:</strong> {delivery.start_date_formatted}
          </p>
        )}
        {delivery.end_date_formatted && (
          <p>
            <strong>Entrega:</strong> {delivery.end_date_formatted}
          </p>
        )}
      </div>
    </Container>
  );
}
