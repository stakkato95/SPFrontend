import { all } from 'redux-saga/effects';

import { dronesSaga } from '../dashboard/drones/architecture/DronesSaga';
import { sessionSaga } from '../dashboard/session/architecture/SessionSaga';
import { telemetrySaga } from '../dashboard/session/telemetry/architecture/TelemetrySaga';

export function* rootSaga() {
    yield all([
        dronesSaga(),
        sessionSaga(),
        telemetrySaga()
    ]);
}