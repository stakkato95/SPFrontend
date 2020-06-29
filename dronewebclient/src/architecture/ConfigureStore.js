import { createStore, combineReducers, applyMiddleware } from 'redux';
import { droneReducer } from '../dashboard/drones/architecture/redux/DroneReducer';
import { sessionReducer } from '../dashboard/session/architecture/redux/SessionReducer';
import { telemetryReducer } from '../dashboard/session/telemetry/architecture/redux/TelemetryReducer';
import { historyReducer } from '../dashboard/history/architecture/redux/HistoryReducer';

import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './RootSaga';

export const ConfigureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const reducers = combineReducers({
        drone: droneReducer,
        session: sessionReducer,
        telemetry: telemetryReducer,
        history: historyReducer
    });

    const store = createStore(reducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    return store;
};