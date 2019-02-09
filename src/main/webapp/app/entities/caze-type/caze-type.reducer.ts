import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICazeType, defaultValue } from 'app/shared/model/caze-type.model';

export const ACTION_TYPES = {
  FETCH_CAZETYPE_LIST: 'cazeType/FETCH_CAZETYPE_LIST',
  FETCH_CAZETYPE: 'cazeType/FETCH_CAZETYPE',
  CREATE_CAZETYPE: 'cazeType/CREATE_CAZETYPE',
  UPDATE_CAZETYPE: 'cazeType/UPDATE_CAZETYPE',
  DELETE_CAZETYPE: 'cazeType/DELETE_CAZETYPE',
  RESET: 'cazeType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICazeType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CazeTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: CazeTypeState = initialState, action): CazeTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CAZETYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CAZETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CAZETYPE):
    case REQUEST(ACTION_TYPES.UPDATE_CAZETYPE):
    case REQUEST(ACTION_TYPES.DELETE_CAZETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CAZETYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CAZETYPE):
    case FAILURE(ACTION_TYPES.CREATE_CAZETYPE):
    case FAILURE(ACTION_TYPES.UPDATE_CAZETYPE):
    case FAILURE(ACTION_TYPES.DELETE_CAZETYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAZETYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAZETYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CAZETYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_CAZETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CAZETYPE):
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

const apiUrl = 'api/caze-types';

// Actions

export const getEntities: ICrudGetAllAction<ICazeType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CAZETYPE_LIST,
  payload: axios.get<ICazeType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICazeType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CAZETYPE,
    payload: axios.get<ICazeType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICazeType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CAZETYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICazeType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CAZETYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICazeType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CAZETYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
