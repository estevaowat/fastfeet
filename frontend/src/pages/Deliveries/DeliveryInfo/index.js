import React from 'react';

import { Container } from './styles';

export default function DeliveryInfo({ delivery }) {
  return (
    <Container>
      <strong>Informações da encomenda</strong>
      <p>{delivery.recipient.address}</p>
      <p>{delivery.recipient.city}</p>
      <p>{delivery.recipient.zipcode}</p>

      <hr />

      <strong>Datas</strong>
      <p>
        <strong>Retirada</strong>: {delivery.start_date}
        <strong>Entrega</strong>: {delivery.end_date}
      </p>

      {delivery.signature && (
        <>
          <hr />
          <strong>Assinatura do destinatário</strong>
          <img src={delivery.signature.url} alt="Assinatura" />
        </>
      )}
    </Container>
  );
}
