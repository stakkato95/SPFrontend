import { createStore, applyMiddleware } from 'redux';
import { Reducer, initialState } from './Reducer';

import createSagaMiddleware from 'redux-saga';

import { dronesSaga } from '../saga/DroneSaga';

export const ConfigureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(Reducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(dronesSaga);
    return store;
};