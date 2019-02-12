import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CazeInstance from './caze-instance';
import CazeType from './caze-type';
import CamundaCaseInstance from './camunda-case-instance';
import CamundaProcessInstance from './camunda-process-instance';
import CaseDataObject from './case-data-object';
import ApiDataObject from './api-data-object';
import ApiHeader from './api-header';
import DbDataObject from './db-data-object';
import FileDataObject from './file-data-object';
import Category from './category';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/caze-instance`} component={CazeInstance} />
      <ErrorBoundaryRoute path={`${match.url}/caze-type`} component={CazeType} />
      <ErrorBoundaryRoute path={`${match.url}/camunda-case-instance`} component={CamundaCaseInstance} />
      <ErrorBoundaryRoute path={`${match.url}/camunda-process-instance`} component={CamundaProcessInstance} />
      <ErrorBoundaryRoute path={`${match.url}/case-data-object`} component={CaseDataObject} />
      <ErrorBoundaryRoute path={`${match.url}/api-data-object`} component={ApiDataObject} />
      <ErrorBoundaryRoute path={`${match.url}/api-header`} component={ApiHeader} />
      <ErrorBoundaryRoute path={`${match.url}/db-data-object`} component={DbDataObject} />
      <ErrorBoundaryRoute path={`${match.url}/file-data-object`} component={FileDataObject} />
      <ErrorBoundaryRoute path={`${match.url}/category`} component={Category} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
