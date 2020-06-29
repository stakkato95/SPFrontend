export const GET_HISTORY = 'GET_HISTORY';
export const SET_HISTORY = 'SET_HISTORY';

export const getHistory = () => ({ type: GET_HISTORY });
export const setHistory = (history) => ({ type: SET_HISTORY, history: history });