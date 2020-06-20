import { SET_SESSION_AND_DRONE } from './SessionActions';

export const sessionInitialState = {
    session: {},
    drone: {}
};

export const sessionReducer = (state = sessionInitialState, action) => {
    switch (action.type) {
        case SET_SESSION_AND_DRONE:
            return Object.assign({}, state, { session: action.session, drone: action.drone });
    }
    return state;
};