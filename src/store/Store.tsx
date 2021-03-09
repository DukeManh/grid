import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import {
  BaseReducer,
  FilterReducer,
  RowReducer,
  SortReducer,
  initialState,
  InitialStateType,
} from './reducers';

const combineReducers = (...reducers: Function[]) => (
  state: any = initialState,
  action: any
): any => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

const storeReducers = combineReducers(
  BaseReducer,
  FilterReducer,
  RowReducer,
  SortReducer
);

const useValue = () => useReducer(storeReducers, initialState);

export const {
  Provider: StoreProvider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer<InitialStateType, React.Dispatch<any>, unknown>(useValue);