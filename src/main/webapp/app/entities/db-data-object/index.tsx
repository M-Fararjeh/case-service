import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DbDataObject from './db-data-object';
import DbDataObjectDetail from './db-data-object-detail';
import DbDataObjectUpdate from './db-data-object-update';
import DbDataObjectDeleteDialog from './db-data-object-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DbDataObjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DbDataObjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DbDataObjectDetail} />
      <ErrorBoundaryRoute path={match.url} component={DbDataObject} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DbDataObjectDeleteDialog} />
  </>
);

export default Routes;
