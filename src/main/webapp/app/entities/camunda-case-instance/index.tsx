import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CamundaCaseInstance from './camunda-case-instance';
import CamundaCaseInstanceDetail from './camunda-case-instance-detail';
import CamundaCaseInstanceUpdate from './camunda-case-instance-update';
import CamundaCaseInstanceDeleteDialog from './camunda-case-instance-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CamundaCaseInstanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CamundaCaseInstanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CamundaCaseInstanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={CamundaCaseInstance} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CamundaCaseInstanceDeleteDialog} />
  </>
);

export default Routes;
