import { createStore, combineReducers, applyMiddleware } from 'redux';
import { droneReducer } from '../dashboard/drones/architecture/redux/DroneReducer';
import { sessionReducer } from './SessionReducer';

import createSagaMiddleware from 'redux-saga';

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