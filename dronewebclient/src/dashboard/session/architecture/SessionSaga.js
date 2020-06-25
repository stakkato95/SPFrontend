import { all, put, takeLatest, select, call, take } from 'redux-saga/effects';
import { api } from '../../../api/ApiConfig';
import { getSseChannel } from './EventStream';
import { ActionState } from '../../../model/ActionState';
import { SessionState } from '../../../model/SessionState';
import { isEmptyObj } from '../../../helper/CommonHelper';

import {
    setSessionInitialState,
    setActionRunning,
    setActionFinished,
    updateSession
} from './redux/SessionActions';
import {
    GET_SESSION_INITIAL_STATE,
    SEND_ACTION,
    LISTEN_ACTION_SSE,
    LISTEN_SESSION_SSE,
    START_SESSION,
    STOP_SESSION
} from './redux/SessionActions';

function* getSessionInitialState() {
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
    const eventSrc = new EventSource('http://localhost:8080/api/action/getUpdates');
    const channel = yield call(getSseChannel, eventSrc);
    while (true) {
        const msg = yield take(channel);
        const databaseUpdate = JSON.parse(msg);
        const action = databaseUpdate.object;
        if (action === null) {
            continue;
        }
        
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
    }
}

function* listenSessionSse() {
    const eventSrc = new EventSource('http://localhost:8080/api/session/getUpdates');
    const channel = yield call(getSseChannel, eventSrc);
    while (true) {
        const msg = yield take(channel);
        const databaseUpdate = JSON.parse(msg);
        const session = databaseUpdate.object;
        if (session === null) {
            continue;
        }

        yield put(updateSession(session));
        // switch (session.sessionState) {
        //     case SessionState.RUNNING:
        //         //TODO
        //         break;
        //     case SessionState.FINISHED:
        //         yield put(updateSession(session));
        //         break;
        //     case SessionState.INTERRUPTED:
        //         yield put(updateSession(session));
        //         break;
        // }
    }
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

export function* sessionSaga() {
    yield all([
        yield takeLatest(GET_SESSION_INITIAL_STATE, getSessionInitialState),
        yield takeLatest(SEND_ACTION, sendAction),
        yield takeLatest(LISTEN_ACTION_SSE, listenActionSse),
        yield takeLatest(LISTEN_SESSION_SSE, listenSessionSse),
        yield takeLatest(START_SESSION, startSession),
        yield takeLatest(STOP_SESSION, stopSession)
    ]);
}