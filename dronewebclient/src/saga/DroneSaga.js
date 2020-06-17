import { all, put, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

import { setRegisteredDrones, setUnregisteredDrones } from '../redux/DroneActions';
import { GET_REGISTERED_DRONES, GET_UNREGISTERED_DRONES } from '../redux/DroneActions';

function* getRegistered() {
    try {
        var serverResult = yield axios.get('http://localhost:8080/api/drone/getAllRegistered');
        // yield put(setRegisteredDrones(serverResult.data));
    } catch (e) {
        console.log(e);
        //ignore
    }
}

function* getUnregistered() {
    try {
        var serverResult = yield axios.get('http://localhost:8080/api/drone/getAllUnregistered');
        yield put(setUnregisteredDrones(serverResult.data));
    } catch (e) {
        console.log(e);
        //ignore
    }
}

export function* dronesSaga() {
    yield all([
        yield takeLatest(GET_REGISTERED_DRONES, getRegistered),
        yield takeLatest(GET_UNREGISTERED_DRONES, getUnregistered)
    ]);
}