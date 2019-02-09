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
import { getEntity, updateEntity, createEntity, reset } from './camunda-case-instance.reducer';
import { ICamundaCaseInstance } from 'app/shared/model/camunda-case-instance.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICamundaCaseInstanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICamundaCaseInstanceUpdateState {
  isNew: boolean;
  idscazeInstance: any[];
}

export class CamundaCaseInstanceUpdate extends React.Component<ICamundaCaseInstanceUpdateProps, ICamundaCaseInstanceUpdateState> {
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
      const { camundaCaseInstanceEntity } = this.props;
      const entity = {
        ...camundaCaseInstanceEntity,
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
    this.props.history.push('/entity/camunda-case-instance');
  };

  render() {
    const { camundaCaseInstanceEntity, cazeInstances, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="caseServiceApp.camundaCaseInstance.home.createOrEditLabel">
              <Translate contentKey="caseServiceApp.camundaCaseInstance.home.createOrEditLabel">
                Create or edit a CamundaCaseInstance
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : camundaCaseInstanceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="camunda-case-instance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="caseInstanceIdLabel" for="caseInstanceId">
                    <Translate contentKey="caseServiceApp.camundaCaseInstance.caseInstanceId">Case Instance Id</Translate>
                  </Label>
                  <AvField id="camunda-case-instance-caseInstanceId" type="text" name="caseInstanceId" />
                </AvGroup>
                <AvGroup>
                  <Label id="caseInstanceNameLabel" for="caseInstanceName">
                    <Translate contentKey="caseServiceApp.camundaCaseInstance.caseInstanceName">Case Instance Name</Translate>
                  </Label>
                  <AvField id="camunda-case-instance-caseInstanceName" type="text" name="caseInstanceName" />
                </AvGroup>
                <AvGroup>
                  <Label for="cazeInstances">
                    <Translate contentKey="caseServiceApp.camundaCaseInstance.cazeInstance">Caze Instance</Translate>
                  </Label>
                  <AvInput
                    id="camunda-case-instance-cazeInstance"
                    type="select"
                    multiple
                    className="form-control"
                    name="cazeInstances"
                    value={camundaCaseInstanceEntity.cazeInstances && camundaCaseInstanceEntity.cazeInstances.map(e => e.id)}
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
                <Button tag={Link} id="cancel-save" to="/entity/camunda-case-instance" replace color="info">
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
  camundaCaseInstanceEntity: storeState.camundaCaseInstance.entity,
  loading: storeState.camundaCaseInstance.loading,
  updating: storeState.camundaCaseInstance.updating,
  updateSuccess: storeState.camundaCaseInstance.updateSuccess
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
)(CamundaCaseInstanceUpdate);
