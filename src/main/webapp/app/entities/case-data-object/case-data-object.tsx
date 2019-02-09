import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './case-data-object.reducer';
import { ICaseDataObject } from 'app/shared/model/case-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICaseDataObjectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CaseDataObject extends React.Component<ICaseDataObjectProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { caseDataObjectList, match } = this.props;
    return (
      <div>
        <h2 id="case-data-object-heading">
          <Translate contentKey="caseServiceApp.caseDataObject.home.title">Case Data Objects</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="caseServiceApp.caseDataObject.home.createLabel">Create new Case Data Object</Translate>
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
                  <Translate contentKey="caseServiceApp.caseDataObject.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.caseDataObject.key">Key</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.caseDataObject.apiDataObject">Api Data Object</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.caseDataObject.dbDataObject">Db Data Object</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.caseDataObject.fileDataObject">File Data Object</Translate>
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.caseDataObject.caseId">Case Id</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {caseDataObjectList.map((caseDataObject, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${caseDataObject.id}`} color="link" size="sm">
                      {caseDataObject.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`caseServiceApp.DataObjectType.${caseDataObject.type}`} />
                  </td>
                  <td>{caseDataObject.key}</td>
                  <td>
                    {caseDataObject.apiDataObject ? (
                      <Link to={`api-data-object/${caseDataObject.apiDataObject.id}`}>{caseDataObject.apiDataObject.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {caseDataObject.dbDataObject ? (
                      <Link to={`db-data-object/${caseDataObject.dbDataObject.id}`}>{caseDataObject.dbDataObject.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {caseDataObject.fileDataObject ? (
                      <Link to={`file-data-object/${caseDataObject.fileDataObject.id}`}>{caseDataObject.fileDataObject.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {caseDataObject.caseId ? <Link to={`caze-instance/${caseDataObject.caseId.id}`}>{caseDataObject.caseId.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${caseDataObject.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${caseDataObject.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${caseDataObject.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ caseDataObject }: IRootState) => ({
  caseDataObjectList: caseDataObject.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseDataObject);
