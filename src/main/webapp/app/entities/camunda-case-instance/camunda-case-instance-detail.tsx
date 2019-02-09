import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './camunda-case-instance.reducer';
import { ICamundaCaseInstance } from 'app/shared/model/camunda-case-instance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICamundaCaseInstanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CamundaCaseInstanceDetail extends React.Component<ICamundaCaseInstanceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { camundaCaseInstanceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="caseServiceApp.camundaCaseInstance.detail.title">CamundaCaseInstance</Translate> [<b>
              {camundaCaseInstanceEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="caseInstanceId">
                <Translate contentKey="caseServiceApp.camundaCaseInstance.caseInstanceId">Case Instance Id</Translate>
              </span>
            </dt>
            <dd>{camundaCaseInstanceEntity.caseInstanceId}</dd>
            <dt>
              <span id="caseInstanceName">
                <Translate contentKey="caseServiceApp.camundaCaseInstance.caseInstanceName">Case Instance Name</Translate>
              </span>
            </dt>
            <dd>{camundaCaseInstanceEntity.caseInstanceName}</dd>
            <dt>
              <Translate contentKey="caseServiceApp.camundaCaseInstance.cazeInstance">Caze Instance</Translate>
            </dt>
            <dd>
              {camundaCaseInstanceEntity.cazeInstances
                ? camundaCaseInstanceEntity.cazeInstances.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === camundaCaseInstanceEntity.cazeInstances.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/camunda-case-instance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/camunda-case-instance/${camundaCaseInstanceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ camundaCaseInstance }: IRootState) => ({
  camundaCaseInstanceEntity: camundaCaseInstance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamundaCaseInstanceDetail);
