import {
    SET_SESSION_INITIAL_STATE,
    SET_ACTION_RUNNING,
    SET_ACTION_FINISHED,
    UPDATE_SESSION,
    CLEAR_SESSION,
    UPDATE_DRONE
} from './SessionActions';

export const sessionInitialState = {
    session: {},
    drone: {},
    runningActions: []
};

export const sessionReducer = (state = sessionInitialState, action) => {
    switch (action.type) {
        case SET_SESSION_INITIAL_STATE:
            const init = action.sessionInitState;
            return Object.assign({}, state, { session: init.session, drone: init.drone, runningActions: init.runningActions });
        case SET_ACTION_RUNNING: {
            //TODO will be used in future, when multiple actions could be sent simultaneously
            let runningActions = state.runningActions.slice();
            runningActions.push(action.action);
            return Object.assign({}, state, { runningActions: runningActions });
        }
        case SET_ACTION_FINISHED:
            //TODO currently only one action can be run simultaneously
            return Object.assign({}, state, { runningActions: [] });
        case UPDATE_SESSION:
            return Object.assign({}, state, { session: action.session });
        case CLEAR_SESSION:
            return Object.assign({}, state, { session: {} });
        case UPDATE_DRONE:
            return Object.assign({}, state, { drone: action.drone });
    }
    return state;
};