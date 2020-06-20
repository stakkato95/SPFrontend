//called from drone saga
export const SET_SESSION = 'SET_SESSION';

export const GET_DRONE = 'GET_DRONE';
export const SET_DRONE = 'SET_DRONE';

export const setSession = (session) => ({ type: SET_SESSION, session: session });

export const getDrone = () => ({ type: GET_DRONE });
export const setDrone = (drone) => ({ type: SET_DRONE, drone: drone });