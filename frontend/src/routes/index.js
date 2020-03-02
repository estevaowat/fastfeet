import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import Recipients from '~/pages/Recipients/List';
import CreateRecipients from '~/pages/Recipients/Create';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/delivery-men" component={Deliveries} isPrivate />
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
      <Route path="/problems" component={Deliveries} isPrivate />
    </Switch>
  );
}
