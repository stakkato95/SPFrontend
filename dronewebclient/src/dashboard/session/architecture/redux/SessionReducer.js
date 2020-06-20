import { 
    SET_SESSION, 
    SET_DRONE 
} from './SessionActions';

export const sessionInitialState = {
    session: null,
    drone: null
};

export const sessionReducer = (state = sessionInitialState, action) => {
    switch (action.type) {
        case SET_SESSION:
            return Object.assign({}, state, { session: action.session });
        case SET_DRONE:
            return Object.assign({}, state, { drone: action.drone });
    }
    return state;
};