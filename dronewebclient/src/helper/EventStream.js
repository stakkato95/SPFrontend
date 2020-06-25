import { eventChannel, END } from 'redux-saga';

export function getSseChannel(eventSrc) {
    const subs = emitter => {
        eventSrc.onmessage = (msg) => {
            emitter(msg.data);
        };
        eventSrc.onerror = () => {
            emitter(END);
            console.log('Server Sent Event error');
        };
        return () => {
            eventSrc.close();
        }
    };
    return eventChannel(subs);
}