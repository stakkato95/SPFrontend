import {
    SET_SESSION_AND_DRONE,
    ADD_RUNNING_ACTION,
    ADD_ALL_RUNNING_ACTIONS,
    SET_ACTION_RUNNING,
    SET_ACTION_FINISHED
} from './SessionActions';

export const sessionInitialState = {
    session: {},
    drone: {},
    runningActions: []
};

export const sessionReducer = (state = sessionInitialState, action) => {
    switch (action.type) {
        case SET_SESSION_AND_DRONE:
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
            console.log('RUNNING');
            return Object.assign({}, state, { runningActions: runningActions });
        }
        case SET_ACTION_FINISHED:
            //TODO currently only one action can be run simultaneously
            console.log('FINISHED');
            return Object.assign({}, state, { runningActions: [] });
    }
    return state;
};