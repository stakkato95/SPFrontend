import { eventChannel, END } from 'redux-saga';

export function getSseChannel(eventSrc) {
    const subs = emitter => {
        eventSrc.onmessage = (msg) => {
            emitter(msg);
            console.log('MSG');
        };
        eventSrc.onerror = () => {
            emitter(END);
            console.log('ERROR');
        };
        return () => {
            eventSrc.close();
        }
    };
    return eventChannel(subs);
}