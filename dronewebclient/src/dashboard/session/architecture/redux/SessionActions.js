export const GET_SESSION_INITIAL_STATE = 'GET_SESSION_INITIAL_STATE';
export const SET_SESSION_AND_DRONE = 'SET_SESSION_AND_DRONE';
export const SET_SESSION_INITIAL_STATE = 'SET_SESSION_INITIAL_STATE';

export const SEND_ACTION = 'SEND_ACTION';
export const LISTEN_ACTION_SSE = 'LISTEN_ACTION_SSE';
export const SET_ACTION_RUNNING = 'SET_ACTION_RUNNING';
export const SET_ACTION_FINISHED = 'SET_ACTION_FINISHED';
export const UPDATE_SESSION = 'UPDATE_SESSION';
export const LISTEN_SESSION_SSE = 'LISTEN_SESSION_SSE';
export const CLEAR_SESSION = 'CLEAR_SESSION';

export const START_SESSION = 'START_SESSION';
export const STOP_SESSION = 'STOP_SESSION';

export const getSessionInitialState = () => ({ type: GET_SESSION_INITIAL_STATE });
export const setSessionAndDrone = (session, drone) => ({
    type: SET_SESSION_AND_DRONE,
    session: session,
    drone: drone
});

export const setSessionInitialState = (sessionInitState) => ({ 
    type: SET_SESSION_INITIAL_STATE,
    sessionInitState: sessionInitState
});

export const sendAction = (actionType, value) => ({
    type: SEND_ACTION,
    actionType: actionType,
    value: value
});
export const listenActionSse = () => ({ type: LISTEN_ACTION_SSE });
export const setActionRunning = (action) => ({ type: SET_ACTION_RUNNING, action: action });
export const setActionFinished = (action) => ({ type: SET_ACTION_FINISHED, action: action });
export const updateSession = (session) => ({ type: UPDATE_SESSION, session: session });
export const listenSessionSse = () => ({ type: LISTEN_SESSION_SSE });

export const clearSession = () => ({ type: CLEAR_SESSION });

export const startSession = (droneId) => ({ type: START_SESSION, droneId: droneId });
export const stopSession = (sessionId) => ({ type: STOP_SESSION, sessionId: sessionId });