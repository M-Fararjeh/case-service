import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './camunda-case-instance.reducer';
import { ICamundaCaseInstance } from 'app/shared/model/camunda-case-instance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICamundaCaseInstanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CamundaCaseInstance extends React.Component<ICamundaCaseInstanceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { camundaCaseInstanceList, match } = this.props;
    return (
      <div>
        <h2 id="camunda-case-instance-heading">
          <Translate contentKey="caseServiceApp.camundaCaseInstance.home.title">Camunda Case Instances</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="caseServiceApp.camundaCaseInstance.home.createLabel">Create new Camunda Case Instance</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.camundaCaseInstance.caseInstanceId">Case Instance Id</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.camundaCaseInstance.caseInstanceName">Case Instance Name</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.camundaCaseInstance.cazeInstance">Caze Instance</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {camundaCaseInstanceList.map((camundaCaseInstance, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${camundaCaseInstance.id}`} color="link" size="sm">
                      {camundaCaseInstance.id}
                    </Button>
                  </td>
                  <td>{camundaCaseInstance.caseInstanceId}</td>
                  <td>{camundaCaseInstance.caseInstanceName}</td>
                  <td>
                    {camundaCaseInstance.cazeInstances
                      ? camundaCaseInstance.cazeInstances.map((val, j) => (
                          <span key={j}>
                            <Link to={`caze-instance/${val.id}`}>{val.id}</Link>
                            {j === camundaCaseInstance.cazeInstances.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${camundaCaseInstance.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${camundaCaseInstance.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${camundaCaseInstance.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ camundaCaseInstance }: IRootState) => ({
  camundaCaseInstanceList: camundaCaseInstance.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamundaCaseInstance);
