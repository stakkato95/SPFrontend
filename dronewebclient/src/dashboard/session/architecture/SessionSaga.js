import { all, put, takeLatest, select, call, take } from 'redux-saga/effects';
import { api } from '../../../api/ApiConfig';
import { getSseChannel } from './EventStream';
import { ActionState } from '../../../model/ActionState';

import {
    setSessionAndDrone,
    addRunningAction,
    addAllRunningActions,
    setActionRunning,
    setActionFinished
} from './redux/SessionActions';
import {
    GET_SESSION_AND_DRONE_AND_ALL_RUNNING_ACTIONS,
    SEND_ACTION,
    LISTEN_ACTION_SSE
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
        console.log(action);
        const startActionRequest = {
            sessionId: sessionId,
            actionType: action.actionType,
            value: action.value
        };
        var serverResult = yield api().post('/action/start', startActionRequest);
        //yield put(addRunningAction(serverResult.data.payload));
    } catch (e) {
        console.log(e);
        //ignore
    }
}

function* listenActionSse() {
    const eventSrc = new EventSource('http://localhost:8080/api/action/getUpdates');
    const channel = yield call(getSseChannel, eventSrc);
    while (true) {
        const msg = yield take(channel);
        const action = JSON.parse(msg.data);
        switch (action.actionState) {
            case ActionState.RUNNING:
                yield put(setActionRunning(action));
                break;
            case ActionState.FINISHED:
                yield put(setActionFinished(action));
                break;
            case ActionState.INTERRUPTED:

                break;
        }
    }
}

export function* sessionSaga() {
    yield all([
        yield takeLatest(GET_SESSION_AND_DRONE_AND_ALL_RUNNING_ACTIONS, getSessionAndDroneAndRunningActions),
        yield takeLatest(SEND_ACTION, sendAction),
        yield takeLatest(LISTEN_ACTION_SSE, listenActionSse)
    ]);
}