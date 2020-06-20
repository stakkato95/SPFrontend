import { SET_SESSION_ID } from './SessionActions';

export const sessionInitialState = {
    sessionId: ''
};

export const sessionReducer = (state = sessionInitialState, action) => {
    switch (action.type) {
        case SET_SESSION_ID:
            return Object.assign({}, state, { registeredDrones: action.registeredDrones });
    }
    return state;
};