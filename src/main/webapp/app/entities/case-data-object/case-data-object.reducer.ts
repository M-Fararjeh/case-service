import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICaseDataObject, defaultValue } from 'app/shared/model/case-data-object.model';

export const ACTION_TYPES = {
  FETCH_CASEDATAOBJECT_LIST: 'caseDataObject/FETCH_CASEDATAOBJECT_LIST',
  FETCH_CASEDATAOBJECT: 'caseDataObject/FETCH_CASEDATAOBJECT',
  CREATE_CASEDATAOBJECT: 'caseDataObject/CREATE_CASEDATAOBJECT',
  UPDATE_CASEDATAOBJECT: 'caseDataObject/UPDATE_CASEDATAOBJECT',
  DELETE_CASEDATAOBJECT: 'caseDataObject/DELETE_CASEDATAOBJECT',
  RESET: 'caseDataObject/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICaseDataObject>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CaseDataObjectState = Readonly<typeof initialState>;

// Reducer

export default (state: CaseDataObjectState = initialState, action): CaseDataObjectState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CASEDATAOBJECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CASEDATAOBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CASEDATAOBJECT):
    case REQUEST(ACTION_TYPES.UPDATE_CASEDATAOBJECT):
    case REQUEST(ACTION_TYPES.DELETE_CASEDATAOBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CASEDATAOBJECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CASEDATAOBJECT):
    case FAILURE(ACTION_TYPES.CREATE_CASEDATAOBJECT):
    case FAILURE(ACTION_TYPES.UPDATE_CASEDATAOBJECT):
    case FAILURE(ACTION_TYPES.DELETE_CASEDATAOBJECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CASEDATAOBJECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CASEDATAOBJECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CASEDATAOBJECT):
    case SUCCESS(ACTION_TYPES.UPDATE_CASEDATAOBJECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CASEDATAOBJECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/case-data-objects';

// Actions

export const getEntities: ICrudGetAllAction<ICaseDataObject> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CASEDATAOBJECT_LIST,
  payload: axios.get<ICaseDataObject>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICaseDataObject> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CASEDATAOBJECT,
    payload: axios.get<ICaseDataObject>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICaseDataObject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CASEDATAOBJECT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICaseDataObject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CASEDATAOBJECT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICaseDataObject> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CASEDATAOBJECT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
