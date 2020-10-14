import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import bindFetchApi from '../../utils/fetchApi';

const enhancedThunk = (store) => thunk.withExtraArgument({
    fetchApi: bindFetchApi(store)
})(store);

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => composeEnhancers(applyMiddleware(enhancedThunk));
