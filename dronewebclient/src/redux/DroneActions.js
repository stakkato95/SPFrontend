export const GET_REGISTERED_DRONES = 'GET_REGISTERED_DRONES';
export const GET_UNREGISTERED_DRONES = 'GET_UNREGISTERED_DRONES';

export const SET_REGISTERED_DRONES = 'SET_REGISTERED_DRONES';
export const SET_UNREGISTERED_DRONES = 'SET_UNREGISTERED_DRONES';

export const getRegisteredDrones = () => ({ type: GET_REGISTERED_DRONES });
export const getUnregisteredDrones = () => ({ type: GET_UNREGISTERED_DRONES });

export const setRegisteredDrones = (registeredDrones) => ({ type: SET_REGISTERED_DRONES, registeredDrones: registeredDrones });
export const setUnregisteredDrones = (unregisteredDrones) => ({ type: SET_UNREGISTERED_DRONES, unregisteredDrones: unregisteredDrones });