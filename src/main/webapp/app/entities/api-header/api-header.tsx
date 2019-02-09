import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './api-header.reducer';
import { IApiHeader } from 'app/shared/model/api-header.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApiHeaderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ApiHeader extends React.Component<IApiHeaderProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { apiHeaderList, match } = this.props;
    return (
      <div>
        <h2 id="api-header-heading">
          <Translate contentKey="caseServiceApp.apiHeader.home.title">Api Headers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="caseServiceApp.apiHeader.home.createLabel">Create new Api Header</Translate>
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
                  <Translate contentKey="caseServiceApp.apiHeader.key">Key</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.apiHeader.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.apiHeader.apiDataObject">Api Data Object</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {apiHeaderList.map((apiHeader, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${apiHeader.id}`} color="link" size="sm">
                      {apiHeader.id}
                    </Button>
                  </td>
                  <td>{apiHeader.key}</td>
                  <td>{apiHeader.value}</td>
                  <td>
                    {apiHeader.apiDataObject ? (
                      <Link to={`api-data-object/${apiHeader.apiDataObject.id}`}>{apiHeader.apiDataObject.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${apiHeader.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${apiHeader.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${apiHeader.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ apiHeader }: IRootState) => ({
  apiHeaderList: apiHeader.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiHeader);
