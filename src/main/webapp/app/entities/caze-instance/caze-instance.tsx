import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './caze-instance.reducer';
import { ICazeInstance } from 'app/shared/model/caze-instance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICazeInstanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ICazeInstanceState = IPaginationBaseState;

export class CazeInstance extends React.Component<ICazeInstanceProps, ICazeInstanceState> {
  state: ICazeInstanceState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { cazeInstanceList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="caze-instance-heading">
          <Translate contentKey="caseServiceApp.cazeInstance.home.title">Caze Instances</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="caseServiceApp.cazeInstance.home.createLabel">Create new Caze Instance</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('name')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('description')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('number')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.number">Number</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('creatorId')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.creatorId">Creator Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('issuerID')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.issuerID">Issuer ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('creationDate')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.creationDate">Creation Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('caseDate')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.caseDate">Case Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('priority')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.priority">Priority</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('requiredTime')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.requiredTime">Required Time</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('secured')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.secured">Secured</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cmmnId')}>
                  <Translate contentKey="caseServiceApp.cazeInstance.cmmnId">Cmmn Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.cazeInstance.cazeType">Caze Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="caseServiceApp.cazeInstance.relatedCaze">Related Caze</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cazeInstanceList.map((cazeInstance, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cazeInstance.id}`} color="link" size="sm">
                      {cazeInstance.id}
                    </Button>
                  </td>
                  <td>{cazeInstance.name}</td>
                  <td>{cazeInstance.description}</td>
                  <td>{cazeInstance.number}</td>
                  <td>{cazeInstance.creatorId}</td>
                  <td>{cazeInstance.issuerID}</td>
                  <td>
                    <TextFormat type="date" value={cazeInstance.creationDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={cazeInstance.caseDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <Translate contentKey={`caseServiceApp.CasePriority.${cazeInstance.priority}`} />
                  </td>
                  <td>{cazeInstance.requiredTime}</td>
                  <td>{cazeInstance.secured ? 'true' : 'false'}</td>
                  <td>{cazeInstance.cmmnId}</td>
                  <td>
                    {cazeInstance.cazeType ? <Link to={`caze-type/${cazeInstance.cazeType.id}`}>{cazeInstance.cazeType.id}</Link> : ''}
                  </td>
                  <td>
                    {cazeInstance.relatedCaze ? (
                      <Link to={`caze-instance/${cazeInstance.relatedCaze.id}`}>{cazeInstance.relatedCaze.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cazeInstance.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cazeInstance.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cazeInstance.id}/delete`} color="danger" size="sm">
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
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ cazeInstance }: IRootState) => ({
  cazeInstanceList: cazeInstance.entities,
  totalItems: cazeInstance.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CazeInstance);
