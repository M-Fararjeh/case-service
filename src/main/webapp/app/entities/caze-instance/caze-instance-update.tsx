import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getCazeInstances } from 'app/entities/caze-instance/caze-instance.reducer';
import { ICazeType } from 'app/shared/model/caze-type.model';
import { getEntities as getCazeTypes } from 'app/entities/caze-type/caze-type.reducer';
import { ICamundaCaseInstance } from 'app/shared/model/camunda-case-instance.model';
import { getEntities as getCamundaCaseInstances } from 'app/entities/camunda-case-instance/camunda-case-instance.reducer';
import { ICamundaProcessInstance } from 'app/shared/model/camunda-process-instance.model';
import { getEntities as getCamundaProcessInstances } from 'app/entities/camunda-process-instance/camunda-process-instance.reducer';
import { getEntity, updateEntity, createEntity, reset } from './caze-instance.reducer';
import { ICazeInstance } from 'app/shared/model/caze-instance.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICazeInstanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICazeInstanceUpdateState {
  isNew: boolean;
  cazeInstanceId: string;
  relatedCazeId: string;
  cazeTypeId: string;
  camundaCaseInstanceId: string;
  camundaProcessInstanceId: string;
}

export class CazeInstanceUpdate extends React.Component<ICazeInstanceUpdateProps, ICazeInstanceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cazeInstanceId: '0',
      relatedCazeId: '0',
      cazeTypeId: '0',
      camundaCaseInstanceId: '0',
      camundaProcessInstanceId: '0',
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

    this.props.getCazeInstances();
    this.props.getCazeTypes();
    this.props.getCamundaCaseInstances();
    this.props.getCamundaProcessInstances();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { cazeInstanceEntity } = this.props;
      const entity = {
        ...cazeInstanceEntity,
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
    this.props.history.push('/entity/caze-instance');
  };

  render() {
    const { cazeInstanceEntity, cazeInstances, cazeTypes, camundaCaseInstances, camundaProcessInstances, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="caseServiceApp.cazeInstance.home.createOrEditLabel">
              <Translate contentKey="caseServiceApp.cazeInstance.home.createOrEditLabel">Create or edit a CazeInstance</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : cazeInstanceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="caze-instance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="caseServiceApp.cazeInstance.name">Name</Translate>
                  </Label>
                  <AvField id="caze-instance-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="caseServiceApp.cazeInstance.description">Description</Translate>
                  </Label>
                  <AvField id="caze-instance-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="numberLabel" for="number">
                    <Translate contentKey="caseServiceApp.cazeInstance.number">Number</Translate>
                  </Label>
                  <AvField id="caze-instance-number" type="text" name="number" />
                </AvGroup>
                <AvGroup>
                  <Label id="creatorIdLabel" for="creatorId">
                    <Translate contentKey="caseServiceApp.cazeInstance.creatorId">Creator Id</Translate>
                  </Label>
                  <AvField id="caze-instance-creatorId" type="text" name="creatorId" />
                </AvGroup>
                <AvGroup>
                  <Label id="issuerIDLabel" for="issuerID">
                    <Translate contentKey="caseServiceApp.cazeInstance.issuerID">Issuer ID</Translate>
                  </Label>
                  <AvField id="caze-instance-issuerID" type="text" name="issuerID" />
                </AvGroup>
                <AvGroup>
                  <Label id="creationDateLabel" for="creationDate">
                    <Translate contentKey="caseServiceApp.cazeInstance.creationDate">Creation Date</Translate>
                  </Label>
                  <AvField id="caze-instance-creationDate" type="date" className="form-control" name="creationDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="caseDateLabel" for="caseDate">
                    <Translate contentKey="caseServiceApp.cazeInstance.caseDate">Case Date</Translate>
                  </Label>
                  <AvField id="caze-instance-caseDate" type="date" className="form-control" name="caseDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="priorityLabel">
                    <Translate contentKey="caseServiceApp.cazeInstance.priority">Priority</Translate>
                  </Label>
                  <AvInput
                    id="caze-instance-priority"
                    type="select"
                    className="form-control"
                    name="priority"
                    value={(!isNew && cazeInstanceEntity.priority) || 'HIGH'}
                  >
                    <option value="HIGH">
                      <Translate contentKey="caseServiceApp.CasePriority.HIGH" />
                    </option>
                    <option value="NORMAL">
                      <Translate contentKey="caseServiceApp.CasePriority.NORMAL" />
                    </option>
                    <option value="LOW">
                      <Translate contentKey="caseServiceApp.CasePriority.LOW" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="requiredTimeLabel" for="requiredTime">
                    <Translate contentKey="caseServiceApp.cazeInstance.requiredTime">Required Time</Translate>
                  </Label>
                  <AvField id="caze-instance-requiredTime" type="string" className="form-control" name="requiredTime" />
                </AvGroup>
                <AvGroup>
                  <Label id="securedLabel" check>
                    <AvInput id="caze-instance-secured" type="checkbox" className="form-control" name="secured" />
                    <Translate contentKey="caseServiceApp.cazeInstance.secured">Secured</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="cmmnIdLabel" for="cmmnId">
                    <Translate contentKey="caseServiceApp.cazeInstance.cmmnId">Cmmn Id</Translate>
                  </Label>
                  <AvField id="caze-instance-cmmnId" type="text" name="cmmnId" />
                </AvGroup>
                <AvGroup>
                  <Label for="cazeType.id">
                    <Translate contentKey="caseServiceApp.cazeInstance.cazeType">Caze Type</Translate>
                  </Label>
                  <AvInput id="caze-instance-cazeType" type="select" className="form-control" name="cazeType.id">
                    <option value="" key="0" />
                    {cazeTypes
                      ? cazeTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="relatedCaze.id">
                    <Translate contentKey="caseServiceApp.cazeInstance.relatedCaze">Related Caze</Translate>
                  </Label>
                  <AvInput id="caze-instance-relatedCaze" type="select" className="form-control" name="relatedCaze.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/caze-instance" replace color="info">
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
  cazeInstances: storeState.cazeInstance.entities,
  cazeTypes: storeState.cazeType.entities,
  camundaCaseInstances: storeState.camundaCaseInstance.entities,
  camundaProcessInstances: storeState.camundaProcessInstance.entities,
  cazeInstanceEntity: storeState.cazeInstance.entity,
  loading: storeState.cazeInstance.loading,
  updating: storeState.cazeInstance.updating,
  updateSuccess: storeState.cazeInstance.updateSuccess
});

const mapDispatchToProps = {
  getCazeInstances,
  getCazeTypes,
  getCamundaCaseInstances,
  getCamundaProcessInstances,
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
)(CazeInstanceUpdate);
