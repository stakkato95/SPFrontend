import {
    SET_REGISTERED_DRONES,
    SET_UNREGISTERED_DRONES,
    SET_NEW_DRONE_NAME,
    SET_NEW_DRONE_AUTO_SESSION_START,
    SET_NEW_REGISTERED_DRONE,
    SET_REGISTER_DRONE_DIALOG_VISIBLE,
    SET_SELECTED_UNREGISTERED_DRONE_ID,
    SET_DRONE_REGISTRATION_IN_PROGRESS
} from './DroneActions';

export const droneInitialState = {
    registeredDrones: [],
    unregisteredDrones: [],
    newDroneName: '',
    newDroneSessionAutoStart: false,
    selectedUnregisteredDroneId: '',
    isDroneRegistrationInProgress: false,
    isRegisterDroneDialogVisible: false
};

export const droneReducer = (state = droneInitialState, action) => {
    switch (action.type) {
        case SET_REGISTERED_DRONES:
            return Object.assign({}, state, { registeredDrones: action.registeredDrones });
        case SET_UNREGISTERED_DRONES:
            return Object.assign({}, state, { unregisteredDrones: action.unregisteredDrones });
        case SET_NEW_DRONE_NAME:
            return Object.assign({}, state, { newDroneName: action.name });
        case SET_NEW_DRONE_AUTO_SESSION_START:
            return Object.assign({}, state, { newDroneSessionAutoStart: action.newDroneSessionAutoStart });
        case SET_REGISTER_DRONE_DIALOG_VISIBLE:
            let stateUpdate = { isRegisterDroneDialogVisible: action.isRegisterDroneDialogVisible };
            if (!action.isRegisterDroneDialogVisible) {
                stateUpdate.selectedUnregisteredDroneId = '';
                stateUpdate.newDroneName = '';
                stateUpdate.newDroneSessionAutoStart = false;
            }
            return Object.assign({}, state, stateUpdate);
        case SET_SELECTED_UNREGISTERED_DRONE_ID:
            return Object.assign({}, state, { selectedUnregisteredDroneId: action.selectedUnregisteredDroneId });
        case SET_DRONE_REGISTRATION_IN_PROGRESS:
            return Object.assign({}, state, { isDroneRegistrationInProgress: action.isDroneRegistrationInProgress });
        case SET_NEW_REGISTERED_DRONE:
            console.log(action);

            let unregisteredDrones = state.unregisteredDrones.slice();
            unregisteredDrones = unregisteredDrones.filter(obj => obj.id !== action.unregisteredDroneId);

            let registeredDrones = state.registeredDrones.slice();
            registeredDrones.push(action.newDrone);
            
            return Object.assign({}, state, {
                unregisteredDrones: unregisteredDrones,
                registeredDrones: registeredDrones,
                selectedUnregisteredDroneId: '',
                newDroneName: ''
            });
    }
    return state;
};