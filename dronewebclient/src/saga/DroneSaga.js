import { all, put, takeLatest, select } from 'redux-saga/effects';

import axios from 'axios';

import { sleep } from '../helper/CommonHelper';

import {
    setRegisteredDrones,
    setUnregisteredDrones,
    setNewRegisteredDrone,
    setDroneRegistrationInProgress,
    setRegisterDroneDialogVisible
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
    yield sleep(2000);

    const state = yield select();
    try {
        const registration = { unregisteredId: state.selectedUnregisteredDroneId, name: state.newDroneName };
        var serverResult = yield axios.post('http://localhost:8080/api/drone/registerNew', registration);
        if (serverResult.data.successful) {
            console.log('CALLED');
            yield put(setNewRegisteredDrone(state.selectedUnregisteredDroneId, serverResult.data.payload));
        } else {
            //TODO
        }
    } catch (e) {
        console.log(e);
        //TODO
    }

    if (state.newDroneSessionAutoStart) {
        try {
            const sessionInit = {};
            //TODO start new session
            //var serverResult = yield axios.post('http://localhost:8080/api/session/startNew', sessionInit);
            // if (serverResult.successful) {

            // } else {

            // }
        } catch (e) {
            console.log(e);
            //TODO
        }
    }

    yield put(setDroneRegistrationInProgress(false));
    yield put(setRegisterDroneDialogVisible(false));



    //TODO RESET NAME TO EMPTY, RESET UNREGISTEREDID TO EMPTY
}

export function* dronesSaga() {
    yield all([
        yield takeLatest(GET_REGISTERED_DRONES, getRegistered),
        yield takeLatest(GET_UNREGISTERED_DRONES, getUnregistered),
        yield takeLatest(REGISTER_DRONE, registerDrone)
    ]);
}