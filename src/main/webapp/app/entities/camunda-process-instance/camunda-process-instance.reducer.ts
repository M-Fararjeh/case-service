import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICamundaProcessInstance, defaultValue } from 'app/shared/model/camunda-process-instance.model';

export const ACTION_TYPES = {
  FETCH_CAMUNDAPROCESSINSTANCE_LIST: 'camundaProcessInstance/FETCH_CAMUNDAPROCESSINSTANCE_LIST',
  FETCH_CAMUNDAPROCESSINSTANCE: 'camundaProcessInstance/FETCH_CAMUNDAPROCESSINSTANCE',
  CREATE_CAMUNDAPROCESSINSTANCE: 'camundaProcessInstance/CREATE_CAMUNDAPROCESSINSTANCE',
  UPDATE_CAMUNDAPROCESSINSTANCE: 'camundaProcessInstance/UPDATE_CAMUNDAPROCESSINSTANCE',
  DELETE_CAMUNDAPROCESSINSTANCE: 'camundaProcessInstance/DELETE_CAMUNDAPROCESSINSTANCE',
  RESET: 'camundaProcessInstance/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICamundaProcessInstance>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CamundaProcessInstanceState = Readonly<typeof initialState>;

// Reducer

export default (state: CamundaProcessInstanceState = initialState, action): CamundaProcessInstanceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CAMUNDAPROCESSINSTANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CAMUNDAPROCESSINSTANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CAMUNDAPROCESSINSTANCE):
    case REQUEST(ACTION_TYPES.UPDATE_CAMUNDAPROCESSINSTANCE):
    case REQUEST(ACTION_TYPES.DELETE_CAMUNDAPROCESSINSTANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CAMUNDAPROCESSINSTANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CAMUNDAPROCESSINSTANCE):
    case FAILURE(ACTION_TYPES.CREATE_CAMUNDAPROCESSINSTANCE):
    case FAILURE(ACTION_TYPES.UPDATE_CAMUNDAPROCESSINSTANCE):
    case FAILURE(ACTION_TYPES.DELETE_CAMUNDAPROCESSINSTANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAMUNDAPROCESSINSTANCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CAMUNDAPROCESSINSTANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CAMUNDAPROCESSINSTANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_CAMUNDAPROCESSINSTANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CAMUNDAPROCESSINSTANCE):
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

const apiUrl = 'api/camunda-process-instances';

// Actions

export const getEntities: ICrudGetAllAction<ICamundaProcessInstance> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CAMUNDAPROCESSINSTANCE_LIST,
  payload: axios.get<ICamundaProcessInstance>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICamundaProcessInstance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CAMUNDAPROCESSINSTANCE,
    payload: axios.get<ICamundaProcessInstance>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICamundaProcessInstance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CAMUNDAPROCESSINSTANCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICamundaProcessInstance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CAMUNDAPROCESSINSTANCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICamundaProcessInstance> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CAMUNDAPROCESSINSTANCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
