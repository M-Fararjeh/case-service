import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './api-data-object.reducer';
import { IApiDataObject } from 'app/shared/model/api-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApiDataObjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ApiDataObjectDetail extends React.Component<IApiDataObjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { apiDataObjectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="caseServiceApp.apiDataObject.detail.title">ApiDataObject</Translate> [<b>{apiDataObjectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="method">
                <Translate contentKey="caseServiceApp.apiDataObject.method">Method</Translate>
              </span>
            </dt>
            <dd>{apiDataObjectEntity.method}</dd>
            <dt>
              <span id="url">
                <Translate contentKey="caseServiceApp.apiDataObject.url">Url</Translate>
              </span>
            </dt>
            <dd>{apiDataObjectEntity.url}</dd>
            <dt>
              <span id="body">
                <Translate contentKey="caseServiceApp.apiDataObject.body">Body</Translate>
              </span>
            </dt>
            <dd>{apiDataObjectEntity.body}</dd>
          </dl>
          <Button tag={Link} to="/entity/api-data-object" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/api-data-object/${apiDataObjectEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ apiDataObject }: IRootState) => ({
  apiDataObjectEntity: apiDataObject.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiDataObjectDetail);
