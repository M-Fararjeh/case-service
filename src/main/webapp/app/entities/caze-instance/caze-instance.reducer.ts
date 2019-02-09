import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICazeInstance, defaultValue } from 'app/shared/model/caze-instance.model';

export const ACTION_TYPES = {
  FETCH_CAZEINSTANCE_LIST: 'cazeInstance/FETCH_CAZEINSTANCE_LIST',
  FETCH_CAZEINSTANCE: 'cazeInstance/FETCH_CAZEINSTANCE',
  CREATE_CAZEINSTANCE: 'cazeInstance/CREATE_CAZEINSTANCE',
  UPDATE_CAZEINSTANCE: 'cazeInstance/UPDATE_CAZEINSTANCE',
  DELETE_CAZEINSTANCE: 'cazeInstance/DELETE_CAZEINSTANCE',
  RESET: 'cazeInstance/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICazeInstance>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CazeInstanceState = Readonly<typeof initialState>;

// Reducer

export default (state: CazeInstanceState = initialState, action): CazeInstanceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CAZEINSTANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CAZEINSTANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CAZEINSTANCE):
    case REQUEST(ACTION_TYPES.UPDATE_CAZEINSTANCE):
    case REQUEST(ACTION_TYPES.DELETE_CAZEINSTANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CAZEINSTANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CAZEINSTANCE):
    case FAILURE(ACTION_TYPES.CREATE_CAZEINSTANCE):
    case FAILURE(ACTION_TYPES.UPDATE_CAZEINSTANCE):
    case FAILURE(ACTION_TYPES.DELETE_CAZEINSTANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAZEINSTANCE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAZEINSTANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CAZEINSTANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_CAZEINSTANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CAZEINSTANCE):
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

const apiUrl = 'api/caze-instances';

// Actions

export const getEntities: ICrudGetAllAction<ICazeInstance> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CAZEINSTANCE_LIST,
    payload: axios.get<ICazeInstance>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICazeInstance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CAZEINSTANCE,
    payload: axios.get<ICazeInstance>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICazeInstance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CAZEINSTANCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICazeInstance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CAZEINSTANCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICazeInstance> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CAZEINSTANCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
