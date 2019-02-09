import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CazeInstance from './caze-instance';
import CazeInstanceDetail from './caze-instance-detail';
import CazeInstanceUpdate from './caze-instance-update';
import CazeInstanceDeleteDialog from './caze-instance-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CazeInstanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CazeInstanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CazeInstanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={CazeInstance} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CazeInstanceDeleteDialog} />
  </>
);

export default Routes;
