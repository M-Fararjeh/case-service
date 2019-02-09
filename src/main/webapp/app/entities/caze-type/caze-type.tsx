import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './caze-type.reducer';
import { ICazeType } from 'app/shared/model/caze-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICazeTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CazeType extends React.Component<ICazeTypeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { cazeTypeList, match } = this.props;
    return (
      <div>
        <h2 id="caze-type-heading">
          <Translate contentKey="caseServiceApp.cazeType.home.title">Caze Types</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="caseServiceApp.cazeType.home.createLabel">Create new Caze Type</Translate>
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
                  <Translate contentKey="caseServiceApp.cazeType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.cazeType.priority">Priority</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.cazeType.requiredTime">Required Time</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.cazeType.secured">Secured</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cazeTypeList.map((cazeType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cazeType.id}`} color="link" size="sm">
                      {cazeType.id}
                    </Button>
                  </td>
                  <td>{cazeType.name}</td>
                  <td>
                    <Translate contentKey={`caseServiceApp.CasePriority.${cazeType.priority}`} />
                  </td>
                  <td>{cazeType.requiredTime}</td>
                  <td>{cazeType.secured ? 'true' : 'false'}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cazeType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cazeType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cazeType.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ cazeType }: IRootState) => ({
  cazeTypeList: cazeType.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CazeType);
