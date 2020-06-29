import { all, put, takeLatest, select } from 'redux-saga/effects';
import { api } from '../../../api/ApiConfig';
import { ActionState } from '../../../model/ActionState';
import { 
    isEmptyObj, 
    toTimeMillisec, 
    listenServerSentEventResult, 
    toShortTime
} from '../../../helper/CommonHelper';

import {
    setSessionInitialState,
    setActionRunning,
    setActionFinished,
    updateSession,
    updateDrone
} from './redux/SessionActions';
import {
    GET_SESSION_INITIAL_STATE,
    SEND_ACTION,
    LISTEN_ACTION_SSE,
    LISTEN_SESSION_SSE,
    START_SESSION,
    STOP_SESSION,
    LISTEN_DRONE_SSE
} from './redux/SessionActions';

function* getSessionInitialState() {
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
        drone.lastSeenTime = toTimeMillisec(drone.lastSeenTime);
    } catch (e) {
        console.log(e);
        //ignore
    }

    let runningActions = {};
    try {
        var serverResult = yield api().get(`/action/getAllRunning/${session.id}`);
        runningActions = isEmptyObj(serverResult.data.payload) ? [] : serverResult.data.payload;
    } catch (e) {
        console.log(e);
        //ignore
    }

    yield put(setSessionInitialState({ session: session, drone: drone, runningActions: runningActions }));
}

function* sendAction(action) {
    const state = yield select();
    const sessionId = state.session.session.id;

    try {
        const startActionRequest = {
            sessionId: sessionId,
            actionType: action.actionType
        };
        var serverResult = yield api().post('/action/start', startActionRequest);
    } catch (e) {
        console.log(e);
        //ignore
    }
}

function* listenActionSse() {
    yield listenServerSentEventResult('/action/getUpdates', function* (action) {
        switch (action.actionState) {
            case ActionState.RUNNING:
                yield put(setActionRunning(action));
                break;
            case ActionState.FINISHED:
                yield put(setActionFinished(action));
                break;
            case ActionState.INTERRUPTED:
                //TODO
                break;
        }
    });
}

function* listenSessionSse() {
    yield listenServerSentEventResult('/session/getUpdates', function* (session) {
        yield put(updateSession(session));
    });
}

function* startSession(action) {
    try {
        const req = { droneId: action.droneId };
        var serverResult = yield api().post('/session/startSession', req);
    } catch (e) {
        console.log(e);
        //ignore
    }
}

function* stopSession(action) {
    try {
        const req = { sessionId: action.sessionId };
        var serverResult = yield api().post('/session/stopSession', req);
    } catch (e) {
        console.log(e);
        //ignore
    }
}

function* listenDroneSse() {
    yield listenServerSentEventResult('/drone/getUpdates', function* (drone) {
        drone.lastSeenTime = toTimeMillisec(drone.lastSeenTime);
        yield put(updateDrone(drone));
    });
}

export function* sessionSaga() {
    yield all([
        yield takeLatest(GET_SESSION_INITIAL_STATE, getSessionInitialState),
        yield takeLatest(SEND_ACTION, sendAction),
        yield takeLatest(LISTEN_ACTION_SSE, listenActionSse),
        yield takeLatest(LISTEN_SESSION_SSE, listenSessionSse),
        yield takeLatest(START_SESSION, startSession),
        yield takeLatest(STOP_SESSION, stopSession),
        yield takeLatest(LISTEN_DRONE_SSE, listenDroneSse)
    ]);
}