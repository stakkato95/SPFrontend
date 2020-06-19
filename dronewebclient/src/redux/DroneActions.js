//load data from server for registered drones
export const GET_REGISTERED_DRONES = 'GET_REGISTERED_DRONES';
export const GET_UNREGISTERED_DRONES = 'GET_UNREGISTERED_DRONES';

//load data from server for unregistered drones
export const SET_REGISTERED_DRONES = 'SET_REGISTERED_DRONES';
export const SET_UNREGISTERED_DRONES = 'SET_UNREGISTERED_DRONES';

//register a new drone
export const SET_NEW_DRONE_NAME = 'SET_NEW_DRONE_NAME';
export const SET_NEW_DRONE_AUTO_SESSION_START = 'SET_NEW_DRONE_AUTO_SESSION_START';
export const REGISTER_DRONE = 'REGISTER_DRONE';
export const SET_NEW_REGISTERED_DRONE = 'SET_NEW_REGISTERED_DRONE';
export const SET_DRONE_REGISTRATION_IN_PROGRESS = 'SET_DRONE_REGISTRATION_IN_PROGRES';

export const getRegisteredDrones = () => ({ type: GET_REGISTERED_DRONES });
export const getUnregisteredDrones = () => ({ type: GET_UNREGISTERED_DRONES });

export const setRegisteredDrones = (registeredDrones) => ({ type: SET_REGISTERED_DRONES, registeredDrones: registeredDrones });
export const setUnregisteredDrones = (unregisteredDrones) => ({ type: SET_UNREGISTERED_DRONES, unregisteredDrones: unregisteredDrones });

export const setNewDroneName = (name) => ({ type: SET_NEW_DRONE_NAME, name: name });
export const setNewDroneNameAutoSessionStart = (newDroneSessionAutoStart) => ({
    type: SET_NEW_DRONE_AUTO_SESSION_START,
    newDroneSessionAutoStart: newDroneSessionAutoStart
});
export const registerDrone = () => ({ type: REGISTER_DRONE });
export const setNewRegisteredDrone = (unregisteredDroneId, newDrone) => ({ 
    type: SET_NEW_REGISTERED_DRONE,
    unregisteredDroneId: unregisteredDroneId,
    newDrone: newDrone
});
export const setDroneRegistrationInProgress = (isDroneRegistrationInProgress) => ({ 
    type: SET_DRONE_REGISTRATION_IN_PROGRESS,
    isDroneRegistrationInProgress: isDroneRegistrationInProgress
});