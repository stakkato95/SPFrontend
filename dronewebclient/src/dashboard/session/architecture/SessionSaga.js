import { all, put, takeLatest, select } from 'redux-saga/effects';

import { api } from '../../../api/ApiConfig';

import { toShortTime } from '../../../helper/CommonHelper';

import {
    setSessionAndDrone
} from './redux/SessionActions';
import {
    GET_SESSION_AND_DRONE
} from './redux/SessionActions';

function* getSessionAndDrone() {
    const state = yield select();

    let session = {};
    try {
        var serverResult = yield api().get('/session/getRunning');
        session = serverResult.data.payload;
        session.sessionStartTime = toShortTime(session.sessionStartTime);
    } catch (e) {
        console.log(e);
        //ignore
    }

    let drone = {};
    try {
        var serverResult = yield api().get(`/drone/${session.droneId}`);
        drone = serverResult.data.payload;
        console.log(drone);
    } catch (e) {
        console.log(e);
        //ignore
    }

    yield put(setSessionAndDrone(session, drone));
}

export function* sessionSaga() {
    yield all([
        yield takeLatest(GET_SESSION_AND_DRONE, getSessionAndDrone)
    ]);
}