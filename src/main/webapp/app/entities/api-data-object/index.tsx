import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApiDataObject from './api-data-object';
import ApiDataObjectDetail from './api-data-object-detail';
import ApiDataObjectUpdate from './api-data-object-update';
import ApiDataObjectDeleteDialog from './api-data-object-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApiDataObjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApiDataObjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApiDataObjectDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApiDataObject} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ApiDataObjectDeleteDialog} />
  </>
);

export default Routes;
