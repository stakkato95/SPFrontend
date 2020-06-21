import { SET_SESSION_AND_DRONE, ADD_RUNNING_ACTION, ADD_ALL_RUNNING_ACTIONS } from './SessionActions';

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
            console.log(action.runningActions);
            return Object.assign({}, state, { runningActions: action.runningActions });
    }
    return state;
};