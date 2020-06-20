import { createStore, combineReducers, applyMiddleware } from 'redux';
import { droneReducer, droneInitialState } from './DroneReducer';
import { sessionReducer, sessionInitialState } from './SessionReducer';

import createSagaMiddleware from 'redux-saga';

import { dronesSaga } from '../saga/DronesSaga';
import { rootSaga } from '../saga/RootSaga';

export const ConfigureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const reducers = combineReducers({
        drone: droneReducer,
        session: sessionReducer
    });

    const store = createStore(reducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    return store;
};