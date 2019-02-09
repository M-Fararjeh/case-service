import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApiDataObject } from 'app/shared/model/api-data-object.model';
import { getEntities as getApiDataObjects } from 'app/entities/api-data-object/api-data-object.reducer';
import { IDbDataObject } from 'app/shared/model/db-data-object.model';
import { getEntities as getDbDataObjects } from 'app/entities/db-data-object/db-data-object.reducer';
import { IFileDataObject } from 'app/shared/model/file-data-object.model';
import { getEntities as getFileDataObjects } from 'app/entities/file-data-object/file-data-object.reducer';
import { ICazeInstance } from 'app/shared/model/caze-instance.model';
import { getEntities as getCazeInstances } from 'app/entities/caze-instance/caze-instance.reducer';
import { getEntity, updateEntity, createEntity, reset } from './case-data-object.reducer';
import { ICaseDataObject } from 'app/shared/model/case-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICaseDataObjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICaseDataObjectUpdateState {
  isNew: boolean;
  apiDataObjectId: string;
  dbDataObjectId: string;
  fileDataObjectId: string;
  caseIdId: string;
}

export class CaseDataObjectUpdate extends React.Component<ICaseDataObjectUpdateProps, ICaseDataObjectUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      apiDataObjectId: '0',
      dbDataObjectId: '0',
      fileDataObjectId: '0',
      caseIdId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getApiDataObjects();
    this.props.getDbDataObjects();
    this.props.getFileDataObjects();
    this.props.getCazeInstances();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { caseDataObjectEntity } = this.props;
      const entity = {
        ...caseDataObjectEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/case-data-object');
  };

  render() {
    const { caseDataObjectEntity, apiDataObjects, dbDataObjects, fileDataObjects, cazeInstances, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="caseServiceApp.caseDataObject.home.createOrEditLabel">
              <Translate contentKey="caseServiceApp.caseDataObject.home.createOrEditLabel">Create or edit a CaseDataObject</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : caseDataObjectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="case-data-object-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel">
                    <Translate contentKey="caseServiceApp.caseDataObject.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="case-data-object-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && caseDataObjectEntity.type) || 'API'}
                  >
                    <option value="API">
                      <Translate contentKey="caseServiceApp.DataObjectType.API" />
                    </option>
                    <option value="DB">
                      <Translate contentKey="caseServiceApp.DataObjectType.DB" />
                    </option>
                    <option value="FILE">
                      <Translate contentKey="caseServiceApp.DataObjectType.FILE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="keyLabel" for="key">
                    <Translate contentKey="caseServiceApp.caseDataObject.key">Key</Translate>
                  </Label>
                  <AvField id="case-data-object-key" type="text" name="key" />
                </AvGroup>
                <AvGroup>
                  <Label for="apiDataObject.id">
                    <Translate contentKey="caseServiceApp.caseDataObject.apiDataObject">Api Data Object</Translate>
                  </Label>
                  <AvInput id="case-data-object-apiDataObject" type="select" className="form-control" name="apiDataObject.id">
                    <option value="" key="0" />
                    {apiDataObjects
                      ? apiDataObjects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="dbDataObject.id">
                    <Translate contentKey="caseServiceApp.caseDataObject.dbDataObject">Db Data Object</Translate>
                  </Label>
                  <AvInput id="case-data-object-dbDataObject" type="select" className="form-control" name="dbDataObject.id">
                    <option value="" key="0" />
                    {dbDataObjects
                      ? dbDataObjects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="fileDataObject.id">
                    <Translate contentKey="caseServiceApp.caseDataObject.fileDataObject">File Data Object</Translate>
                  </Label>
                  <AvInput id="case-data-object-fileDataObject" type="select" className="form-control" name="fileDataObject.id">
                    <option value="" key="0" />
                    {fileDataObjects
                      ? fileDataObjects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="caseId.id">
                    <Translate contentKey="caseServiceApp.caseDataObject.caseId">Case Id</Translate>
                  </Label>
                  <AvInput id="case-data-object-caseId" type="select" className="form-control" name="caseId.id">
                    <option value="" key="0" />
                    {cazeInstances
                      ? cazeInstances.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/case-data-object" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  apiDataObjects: storeState.apiDataObject.entities,
  dbDataObjects: storeState.dbDataObject.entities,
  fileDataObjects: storeState.fileDataObject.entities,
  cazeInstances: storeState.cazeInstance.entities,
  caseDataObjectEntity: storeState.caseDataObject.entity,
  loading: storeState.caseDataObject.loading,
  updating: storeState.caseDataObject.updating,
  updateSuccess: storeState.caseDataObject.updateSuccess
});

const mapDispatchToProps = {
  getApiDataObjects,
  getDbDataObjects,
  getFileDataObjects,
  getCazeInstances,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseDataObjectUpdate);
