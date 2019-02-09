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
import { getEntity, updateEntity, createEntity, reset } from './file-data-object.reducer';
import { IFileDataObject } from 'app/shared/model/file-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFileDataObjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFileDataObjectUpdateState {
  isNew: boolean;
  caseDataObjectId: string;
}

export class FileDataObjectUpdate extends React.Component<IFileDataObjectUpdateProps, IFileDataObjectUpdateState> {
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
      const { fileDataObjectEntity } = this.props;
      const entity = {
        ...fileDataObjectEntity,
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
    this.props.history.push('/entity/file-data-object');
  };

  render() {
    const { fileDataObjectEntity, caseDataObjects, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="caseServiceApp.fileDataObject.home.createOrEditLabel">
              <Translate contentKey="caseServiceApp.fileDataObject.home.createOrEditLabel">Create or edit a FileDataObject</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fileDataObjectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="file-data-object-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="cmisIdLabel" for="cmisId">
                    <Translate contentKey="caseServiceApp.fileDataObject.cmisId">Cmis Id</Translate>
                  </Label>
                  <AvField id="file-data-object-cmisId" type="text" name="cmisId" />
                </AvGroup>
                <AvGroup>
                  <Label id="pathLabel" for="path">
                    <Translate contentKey="caseServiceApp.fileDataObject.path">Path</Translate>
                  </Label>
                  <AvField id="file-data-object-path" type="text" name="path" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/file-data-object" replace color="info">
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
  fileDataObjectEntity: storeState.fileDataObject.entity,
  loading: storeState.fileDataObject.loading,
  updating: storeState.fileDataObject.updating,
  updateSuccess: storeState.fileDataObject.updateSuccess
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
)(FileDataObjectUpdate);
