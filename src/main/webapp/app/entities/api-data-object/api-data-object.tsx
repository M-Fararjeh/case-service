import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './api-data-object.reducer';
import { IApiDataObject } from 'app/shared/model/api-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApiDataObjectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ApiDataObject extends React.Component<IApiDataObjectProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { apiDataObjectList, match } = this.props;
    return (
      <div>
        <h2 id="api-data-object-heading">
          <Translate contentKey="caseServiceApp.apiDataObject.home.title">Api Data Objects</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="caseServiceApp.apiDataObject.home.createLabel">Create new Api Data Object</Translate>
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
                  <Translate contentKey="caseServiceApp.apiDataObject.method">Method</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.apiDataObject.url">Url</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.apiDataObject.body">Body</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {apiDataObjectList.map((apiDataObject, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${apiDataObject.id}`} color="link" size="sm">
                      {apiDataObject.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`caseServiceApp.ApiMethod.${apiDataObject.method}`} />
                  </td>
                  <td>{apiDataObject.url}</td>
                  <td>{apiDataObject.body}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${apiDataObject.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${apiDataObject.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${apiDataObject.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ apiDataObject }: IRootState) => ({
  apiDataObjectList: apiDataObject.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiDataObject);
