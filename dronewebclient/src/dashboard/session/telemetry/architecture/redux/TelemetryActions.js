export const LISTEN_GNSS_SSE = 'LISTENS_GNSS_SSE';
export const LISTEN_SPEED_SSE = 'LISTENS_SPEED_SSE';
export const LISTEN_ROTATION_SSE = 'LISTENS_ROTATION_SSE';

export const ADD_GNSS = 'ADD_GNSS';
export const ADD_SPEED = 'ADD_SPEED';
export const ADD_ROTATION = 'ADD_ROTATION';

export const listenGnssSse = () => ({ type: LISTEN_GNSS_SSE });
export const listenSpeedSse = () => ({ type: LISTEN_SPEED_SSE });
export const listenRotationSse = () => ({ type: LISTEN_ROTATION_SSE });

export const addGnss = (gnss) => ({ type: ADD_GNSS, gnss: gnss });
export const addSpeed = (speed) => ({ type: ADD_SPEED, speed: speed });
export const addRotation = (rotation) => ({ type: ADD_ROTATION, rotation: rotation });
