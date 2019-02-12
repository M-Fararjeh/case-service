import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/caze-instance">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.cazeInstance" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/caze-type">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.cazeType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/camunda-case-instance">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.camundaCaseInstance" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/camunda-process-instance">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.camundaProcessInstance" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/case-data-object">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.caseDataObject" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/api-data-object">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.apiDataObject" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/api-header">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.apiHeader" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/db-data-object">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.dbDataObject" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/file-data-object">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.fileDataObject" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/category">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;<Translate contentKey="global.menu.entities.category" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
