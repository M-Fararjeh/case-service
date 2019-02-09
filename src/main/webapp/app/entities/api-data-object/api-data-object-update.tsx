import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICaseDataObject } from 'app/shared/model/case-data-object.model';
import { getEntities as getCaseDataObjects } from 'app/entities/case-data-object/case-data-object.reducer';
import { getEntity, updateEntity, createEntity, reset } from './api-data-object.reducer';
import { IApiDataObject } from 'app/shared/model/api-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApiDataObjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IApiDataObjectUpdateState {
  isNew: boolean;
  caseDataObjectId: string;
}

export class ApiDataObjectUpdate extends React.Component<IApiDataObjectUpdateProps, IApiDataObjectUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      caseDataObjectId: '0',
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

    this.props.getCaseDataObjects();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { apiDataObjectEntity } = this.props;
      const entity = {
        ...apiDataObjectEntity,
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
    this.props.history.push('/entity/api-data-object');
  };

  render() {
    const { apiDataObjectEntity, caseDataObjects, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="caseServiceApp.apiDataObject.home.createOrEditLabel">
              <Translate contentKey="caseServiceApp.apiDataObject.home.createOrEditLabel">Create or edit a ApiDataObject</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : apiDataObjectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="api-data-object-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="methodLabel">
                    <Translate contentKey="caseServiceApp.apiDataObject.method">Method</Translate>
                  </Label>
                  <AvInput
                    id="api-data-object-method"
                    type="select"
                    className="form-control"
                    name="method"
                    value={(!isNew && apiDataObjectEntity.method) || 'GET'}
                  >
                    <option value="GET">
                      <Translate contentKey="caseServiceApp.ApiMethod.GET" />
                    </option>
                    <option value="POST">
                      <Translate contentKey="caseServiceApp.ApiMethod.POST" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    <Translate contentKey="caseServiceApp.apiDataObject.url">Url</Translate>
                  </Label>
                  <AvField id="api-data-object-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label id="bodyLabel" for="body">
                    <Translate contentKey="caseServiceApp.apiDataObject.body">Body</Translate>
                  </Label>
                  <AvField id="api-data-object-body" type="text" name="body" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/api-data-object" replace color="info">
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
  caseDataObjects: storeState.caseDataObject.entities,
  apiDataObjectEntity: storeState.apiDataObject.entity,
  loading: storeState.apiDataObject.loading,
  updating: storeState.apiDataObject.updating,
  updateSuccess: storeState.apiDataObject.updateSuccess
});

const mapDispatchToProps = {
  getCaseDataObjects,
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
)(ApiDataObjectUpdate);
