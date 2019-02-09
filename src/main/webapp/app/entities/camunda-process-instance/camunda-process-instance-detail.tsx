import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './camunda-process-instance.reducer';
import { ICamundaProcessInstance } from 'app/shared/model/camunda-process-instance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICamundaProcessInstanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CamundaProcessInstanceDetail extends React.Component<ICamundaProcessInstanceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { camundaProcessInstanceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="caseServiceApp.camundaProcessInstance.detail.title">CamundaProcessInstance</Translate> [<b>
              {camundaProcessInstanceEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="processInstanceId">
                <Translate contentKey="caseServiceApp.camundaProcessInstance.processInstanceId">Process Instance Id</Translate>
              </span>
            </dt>
            <dd>{camundaProcessInstanceEntity.processInstanceId}</dd>
            <dt>
              <span id="processInstanceName">
                <Translate contentKey="caseServiceApp.camundaProcessInstance.processInstanceName">Process Instance Name</Translate>
              </span>
            </dt>
            <dd>{camundaProcessInstanceEntity.processInstanceName}</dd>
            <dt>
              <Translate contentKey="caseServiceApp.camundaProcessInstance.cazeInstance">Caze Instance</Translate>
            </dt>
            <dd>
              {camundaProcessInstanceEntity.cazeInstances
                ? camundaProcessInstanceEntity.cazeInstances.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === camundaProcessInstanceEntity.cazeInstances.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/camunda-process-instance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/camunda-process-instance/${camundaProcessInstanceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ camundaProcessInstance }: IRootState) => ({
  camundaProcessInstanceEntity: camundaProcessInstance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamundaProcessInstanceDetail);
