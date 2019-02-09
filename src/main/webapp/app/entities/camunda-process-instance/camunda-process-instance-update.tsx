import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICazeInstance } from 'app/shared/model/caze-instance.model';
import { getEntities as getCazeInstances } from 'app/entities/caze-instance/caze-instance.reducer';
import { getEntity, updateEntity, createEntity, reset } from './camunda-process-instance.reducer';
import { ICamundaProcessInstance } from 'app/shared/model/camunda-process-instance.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICamundaProcessInstanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICamundaProcessInstanceUpdateState {
  isNew: boolean;
  idscazeInstance: any[];
}

export class CamundaProcessInstanceUpdate extends React.Component<ICamundaProcessInstanceUpdateProps, ICamundaProcessInstanceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscazeInstance: [],
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { camundaProcessInstanceEntity } = this.props;
      const entity = {
        ...camundaProcessInstanceEntity,
        ...values,
        cazeInstances: mapIdList(values.cazeInstances)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/camunda-process-instance');
  };

  render() {
    const { camundaProcessInstanceEntity, cazeInstances, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="caseServiceApp.camundaProcessInstance.home.createOrEditLabel">
              <Translate contentKey="caseServiceApp.camundaProcessInstance.home.createOrEditLabel">
                Create or edit a CamundaProcessInstance
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : camundaProcessInstanceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="camunda-process-instance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="processInstanceIdLabel" for="processInstanceId">
                    <Translate contentKey="caseServiceApp.camundaProcessInstance.processInstanceId">Process Instance Id</Translate>
                  </Label>
                  <AvField id="camunda-process-instance-processInstanceId" type="text" name="processInstanceId" />
                </AvGroup>
                <AvGroup>
                  <Label id="processInstanceNameLabel" for="processInstanceName">
                    <Translate contentKey="caseServiceApp.camundaProcessInstance.processInstanceName">Process Instance Name</Translate>
                  </Label>
                  <AvField id="camunda-process-instance-processInstanceName" type="text" name="processInstanceName" />
                </AvGroup>
                <AvGroup>
                  <Label for="cazeInstances">
                    <Translate contentKey="caseServiceApp.camundaProcessInstance.cazeInstance">Caze Instance</Translate>
                  </Label>
                  <AvInput
                    id="camunda-process-instance-cazeInstance"
                    type="select"
                    multiple
                    className="form-control"
                    name="cazeInstances"
                    value={camundaProcessInstanceEntity.cazeInstances && camundaProcessInstanceEntity.cazeInstances.map(e => e.id)}
                  >
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
                <Button tag={Link} id="cancel-save" to="/entity/camunda-process-instance" replace color="info">
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
  camundaProcessInstanceEntity: storeState.camundaProcessInstance.entity,
  loading: storeState.camundaProcessInstance.loading,
  updating: storeState.camundaProcessInstance.updating,
  updateSuccess: storeState.camundaProcessInstance.updateSuccess
});

const mapDispatchToProps = {
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
)(CamundaProcessInstanceUpdate);
