import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CaseDataObject from './case-data-object';
import CaseDataObjectDetail from './case-data-object-detail';
import CaseDataObjectUpdate from './case-data-object-update';
import CaseDataObjectDeleteDialog from './case-data-object-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CaseDataObjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CaseDataObjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CaseDataObjectDetail} />
      <ErrorBoundaryRoute path={match.url} component={CaseDataObject} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CaseDataObjectDeleteDialog} />
  </>
);

export default Routes;
