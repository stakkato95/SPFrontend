import { all } from 'redux-saga/effects';

import { dronesSaga } from './DronesSaga';

export function* rootSaga() {
    yield all([
        dronesSaga()
    ]);
}