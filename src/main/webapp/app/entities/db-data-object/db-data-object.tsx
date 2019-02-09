import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './db-data-object.reducer';
import { IDbDataObject } from 'app/shared/model/db-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDbDataObjectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class DbDataObject extends React.Component<IDbDataObjectProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { dbDataObjectList, match } = this.props;
    return (
      <div>
        <h2 id="db-data-object-heading">
          <Translate contentKey="caseServiceApp.dbDataObject.home.title">Db Data Objects</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="caseServiceApp.dbDataObject.home.createLabel">Create new Db Data Object</Translate>
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
                  <Translate contentKey="caseServiceApp.dbDataObject.tableName">Table Name</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.dbDataObject.columnName">Column Name</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.dbDataObject.columnValue">Column Value</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dbDataObjectList.map((dbDataObject, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dbDataObject.id}`} color="link" size="sm">
                      {dbDataObject.id}
                    </Button>
                  </td>
                  <td>{dbDataObject.tableName}</td>
                  <td>{dbDataObject.columnName}</td>
                  <td>{dbDataObject.columnValue}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dbDataObject.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dbDataObject.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dbDataObject.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ dbDataObject }: IRootState) => ({
  dbDataObjectList: dbDataObject.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DbDataObject);
