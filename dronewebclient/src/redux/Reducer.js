import { SET_REGISTERED_DRONES, SET_UNREGISTERED_DRONES } from './DroneActions';

export const initialState = {
    registeredDrones: [],
    unregisteredDrones: []
};

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REGISTERED_DRONES:
            return Object.assign({}, state, { registeredDrones: state.registeredDrones });
        case SET_UNREGISTERED_DRONES:
            return Object.assign({}, state, { unregisteredDrones: action.unregisteredDrones });
    }
    return state;
};