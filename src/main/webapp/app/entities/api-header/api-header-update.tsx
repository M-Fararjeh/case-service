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
import { getEntity, updateEntity, createEntity, reset } from './api-header.reducer';
import { IApiHeader } from 'app/shared/model/api-header.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApiHeaderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IApiHeaderUpdateState {
  isNew: boolean;
  apiDataObjectId: string;
}

export class ApiHeaderUpdate extends React.Component<IApiHeaderUpdateProps, IApiHeaderUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      apiDataObjectId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { apiHeaderEntity } = this.props;
      const entity = {
        ...apiHeaderEntity,
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
    this.props.history.push('/entity/api-header');
  };

  render() {
    const { apiHeaderEntity, apiDataObjects, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="caseServiceApp.apiHeader.home.createOrEditLabel">
              <Translate contentKey="caseServiceApp.apiHeader.home.createOrEditLabel">Create or edit a ApiHeader</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : apiHeaderEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="api-header-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="keyLabel" for="key">
                    <Translate contentKey="caseServiceApp.apiHeader.key">Key</Translate>
                  </Label>
                  <AvField id="api-header-key" type="text" name="key" />
                </AvGroup>
                <AvGroup>
                  <Label id="valueLabel" for="value">
                    <Translate contentKey="caseServiceApp.apiHeader.value">Value</Translate>
                  </Label>
                  <AvField id="api-header-value" type="text" name="value" />
                </AvGroup>
                <AvGroup>
                  <Label for="apiDataObject.id">
                    <Translate contentKey="caseServiceApp.apiHeader.apiDataObject">Api Data Object</Translate>
                  </Label>
                  <AvInput id="api-header-apiDataObject" type="select" className="form-control" name="apiDataObject.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/api-header" replace color="info">
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
  apiHeaderEntity: storeState.apiHeader.entity,
  loading: storeState.apiHeader.loading,
  updating: storeState.apiHeader.updating,
  updateSuccess: storeState.apiHeader.updateSuccess
});

const mapDispatchToProps = {
  getApiDataObjects,
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
)(ApiHeaderUpdate);
