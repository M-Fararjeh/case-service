import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FileDataObject from './file-data-object';
import FileDataObjectDetail from './file-data-object-detail';
import FileDataObjectUpdate from './file-data-object-update';
import FileDataObjectDeleteDialog from './file-data-object-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FileDataObjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FileDataObjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FileDataObjectDetail} />
      <ErrorBoundaryRoute path={match.url} component={FileDataObject} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FileDataObjectDeleteDialog} />
  </>
);

export default Routes;
