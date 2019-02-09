import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './case-data-object.reducer';
import { ICaseDataObject } from 'app/shared/model/case-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICaseDataObjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CaseDataObjectDetail extends React.Component<ICaseDataObjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { caseDataObjectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="caseServiceApp.caseDataObject.detail.title">CaseDataObject</Translate> [<b>{caseDataObjectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">
                <Translate contentKey="caseServiceApp.caseDataObject.type">Type</Translate>
              </span>
            </dt>
            <dd>{caseDataObjectEntity.type}</dd>
            <dt>
              <span id="key">
                <Translate contentKey="caseServiceApp.caseDataObject.key">Key</Translate>
              </span>
            </dt>
            <dd>{caseDataObjectEntity.key}</dd>
            <dt>
              <Translate contentKey="caseServiceApp.caseDataObject.apiDataObject">Api Data Object</Translate>
            </dt>
            <dd>{caseDataObjectEntity.apiDataObject ? caseDataObjectEntity.apiDataObject.id : ''}</dd>
            <dt>
              <Translate contentKey="caseServiceApp.caseDataObject.dbDataObject">Db Data Object</Translate>
            </dt>
            <dd>{caseDataObjectEntity.dbDataObject ? caseDataObjectEntity.dbDataObject.id : ''}</dd>
            <dt>
              <Translate contentKey="caseServiceApp.caseDataObject.fileDataObject">File Data Object</Translate>
            </dt>
            <dd>{caseDataObjectEntity.fileDataObject ? caseDataObjectEntity.fileDataObject.id : ''}</dd>
            <dt>
              <Translate contentKey="caseServiceApp.caseDataObject.caseId">Case Id</Translate>
            </dt>
            <dd>{caseDataObjectEntity.caseId ? caseDataObjectEntity.caseId.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/case-data-object" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/case-data-object/${caseDataObjectEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ caseDataObject }: IRootState) => ({
  caseDataObjectEntity: caseDataObject.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseDataObjectDetail);
