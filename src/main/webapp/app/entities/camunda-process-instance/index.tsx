import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CamundaProcessInstance from './camunda-process-instance';
import CamundaProcessInstanceDetail from './camunda-process-instance-detail';
import CamundaProcessInstanceUpdate from './camunda-process-instance-update';
import CamundaProcessInstanceDeleteDialog from './camunda-process-instance-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CamundaProcessInstanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CamundaProcessInstanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CamundaProcessInstanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={CamundaProcessInstance} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CamundaProcessInstanceDeleteDialog} />
  </>
);

export default Routes;
