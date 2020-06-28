export const LISTENS_ALL_TELEMETRY_SSE = 'LISTENS_ALL_TELEMETRY_SSE';

export const ADD_GNSS = 'ADD_GNSS';
export const ADD_SPEED = 'ADD_SPEED';
export const ADD_ROTATION = 'ADD_ROTATION';

export const listenAllTelemetrySse = () => ({ type: LISTENS_ALL_TELEMETRY_SSE });

export const addGnss = (gnss) => ({ type: ADD_GNSS, gnss: gnss });
export const addSpeed = (speed) => ({ type: ADD_SPEED, speed: speed });
export const addRotation = (rotation) => ({ type: ADD_ROTATION, rotation: rotation });
