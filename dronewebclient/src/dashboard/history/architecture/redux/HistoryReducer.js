import { SET_HISTORY } from './HistoryActions';

export const historyInitialState = {
    history: []
};

export const historyReducer = (state = historyInitialState, action) => {
    switch (action.type) {
        case SET_HISTORY:
            return Object.assign({}, state, { history: action.history });
    }
    return state;
};