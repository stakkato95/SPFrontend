export const GET_SESSION_AND_DRONE = 'GET_SESSION_AND_DRONE';
export const SET_SESSION_AND_DRONE = 'SET_SESSION_AND_DRONE';
export const SEND_ACTION = 'SEND_ACTION';

export const getSessionAndDrone = () => ({ type: GET_SESSION_AND_DRONE });
export const setSessionAndDrone = (session, drone) => ({
    type: SET_SESSION_AND_DRONE,
    session: session,
    drone: drone
});
export const sendAction = (actionType, value) => ({
    type: SEND_ACTION,
    actionType: actionType,
    value: value
})