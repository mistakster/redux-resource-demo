import { combineReducers } from 'redux';
import { resourceReducer } from 'redux-resource';

const createAppReducer = () => combineReducers({
    people: resourceReducer('people'),
    starships: resourceReducer('starships'),
});

export default createAppReducer;
