import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './file-data-object.reducer';
import { IFileDataObject } from 'app/shared/model/file-data-object.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileDataObjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FileDataObjectDetail extends React.Component<IFileDataObjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fileDataObjectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="caseServiceApp.fileDataObject.detail.title">FileDataObject</Translate> [<b>{fileDataObjectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="cmisId">
                <Translate contentKey="caseServiceApp.fileDataObject.cmisId">Cmis Id</Translate>
              </span>
            </dt>
            <dd>{fileDataObjectEntity.cmisId}</dd>
            <dt>
              <span id="path">
                <Translate contentKey="caseServiceApp.fileDataObject.path">Path</Translate>
              </span>
            </dt>
            <dd>{fileDataObjectEntity.path}</dd>
          </dl>
          <Button tag={Link} to="/entity/file-data-object" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/file-data-object/${fileDataObjectEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ fileDataObject }: IRootState) => ({
  fileDataObjectEntity: fileDataObject.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileDataObjectDetail);
