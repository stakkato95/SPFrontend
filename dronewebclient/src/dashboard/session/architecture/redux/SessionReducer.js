import {
    SET_SESSION_INITIAL_STATE,
    ADD_RUNNING_ACTION,
    ADD_ALL_RUNNING_ACTIONS,
    SET_ACTION_RUNNING,
    SET_ACTION_FINISHED,
    UPDATE_SESSION,
    CLEAR_INTERRUPTED_SESSION
} from './SessionActions';

export const sessionInitialState = {
    session: {},
    drone: {},
    runningActions: []
};

export const sessionReducer = (state = sessionInitialState, action) => {
    switch (action.type) {
        case SET_SESSION_INITIAL_STATE:
            return Object.assign({}, state, { session: action.session, drone: action.drone });
        case ADD_RUNNING_ACTION:
            let runningActions = state.runningActions.slice();
            runningActions.push(action.runningAction);
            return Object.assign({}, state, { runningActions: runningActions });
        case ADD_ALL_RUNNING_ACTIONS:
            return Object.assign({}, state, { runningActions: action.runningActions });
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
        case CLEAR_INTERRUPTED_SESSION:
            return Object.assign({}, state, { session: {} });
    }
    return state;
};