import { 
    SET_REGISTERED_DRONES, 
    SET_UNREGISTERED_DRONES, 
    SET_NEW_DRONE_NAME,
    SET_NEW_DRONE_AUTO_SESSION_START,
    SET_NEW_REGISTERED_DRONE,
    SET_REGISTER_DRONE_DIALOG_VISIBLE
} from './DroneActions';

export const initialState = {
    registeredDrones: [],
    unregisteredDrones: [],
    newDroneName: '',
    newDroneSessionAutoStart: false,
    selectedUnregisteredDroneId: '',
    isDroneRegistrationInProgress: false,
    isRegisterDroneDialogVisible: false
};

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REGISTERED_DRONES:
            return Object.assign({}, state, { registeredDrones: state.registeredDrones });
        case SET_UNREGISTERED_DRONES:
            return Object.assign({}, state, { unregisteredDrones: action.unregisteredDrones });
        case SET_NEW_DRONE_NAME:
            return Object.assign({}, state, { newDroneName: action.name });
        case SET_NEW_DRONE_AUTO_SESSION_START:
            return Object.assign({}, state, { newDroneSessionAutoStart: action.newDroneSessionAutoStart });
        case SET_REGISTER_DRONE_DIALOG_VISIBLE:
            return Object.assign({}, state, { isRegisterDroneDialogVisible: action.isRegisterDroneDialogVisible });
        case SET_NEW_REGISTERED_DRONE:
            let unregisteredDrones = state.unregisteredDrones.slice();
            unregisteredDrones = unregisteredDrones.filter(obj => obj.id !== action.unregisteredDroneId);

            let registeredDrones = state.registeredDrones.slice();
            registeredDrones.push(action.newDrone);

            return Object.assign({}, state, { unregisteredDrones: unregisteredDrones, registeredDrones: registeredDrones });
    }
    return state;
};