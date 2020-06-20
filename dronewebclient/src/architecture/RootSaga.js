import { all } from 'redux-saga/effects';

import { dronesSaga } from '../dashboard/drones/architecture/DronesSaga';
import { sessionSaga } from '../dashboard/session/architecture/SessionSaga';

export function* rootSaga() {
    yield all([
        dronesSaga(),
        sessionSaga()
    ]);
}