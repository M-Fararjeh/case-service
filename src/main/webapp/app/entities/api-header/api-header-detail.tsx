import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './api-header.reducer';
import { IApiHeader } from 'app/shared/model/api-header.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApiHeaderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ApiHeaderDetail extends React.Component<IApiHeaderDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { apiHeaderEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="caseServiceApp.apiHeader.detail.title">ApiHeader</Translate> [<b>{apiHeaderEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="key">
                <Translate contentKey="caseServiceApp.apiHeader.key">Key</Translate>
              </span>
            </dt>
            <dd>{apiHeaderEntity.key}</dd>
            <dt>
              <span id="value">
                <Translate contentKey="caseServiceApp.apiHeader.value">Value</Translate>
              </span>
            </dt>
            <dd>{apiHeaderEntity.value}</dd>
            <dt>
              <Translate contentKey="caseServiceApp.apiHeader.apiDataObject">Api Data Object</Translate>
            </dt>
            <dd>{apiHeaderEntity.apiDataObject ? apiHeaderEntity.apiDataObject.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/api-header" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/api-header/${apiHeaderEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ apiHeader }: IRootState) => ({
  apiHeaderEntity: apiHeader.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiHeaderDetail);
