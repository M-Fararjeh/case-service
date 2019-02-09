import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApiHeader, defaultValue } from 'app/shared/model/api-header.model';

export const ACTION_TYPES = {
  FETCH_APIHEADER_LIST: 'apiHeader/FETCH_APIHEADER_LIST',
  FETCH_APIHEADER: 'apiHeader/FETCH_APIHEADER',
  CREATE_APIHEADER: 'apiHeader/CREATE_APIHEADER',
  UPDATE_APIHEADER: 'apiHeader/UPDATE_APIHEADER',
  DELETE_APIHEADER: 'apiHeader/DELETE_APIHEADER',
  RESET: 'apiHeader/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApiHeader>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ApiHeaderState = Readonly<typeof initialState>;

// Reducer

export default (state: ApiHeaderState = initialState, action): ApiHeaderState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APIHEADER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APIHEADER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_APIHEADER):
    case REQUEST(ACTION_TYPES.UPDATE_APIHEADER):
    case REQUEST(ACTION_TYPES.DELETE_APIHEADER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_APIHEADER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APIHEADER):
    case FAILURE(ACTION_TYPES.CREATE_APIHEADER):
    case FAILURE(ACTION_TYPES.UPDATE_APIHEADER):
    case FAILURE(ACTION_TYPES.DELETE_APIHEADER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIHEADER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIHEADER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_APIHEADER):
    case SUCCESS(ACTION_TYPES.UPDATE_APIHEADER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_APIHEADER):
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

const apiUrl = 'api/api-headers';

// Actions

export const getEntities: ICrudGetAllAction<IApiHeader> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_APIHEADER_LIST,
  payload: axios.get<IApiHeader>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IApiHeader> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APIHEADER,
    payload: axios.get<IApiHeader>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IApiHeader> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APIHEADER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApiHeader> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APIHEADER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApiHeader> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APIHEADER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
