export const GET_SESSION_AND_DRONE_AND_ALL_RUNNING_ACTIONS = 'GET_SESSION_AND_DRONE_AND_ALL_RUNNING_ACTIONS';
export const SET_SESSION_AND_DRONE = 'SET_SESSION_AND_DRONE';

export const SEND_ACTION = 'SEND_ACTION';
export const ADD_RUNNING_ACTION = 'ADD_RUNNING_ACTION';
export const ADD_ALL_RUNNING_ACTIONS = 'ADD_ALL_RUNNING_ACTIONS';
export const LISTEN_ACTION_SSE = 'LISTEN_ACTION_SSE';
export const SET_ACTION_RUNNING = 'SET_ACTION_RUNNING';
export const SET_ACTION_FINISHED = 'SET_ACTION_FINISHED';
export const UPDATE_SESSION = 'UPDATE_SESSION';
export const LISTEN_SESSION_SSE = 'LISTEN_SESSION_SSE';
export const CLEAR_INTERRUPTED_SESSION = 'CLEAR_INTERRUPTED_SESSION';

export const START_SESSION = 'START_SESSION';

export const getSessionAndDroneAndRunningActions = () => ({ type: GET_SESSION_AND_DRONE_AND_ALL_RUNNING_ACTIONS });
export const setSessionAndDrone = (session, drone) => ({
    type: SET_SESSION_AND_DRONE,
    session: session,
    drone: drone
});

export const sendAction = (actionType, value) => ({
    type: SEND_ACTION,
    actionType: actionType,
    value: value
});
export const addRunningAction = (runningAction) => ({ type: ADD_RUNNING_ACTION, runningAction: runningAction });
export const addAllRunningActions = (runningActions) => ({ type: ADD_ALL_RUNNING_ACTIONS, runningActions: runningActions });
export const listenActionSse = () => ({ type: LISTEN_ACTION_SSE });
export const setActionRunning = (action) => ({ type: SET_ACTION_RUNNING, action: action });
export const setActionFinished = (action) => ({ type: SET_ACTION_FINISHED, action: action });
export const updateSession = (session) => ({ type: UPDATE_SESSION, session: session });
export const listenSessionSse = () => ({ type: LISTEN_SESSION_SSE });

export const clearInterruptedSession = () => ({ type: CLEAR_INTERRUPTED_SESSION });

export const startSession = (droneId) => ({ type: START_SESSION, droneId: droneId });