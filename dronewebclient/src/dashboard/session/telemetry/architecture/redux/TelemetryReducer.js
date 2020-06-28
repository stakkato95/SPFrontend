import {
    ADD_GNSS,
    ADD_ROTATION,
    ADD_SPEED
} from './TelemetryActions';

export const sessionInitialState = {
    gnss: {},
    rotation: {},
    speed: {},
    markers: []
};

export const telemetryReducer = (state = sessionInitialState, action) => {
    switch (action.type) {
        case ADD_GNSS:
            let markers = state.markers.slice();
            markers.push({ lat: action.gnss.lat, lon: action.gnss.lon });
            console.log(markers.length);
            return Object.assign({}, state, { gnss: action.gnss, markers: markers });
        case ADD_ROTATION:
            return Object.assign({}, state, { rotation: action.rotation });
        case ADD_SPEED:
            return Object.assign({}, state, { speed: action.speed });
    }
    return state;
};