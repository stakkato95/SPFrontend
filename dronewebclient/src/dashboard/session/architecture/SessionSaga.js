import { all, put, takeLatest, select } from 'redux-saga/effects';

import { api } from '../../../api/ApiConfig';

import {
    setSessionAndDrone,
    addRunningAction,
    addAllRunningActions
} from './redux/SessionActions';
import {
    GET_SESSION_AND_DRONE_AND_ALL_RUNNING_ACTIONS,
    SEND_ACTION
} from './redux/SessionActions';

function* getSessionAndDroneAndRunningActions() {
    const state = yield select();

    let session = {};
    try {
        var serverResult = yield api().get('/session/getRunning');
        session = serverResult.data.payload;
    } catch (e) {
        console.log(e);
        //ignore
    }

    let drone = {};
    try {
        var serverResult = yield api().get(`/drone/${session.droneId}`);
        drone = serverResult.data.payload;
    } catch (e) {
        console.log(e);
        //ignore
    }

    try {
        var serverResult = yield api().get(`/action/getAllRunning/${session.id}`);
        console.log(serverResult.data);
        yield put(addAllRunningActions(serverResult.data.payload));
    } catch (e) {
        console.log(e);
        //ignore
    }

    yield put(setSessionAndDrone(session, drone));
}

function* sendAction(action) {
    const state = yield select();
    const sessionId = state.session.session.id;

    try {
        const startActionRequest = { 
            sessionId: sessionId, 
            actionType: action.actionType, 
            value: action.value
        };
        var serverResult = yield api().post('/action/start', startActionRequest);
        yield put(addRunningAction(serverResult.data.payload));
    } catch (e) {
        console.log(e);
        //ignore
    }
}

export function* sessionSaga() {
    yield all([
        yield takeLatest(GET_SESSION_AND_DRONE_AND_ALL_RUNNING_ACTIONS, getSessionAndDroneAndRunningActions),
        yield takeLatest(SEND_ACTION, sendAction)
    ]);
}