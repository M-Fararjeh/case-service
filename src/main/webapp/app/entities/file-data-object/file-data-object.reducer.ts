import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFileDataObject, defaultValue } from 'app/shared/model/file-data-object.model';

export const ACTION_TYPES = {
  FETCH_FILEDATAOBJECT_LIST: 'fileDataObject/FETCH_FILEDATAOBJECT_LIST',
  FETCH_FILEDATAOBJECT: 'fileDataObject/FETCH_FILEDATAOBJECT',
  CREATE_FILEDATAOBJECT: 'fileDataObject/CREATE_FILEDATAOBJECT',
  UPDATE_FILEDATAOBJECT: 'fileDataObject/UPDATE_FILEDATAOBJECT',
  DELETE_FILEDATAOBJECT: 'fileDataObject/DELETE_FILEDATAOBJECT',
  RESET: 'fileDataObject/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFileDataObject>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FileDataObjectState = Readonly<typeof initialState>;

// Reducer

export default (state: FileDataObjectState = initialState, action): FileDataObjectState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FILEDATAOBJECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILEDATAOBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FILEDATAOBJECT):
    case REQUEST(ACTION_TYPES.UPDATE_FILEDATAOBJECT):
    case REQUEST(ACTION_TYPES.DELETE_FILEDATAOBJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FILEDATAOBJECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILEDATAOBJECT):
    case FAILURE(ACTION_TYPES.CREATE_FILEDATAOBJECT):
    case FAILURE(ACTION_TYPES.UPDATE_FILEDATAOBJECT):
    case FAILURE(ACTION_TYPES.DELETE_FILEDATAOBJECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILEDATAOBJECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILEDATAOBJECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILEDATAOBJECT):
    case SUCCESS(ACTION_TYPES.UPDATE_FILEDATAOBJECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILEDATAOBJECT):
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

const apiUrl = 'api/file-data-objects';

// Actions

export const getEntities: ICrudGetAllAction<IFileDataObject> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FILEDATAOBJECT_LIST,
  payload: axios.get<IFileDataObject>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFileDataObject> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILEDATAOBJECT,
    payload: axios.get<IFileDataObject>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFileDataObject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILEDATAOBJECT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFileDataObject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILEDATAOBJECT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFileDataObject> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILEDATAOBJECT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
