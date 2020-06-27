import {
    ADD_GNSS,
    ADD_ROTATION,
    ADD_SPEED
} from './TelemetryActions';

export const sessionInitialState = {
    gnss: {},
    rotation: {},
    speed: {}
};

export const telemetryReducer = (state = sessionInitialState, action) => {
    switch (action.type) {
        case ADD_GNSS:
            return Object.assign({}, state, { gnss: action.gnss });
        case ADD_ROTATION:
            return Object.assign({}, state, { rotation: action.rotation });
        case ADD_SPEED:
            return Object.assign({}, state, { speed: action.speed });
    }
    return state;
};