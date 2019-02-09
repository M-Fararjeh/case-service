import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './caze-instance.reducer';
import { ICazeInstance } from 'app/shared/model/caze-instance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICazeInstanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CazeInstanceDetail extends React.Component<ICazeInstanceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cazeInstanceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="caseServiceApp.cazeInstance.detail.title">CazeInstance</Translate> [<b>{cazeInstanceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="caseServiceApp.cazeInstance.name">Name</Translate>
              </span>
            </dt>
            <dd>{cazeInstanceEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="caseServiceApp.cazeInstance.description">Description</Translate>
              </span>
            </dt>
            <dd>{cazeInstanceEntity.description}</dd>
            <dt>
              <span id="number">
                <Translate contentKey="caseServiceApp.cazeInstance.number">Number</Translate>
              </span>
            </dt>
            <dd>{cazeInstanceEntity.number}</dd>
            <dt>
              <span id="creatorId">
                <Translate contentKey="caseServiceApp.cazeInstance.creatorId">Creator Id</Translate>
              </span>
            </dt>
            <dd>{cazeInstanceEntity.creatorId}</dd>
            <dt>
              <span id="issuerID">
                <Translate contentKey="caseServiceApp.cazeInstance.issuerID">Issuer ID</Translate>
              </span>
            </dt>
            <dd>{cazeInstanceEntity.issuerID}</dd>
            <dt>
              <span id="creationDate">
                <Translate contentKey="caseServiceApp.cazeInstance.creationDate">Creation Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={cazeInstanceEntity.creationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="caseDate">
                <Translate contentKey="caseServiceApp.cazeInstance.caseDate">Case Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={cazeInstanceEntity.caseDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="priority">
                <Translate contentKey="caseServiceApp.cazeInstance.priority">Priority</Translate>
              </span>
            </dt>
            <dd>{cazeInstanceEntity.priority}</dd>
            <dt>
              <span id="requiredTime">
                <Translate contentKey="caseServiceApp.cazeInstance.requiredTime">Required Time</Translate>
              </span>
            </dt>
            <dd>{cazeInstanceEntity.requiredTime}</dd>
            <dt>
              <span id="secured">
                <Translate contentKey="caseServiceApp.cazeInstance.secured">Secured</Translate>
              </span>
            </dt>
            <dd>{cazeInstanceEntity.secured ? 'true' : 'false'}</dd>
            <dt>
              <span id="cmmnId">
                <Translate contentKey="caseServiceApp.cazeInstance.cmmnId">Cmmn Id</Translate>
              </span>
            </dt>
            <dd>{cazeInstanceEntity.cmmnId}</dd>
            <dt>
              <Translate contentKey="caseServiceApp.cazeInstance.cazeType">Caze Type</Translate>
            </dt>
            <dd>{cazeInstanceEntity.cazeType ? cazeInstanceEntity.cazeType.id : ''}</dd>
            <dt>
              <Translate contentKey="caseServiceApp.cazeInstance.relatedCaze">Related Caze</Translate>
            </dt>
            <dd>{cazeInstanceEntity.relatedCaze ? cazeInstanceEntity.relatedCaze.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/caze-instance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/caze-instance/${cazeInstanceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cazeInstance }: IRootState) => ({
  cazeInstanceEntity: cazeInstance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CazeInstanceDetail);
