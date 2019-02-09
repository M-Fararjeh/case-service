import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApiHeader from './api-header';
import ApiHeaderDetail from './api-header-detail';
import ApiHeaderUpdate from './api-header-update';
import ApiHeaderDeleteDialog from './api-header-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApiHeaderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApiHeaderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApiHeaderDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApiHeader} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ApiHeaderDeleteDialog} />
  </>
);

export default Routes;
