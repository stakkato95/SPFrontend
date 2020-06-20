import { all } from 'redux-saga/effects';

import { dronesSaga } from '../dashboard/drones/architecture/DronesSaga';

export function* rootSaga() {
    yield all([
        dronesSaga()
    ]);
}