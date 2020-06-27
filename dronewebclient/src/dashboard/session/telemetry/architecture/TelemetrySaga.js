import { all, put, takeLatest, select } from 'redux-saga/effects';
import { listenServerSentEvent } from '../../../../helper/CommonHelper';

import { addGnss, addRotation, addSpeed } from './redux/TelemetryActions';
import { LISTEN_GNSS_SSE, LISTEN_ROTATION_SSE, LISTEN_SPEED_SSE } from './redux/TelemetryActions';

function* listenGnssSse() {
    yield listenServerSentEvent('/telemetry/gnss/getUpdates', function* (gnss) {
        yield put(addGnss(gnss));
    });
}

function* listenRotationSse() {
    yield listenServerSentEvent('/telemetry/rotation/getUpdates', function* (rotation) {
        yield put(addRotation(rotation));
    });
}

function* listenSpeedSse() {
    yield listenServerSentEvent('/telemetry/speed/getUpdates', function* (speed) {
        yield put(addSpeed(speed));
    });
}

export function* telemetrySaga() {
    yield all([
        yield takeLatest(LISTEN_GNSS_SSE, listenGnssSse),
        yield takeLatest(LISTEN_ROTATION_SSE, listenRotationSse),
        yield takeLatest(LISTEN_SPEED_SSE, listenSpeedSse)
    ]);
}