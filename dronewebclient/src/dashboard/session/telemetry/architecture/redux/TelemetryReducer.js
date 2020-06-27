import {
    ADD_GNSS,
    ADD_ROTATION,
    ADD_SPEED
} from './TelemetryActions';

export const sessionInitialState = {
    gnss: [],
    rotation: [],
    speed: []
};

export const telemetryReducer = (state = sessionInitialState, action) => {
    switch (action.type) {
        case ADD_GNSS:
            let gnssUpdated = state.gnss.slice(-14);
            gnssUpdated.push(action.gnss);
            return Object.assign({}, state, { gnss: gnssUpdated });
        case ADD_ROTATION:
            let rotationUpdated = state.rotation.slice();
            rotationUpdated.push(action.rotation);
            return Object.assign({}, state, { rotation: rotationUpdated });
        case ADD_SPEED:
            let speedUpdated = state.speed.slice();
            speedUpdated.push(action.speed);
            return Object.assign({}, state, { speed: speedUpdated });
    }
    return state;
};