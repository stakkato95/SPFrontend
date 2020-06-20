import { all, put, takeLatest, select } from 'redux-saga/effects';

import { api } from '../../../api/ApiConfig';

import {
    setDrone
} from './redux/SessionActions';
import {
    GET_DRONE,
    SET_DRONE
} from './redux/SessionActions';

function* getDrone() {
    const state = yield select();

    try {
        //var serverResult = yield api().get(`/drone/${state.session.session.droneId}`);
        var serverResult = yield api().get('/drone/5eede157c4269317b428dedf');
        console.log('GET DRONE' + serverResult.data.payload);
        yield put(setDrone(serverResult.data.payload));
    } catch (e) {
        console.log(e);
        //ignore
    }
}

export function* sessionSaga() {
    yield all([
        yield takeLatest(GET_DRONE, getDrone)
    ]);
}