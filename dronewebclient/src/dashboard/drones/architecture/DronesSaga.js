import { all, put, takeLatest, select } from 'redux-saga/effects';

import { api } from '../../../api/ApiConfig';

import { toShortTime } from '../../../helper/CommonHelper';

import {
    setRegisteredDrones,
    setUnregisteredDrones,
    setNewRegisteredDrone,
    setDroneRegistrationInProgress,
    setRegisterDroneDialogVisible
} from './redux/DroneActions';
import {
    GET_REGISTERED_DRONES,
    GET_UNREGISTERED_DRONES,
    REGISTER_DRONE  
} from './redux/DroneActions';

function* getRegistered() {
    try {
        var serverResult = yield api().get('/drone/getAllRegistered');
        serverResult.data.forEach(e => {
            e.showUpTime = toShortTime(e.showUpTime);
            e.registrationTime = toShortTime(e.registrationTime);
            e.lastConnectionTime = toShortTime(e.lastConnectionTime);
            e.lastSeenTime = toShortTime(e.lastSeenTime);
        });
        yield put(setRegisteredDrones(serverResult.data));
    } catch (e) {
        console.log(e);
        //ignore
    }
}

function* getUnregistered() {
    try {
        var serverResult = yield api().get('/drone/getAllUnregistered');
        yield put(setUnregisteredDrones(serverResult.data));
    } catch (e) {
        console.log(e);
        //ignore
    }
}

function* registerDrone() {
    yield put(setDroneRegistrationInProgress(true));

    const state = yield select();
    try {
        const registration = { unregisteredId: state.drone.selectedUnregisteredDroneId, name: state.drone.newDroneName };
        var serverResult = yield api().post('/drone/registerNew', registration);
        if (serverResult.data.successful) {
            yield put(setNewRegisteredDrone(state.drone.selectedUnregisteredDroneId, serverResult.data.payload));
        } else {
            //TODO
        }
    } catch (e) {
        console.log(e);
        //TODO
    }

    if (state.drone.newDroneSessionAutoStart) {
        try {
            const sessionInit = { droneId: serverResult.data.payload.id };
            var serverResult = yield api().post('/session/startSession', sessionInit);
            if (serverResult.data.successful) {
                //TODO
            } else {
                //TODO
            }
        } catch (e) {
            console.log(e);
            //TODO
        }
    }

    yield put(setDroneRegistrationInProgress(false));
    yield put(setRegisterDroneDialogVisible(false));
}

export function* dronesSaga() {
    yield all([
        yield takeLatest(GET_REGISTERED_DRONES, getRegistered),
        yield takeLatest(GET_UNREGISTERED_DRONES, getUnregistered),
        yield takeLatest(REGISTER_DRONE, registerDrone)
    ]);
}