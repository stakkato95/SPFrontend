import { createStore, combineReducers, applyMiddleware } from 'redux';
import { droneReducer } from '../dashboard/drones/architecture/redux/DroneReducer';
import { sessionReducer } from '../dashboard/session/architecture/redux/SessionReducer';

import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './RootSaga';

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