import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import cazeInstance, {
  CazeInstanceState
} from 'app/entities/caze-instance/caze-instance.reducer';
// prettier-ignore
import cazeType, {
  CazeTypeState
} from 'app/entities/caze-type/caze-type.reducer';
// prettier-ignore
import camundaCaseInstance, {
  CamundaCaseInstanceState
} from 'app/entities/camunda-case-instance/camunda-case-instance.reducer';
// prettier-ignore
import camundaProcessInstance, {
  CamundaProcessInstanceState
} from 'app/entities/camunda-process-instance/camunda-process-instance.reducer';
// prettier-ignore
import caseDataObject, {
  CaseDataObjectState
} from 'app/entities/case-data-object/case-data-object.reducer';
// prettier-ignore
import apiDataObject, {
  ApiDataObjectState
} from 'app/entities/api-data-object/api-data-object.reducer';
// prettier-ignore
import apiHeader, {
  ApiHeaderState
} from 'app/entities/api-header/api-header.reducer';
// prettier-ignore
import dbDataObject, {
  DbDataObjectState
} from 'app/entities/db-data-object/db-data-object.reducer';
// prettier-ignore
import fileDataObject, {
  FileDataObjectState
} from 'app/entities/file-data-object/file-data-object.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly cazeInstance: CazeInstanceState;
  readonly cazeType: CazeTypeState;
  readonly camundaCaseInstance: CamundaCaseInstanceState;
  readonly camundaProcessInstance: CamundaProcessInstanceState;
  readonly caseDataObject: CaseDataObjectState;
  readonly apiDataObject: ApiDataObjectState;
  readonly apiHeader: ApiHeaderState;
  readonly dbDataObject: DbDataObjectState;
  readonly fileDataObject: FileDataObjectState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  cazeInstance,
  cazeType,
  camundaCaseInstance,
  camundaProcessInstance,
  caseDataObject,
  apiDataObject,
  apiHeader,
  dbDataObject,
  fileDataObject,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
