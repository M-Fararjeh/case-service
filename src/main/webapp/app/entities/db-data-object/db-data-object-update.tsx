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
import { getEntity, updateEntity, createEntity, reset } from './db-data-object.reducer';
import { IDbDataObject } from 'app/shared/model/db-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDbDataObjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDbDataObjectUpdateState {
  isNew: boolean;
  caseDataObjectId: string;
}

export class DbDataObjectUpdate extends React.Component<IDbDataObjectUpdateProps, IDbDataObjectUpdateState> {
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
      const { dbDataObjectEntity } = this.props;
      const entity = {
        ...dbDataObjectEntity,
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
    this.props.history.push('/entity/db-data-object');
  };

  render() {
    const { dbDataObjectEntity, caseDataObjects, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="caseServiceApp.dbDataObject.home.createOrEditLabel">
              <Translate contentKey="caseServiceApp.dbDataObject.home.createOrEditLabel">Create or edit a DbDataObject</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : dbDataObjectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="db-data-object-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tableNameLabel" for="tableName">
                    <Translate contentKey="caseServiceApp.dbDataObject.tableName">Table Name</Translate>
                  </Label>
                  <AvField id="db-data-object-tableName" type="text" name="tableName" />
                </AvGroup>
                <AvGroup>
                  <Label id="columnNameLabel" for="columnName">
                    <Translate contentKey="caseServiceApp.dbDataObject.columnName">Column Name</Translate>
                  </Label>
                  <AvField id="db-data-object-columnName" type="text" name="columnName" />
                </AvGroup>
                <AvGroup>
                  <Label id="columnValueLabel" for="columnValue">
                    <Translate contentKey="caseServiceApp.dbDataObject.columnValue">Column Value</Translate>
                  </Label>
                  <AvField id="db-data-object-columnValue" type="text" name="columnValue" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/db-data-object" replace color="info">
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
  dbDataObjectEntity: storeState.dbDataObject.entity,
  loading: storeState.dbDataObject.loading,
  updating: storeState.dbDataObject.updating,
  updateSuccess: storeState.dbDataObject.updateSuccess
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
)(DbDataObjectUpdate);
