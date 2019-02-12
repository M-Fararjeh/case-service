import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './caze-type.reducer';
import { ICazeType } from 'app/shared/model/caze-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICazeTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CazeTypeDetail extends React.Component<ICazeTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cazeTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="caseServiceApp.cazeType.detail.title">CazeType</Translate> [<b>{cazeTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="caseServiceApp.cazeType.name">Name</Translate>
              </span>
            </dt>
            <dd>{cazeTypeEntity.name}</dd>
            <dt>
              <span id="priority">
                <Translate contentKey="caseServiceApp.cazeType.priority">Priority</Translate>
              </span>
            </dt>
            <dd>{cazeTypeEntity.priority}</dd>
            <dt>
              <span id="requiredTime">
                <Translate contentKey="caseServiceApp.cazeType.requiredTime">Required Time</Translate>
              </span>
            </dt>
            <dd>{cazeTypeEntity.requiredTime}</dd>
            <dt>
              <span id="secured">
                <Translate contentKey="caseServiceApp.cazeType.secured">Secured</Translate>
              </span>
            </dt>
            <dd>{cazeTypeEntity.secured ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="caseServiceApp.cazeType.category">Category</Translate>
            </dt>
            <dd>{cazeTypeEntity.category ? cazeTypeEntity.category.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/caze-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/caze-type/${cazeTypeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ cazeType }: IRootState) => ({
  cazeTypeEntity: cazeType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CazeTypeDetail);
