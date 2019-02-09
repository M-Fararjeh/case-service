import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CazeType from './caze-type';
import CazeTypeDetail from './caze-type-detail';
import CazeTypeUpdate from './caze-type-update';
import CazeTypeDeleteDialog from './caze-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CazeTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CazeTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CazeTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={CazeType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CazeTypeDeleteDialog} />
  </>
);

export default Routes;
