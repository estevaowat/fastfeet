import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import DeliveryMen from '~/pages/DeliveryMen/List';
import CreateDeliveryMan from '~/pages/DeliveryMen/Create';
import Recipients from '~/pages/Recipients/List';
import CreateRecipients from '~/pages/Recipients/Create';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" component={Deliveries} isPrivate />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route
        path="/recipients/create"
        exact
        component={CreateRecipients}
        isPrivate
      />
      <Route
        path="/recipients/create/:id"
        component={CreateRecipients}
        isPrivate
      />
      <Route path="/delivery-men" exact component={DeliveryMen} isPrivate />
      <Route
        path="/delivery-men/create"
        exact
        component={CreateDeliveryMan}
        isPrivate
      />
      <Route
        path="/delivery-men/create/:id"
        component={CreateDeliveryMan}
        isPrivate
      />
      <Route path="/problems" component={Deliveries} isPrivate />
    </Switch>
  );
}
