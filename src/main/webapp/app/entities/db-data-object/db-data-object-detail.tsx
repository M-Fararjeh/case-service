import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './db-data-object.reducer';
import { IDbDataObject } from 'app/shared/model/db-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDbDataObjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DbDataObjectDetail extends React.Component<IDbDataObjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dbDataObjectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="caseServiceApp.dbDataObject.detail.title">DbDataObject</Translate> [<b>{dbDataObjectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tableName">
                <Translate contentKey="caseServiceApp.dbDataObject.tableName">Table Name</Translate>
              </span>
            </dt>
            <dd>{dbDataObjectEntity.tableName}</dd>
            <dt>
              <span id="columnName">
                <Translate contentKey="caseServiceApp.dbDataObject.columnName">Column Name</Translate>
              </span>
            </dt>
            <dd>{dbDataObjectEntity.columnName}</dd>
            <dt>
              <span id="columnValue">
                <Translate contentKey="caseServiceApp.dbDataObject.columnValue">Column Value</Translate>
              </span>
            </dt>
            <dd>{dbDataObjectEntity.columnValue}</dd>
          </dl>
          <Button tag={Link} to="/entity/db-data-object" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/db-data-object/${dbDataObjectEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ dbDataObject }: IRootState) => ({
  dbDataObjectEntity: dbDataObject.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DbDataObjectDetail);
