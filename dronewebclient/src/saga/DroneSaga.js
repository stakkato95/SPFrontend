import { all, put, takeLatest, select } from 'redux-saga/effects';

import axios from 'axios';

import {
    setRegisteredDrones,
    setUnregisteredDrones,
    setNewRegisteredDrone,
    setDroneRegistrationInProgress
} from '../redux/DroneActions';
import { GET_REGISTERED_DRONES, GET_UNREGISTERED_DRONES, REGISTER_DRONE } from '../redux/DroneActions';

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

function* registerDrone() {
    yield put(setDroneRegistrationInProgress(true));
    const state = select();

    try {
        
        const registration = { unregisteredId: state.selectedUnregisteredDroneId, name: state.newDroneName };
        var serverResult = yield axios.post('http://localhost:8080/api/drone/registerNew', registration);
        yield put(setNewRegisteredDrone(state.selectedUnregisteredDroneId, serverResult ));
    } catch (e) {
        console.log(e);
        //ignore
    }

    if (state.newDroneSessionAutoStart) {
        try {
            const sessionInit = {};
            //TODO start new session
            //var serverResult = yield axios.post('http://localhost:8080/api/session/startNew', sessionInit);
        } catch (e) {
            console.log(e);
        }
    }

    yield put(setDroneRegistrationInProgress(false));
}

export function* dronesSaga() {
    yield all([
        yield takeLatest(GET_REGISTERED_DRONES, getRegistered),
        yield takeLatest(GET_UNREGISTERED_DRONES, getUnregistered),
        yield takeLatest(REGISTER_DRONE, registerDrone)
    ]);
}