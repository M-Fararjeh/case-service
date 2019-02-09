import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDbDataObject, defaultValue } from 'app/shared/model/db-data-object.model';

export const ACTION_TYPES = {
  FETCH_DBDATAOBJECT_LIST: 'dbDataObject/FETCH_DBDATAOBJECT_LIST',
  FETCH_DBDATAOBJECT: 'dbDataObject/FETCH_DBDATAOBJECT',
  CREATE_DBDATAOBJECT: 'dbDataObject/CREATE_DBDATAOBJECT',
  UPDATE_DBDATAOBJECT: 'dbDataObject/UPDATE_DBDATAOBJECT',
  DELETE_DBDATAOBJECT: 'dbDataObject/DELETE_DBDATAOBJECT',
  RESET: 'dbDataObject/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDbDataObject>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DbDataObjectState = Readonly<typeof initialState>;

// Reducer

export default (state: DbDataObjectState = initialState, action): DbDataObjectState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DBDATAOBJECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DBDATAOBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DBDATAOBJECT):
    case REQUEST(ACTION_TYPES.UPDATE_DBDATAOBJECT):
    case REQUEST(ACTION_TYPES.DELETE_DBDATAOBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DBDATAOBJECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DBDATAOBJECT):
    case FAILURE(ACTION_TYPES.CREATE_DBDATAOBJECT):
    case FAILURE(ACTION_TYPES.UPDATE_DBDATAOBJECT):
    case FAILURE(ACTION_TYPES.DELETE_DBDATAOBJECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DBDATAOBJECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DBDATAOBJECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DBDATAOBJECT):
    case SUCCESS(ACTION_TYPES.UPDATE_DBDATAOBJECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DBDATAOBJECT):
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

const apiUrl = 'api/db-data-objects';

// Actions

export const getEntities: ICrudGetAllAction<IDbDataObject> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DBDATAOBJECT_LIST,
  payload: axios.get<IDbDataObject>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDbDataObject> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DBDATAOBJECT,
    payload: axios.get<IDbDataObject>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDbDataObject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DBDATAOBJECT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDbDataObject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DBDATAOBJECT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDbDataObject> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DBDATAOBJECT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
