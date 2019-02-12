import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getEntity, updateEntity, createEntity, reset } from './caze-type.reducer';
import { ICazeType } from 'app/shared/model/caze-type.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICazeTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICazeTypeUpdateState {
  isNew: boolean;
  categoryId: string;
}

export class CazeTypeUpdate extends React.Component<ICazeTypeUpdateProps, ICazeTypeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '0',
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

    this.props.getCategories();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { cazeTypeEntity } = this.props;
      const entity = {
        ...cazeTypeEntity,
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
    this.props.history.push('/entity/caze-type');
  };

  render() {
    const { cazeTypeEntity, categories, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="caseServiceApp.cazeType.home.createOrEditLabel">
              <Translate contentKey="caseServiceApp.cazeType.home.createOrEditLabel">Create or edit a CazeType</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : cazeTypeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="caze-type-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="caseServiceApp.cazeType.name">Name</Translate>
                  </Label>
                  <AvField id="caze-type-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="priorityLabel">
                    <Translate contentKey="caseServiceApp.cazeType.priority">Priority</Translate>
                  </Label>
                  <AvInput
                    id="caze-type-priority"
                    type="select"
                    className="form-control"
                    name="priority"
                    value={(!isNew && cazeTypeEntity.priority) || 'HIGH'}
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
                    <Translate contentKey="caseServiceApp.cazeType.requiredTime">Required Time</Translate>
                  </Label>
                  <AvField id="caze-type-requiredTime" type="string" className="form-control" name="requiredTime" />
                </AvGroup>
                <AvGroup>
                  <Label id="securedLabel" check>
                    <AvInput id="caze-type-secured" type="checkbox" className="form-control" name="secured" />
                    <Translate contentKey="caseServiceApp.cazeType.secured">Secured</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="category.id">
                    <Translate contentKey="caseServiceApp.cazeType.category">Category</Translate>
                  </Label>
                  <AvInput id="caze-type-category" type="select" className="form-control" name="category.id">
                    <option value="" key="0" />
                    {categories
                      ? categories.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/caze-type" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
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
  categories: storeState.category.entities,
  cazeTypeEntity: storeState.cazeType.entity,
  loading: storeState.cazeType.loading,
  updating: storeState.cazeType.updating,
  updateSuccess: storeState.cazeType.updateSuccess
});

const mapDispatchToProps = {
  getCategories,
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
)(CazeTypeUpdate);
