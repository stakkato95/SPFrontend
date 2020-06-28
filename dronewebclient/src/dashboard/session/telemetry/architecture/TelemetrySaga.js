import { all, put, takeLatest } from 'redux-saga/effects';
import { listenServerSentEvent } from '../../../../helper/CommonHelper';
import { DatabaseCollections } from '../../../../model/DatabaseCollections';

import { addGnss, addRotation, addSpeed } from './redux/TelemetryActions';
import { LISTENS_ALL_TELEMETRY_SSE } from './redux/TelemetryActions';

function* listenAllTelemetrySse() {
    yield listenServerSentEvent('/telemetry/getUpdates', function* (telemetry) {
        switch (telemetry.collection) {
            case DatabaseCollections.TELEMETRY_GNSS:
                yield put(addGnss(telemetry.object));
                break;
            case DatabaseCollections.TELEMETRY_SPEED:
                yield put(addSpeed(telemetry.object));
                break;
            case DatabaseCollections.TELEMETRY_ROTATION:
                yield put(addRotation(telemetry.object));
                break;
        }
    });
}

export function* telemetrySaga() {
    yield all([
        yield takeLatest(LISTENS_ALL_TELEMETRY_SSE, listenAllTelemetrySse)
    ]);
}