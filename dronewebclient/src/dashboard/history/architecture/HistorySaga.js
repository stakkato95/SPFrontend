import { all, put, takeLatest } from 'redux-saga/effects';

import { api } from '../../../api/ApiConfig';

import { toShortTime } from '../../../helper/CommonHelper';

import { setHistory } from './redux/HistoryActions';
import { GET_HISTORY } from './redux/HistoryActions';

function* getHistory() {
    try {
        var serverResult = yield api().get('/session/getHistory');
        serverResult.data.forEach(history => {
            history.session.sessionStartTime = toShortTime(history.session.sessionStartTime);
            if (history.session.sessionEndTime) {
                history.session.sessionEndTime = toShortTime(history.session.sessionEndTime);
            }
        });

        yield put(setHistory(serverResult.data));
    } catch (e) {
        console.log(e);
        //ignore
    }
}

export function* historySaga() {
    yield all([
        yield takeLatest(GET_HISTORY, getHistory)
    ]);
}