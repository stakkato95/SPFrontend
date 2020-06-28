import moment from 'moment';
import { getSseChannel } from './EventStream';
import { call, take } from 'redux-saga/effects';

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function toShortTime(time) {
    return new Date(time).toLocaleString();
}

export function toTimeMillisec(time) {
    return moment(new Date()).format('HH:mm:ss');
}

export function getTimeDifference(startTime) {
    if (startTime === undefined || startTime === null) {
        return '00:00:00';
    }

    const diff = Date.now() - new Date(startTime);
    const total = diff / 1000;
    
    const h = Math.floor(total / 60 / 60);
    const min = Math.floor((total - (h * 60 * 60)) / 60);
    const sec = Math.floor(total - (h * 60 * 60) - (min * 60));

    return `${pad(h, 2)}:${pad(min, 2)}:${pad(sec, 2)}`
}

function pad(num, places) {
    return String(num).padStart(places, '0');
}

export function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
}

export function* listenServerSentEvent(path, callback) {
    const eventSrc = new EventSource(`http://localhost:8080/api${path}`);
    const channel = yield call(getSseChannel, eventSrc);

    while (true) {
        const msg = yield take(channel);
        const databaseUpdate = JSON.parse(msg);
        const updateObj = databaseUpdate.object;
        if (updateObj === null) {
            continue;
        }
        
        yield callback(updateObj);
    }
}

export function* listenServerSentEventNew(path, callback) {
    const eventSrc = new EventSource(`http://localhost:8080/api${path}`);
    const channel = yield call(getSseChannel, eventSrc);

    while (true) {
        const msg = yield take(channel);
        const databaseUpdate = JSON.parse(msg);
        const updateObj = databaseUpdate;
        if (updateObj === null) {
            continue;
        }
        
        yield callback(updateObj);
    }
}