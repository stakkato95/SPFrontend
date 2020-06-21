export const GET_SESSION_AND_DRONE_AND_ALL_RUNNING_ACTIONS = 'GET_SESSION_AND_DRONE_AND_ALL_RUNNING_ACTIONS';
export const SET_SESSION_AND_DRONE = 'SET_SESSION_AND_DRONE';

export const SEND_ACTION = 'SEND_ACTION';
export const ADD_RUNNING_ACTION = 'ADD_RUNNING_ACTION';
export const ADD_ALL_RUNNING_ACTIONS = 'ADD_ALL_RUNNING_ACTIONS';

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