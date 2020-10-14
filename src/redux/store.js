import { createStore } from 'redux';
import createEnhancer from './middleware/index';
import createReducer from './reducers/index';

const store = createStore(
    createReducer(),
    createEnhancer()
);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        // eslint-disable-next-line global-require
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
