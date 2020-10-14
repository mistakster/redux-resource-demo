import React from 'react';
import { Provider } from 'react-redux';
import Page from './Page';
import store from '../redux/store';

const App = () => (
    <Provider store={store}>
        <Page/>
    </Provider>
);

export default App;
