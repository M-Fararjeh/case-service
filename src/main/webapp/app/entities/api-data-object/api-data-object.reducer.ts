import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApiDataObject, defaultValue } from 'app/shared/model/api-data-object.model';

export const ACTION_TYPES = {
  FETCH_APIDATAOBJECT_LIST: 'apiDataObject/FETCH_APIDATAOBJECT_LIST',
  FETCH_APIDATAOBJECT: 'apiDataObject/FETCH_APIDATAOBJECT',
  CREATE_APIDATAOBJECT: 'apiDataObject/CREATE_APIDATAOBJECT',
  UPDATE_APIDATAOBJECT: 'apiDataObject/UPDATE_APIDATAOBJECT',
  DELETE_APIDATAOBJECT: 'apiDataObject/DELETE_APIDATAOBJECT',
  RESET: 'apiDataObject/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApiDataObject>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ApiDataObjectState = Readonly<typeof initialState>;

// Reducer

export default (state: ApiDataObjectState = initialState, action): ApiDataObjectState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APIDATAOBJECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APIDATAOBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_APIDATAOBJECT):
    case REQUEST(ACTION_TYPES.UPDATE_APIDATAOBJECT):
    case REQUEST(ACTION_TYPES.DELETE_APIDATAOBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_APIDATAOBJECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APIDATAOBJECT):
    case FAILURE(ACTION_TYPES.CREATE_APIDATAOBJECT):
    case FAILURE(ACTION_TYPES.UPDATE_APIDATAOBJECT):
    case FAILURE(ACTION_TYPES.DELETE_APIDATAOBJECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIDATAOBJECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIDATAOBJECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_APIDATAOBJECT):
    case SUCCESS(ACTION_TYPES.UPDATE_APIDATAOBJECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_APIDATAOBJECT):
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

const apiUrl = 'api/api-data-objects';

// Actions

export const getEntities: ICrudGetAllAction<IApiDataObject> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_APIDATAOBJECT_LIST,
  payload: axios.get<IApiDataObject>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IApiDataObject> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APIDATAOBJECT,
    payload: axios.get<IApiDataObject>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IApiDataObject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APIDATAOBJECT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApiDataObject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APIDATAOBJECT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApiDataObject> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APIDATAOBJECT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
