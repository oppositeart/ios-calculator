import React from 'react';
import CalculatorContainer from './components/Calculator/CalculatorContainer';
import {Provider} from 'react-redux';
import store from './store/store';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <CalculatorContainer />
        </Provider>
    );
}

export default App;