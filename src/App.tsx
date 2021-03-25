import React from 'react';
import './App.css';
import OutputSection from './components/OutputSection/OutputSection';
import InputSection from './components/InputSection/InputSection';

const App: React.FC = () => {
    return (
        <div>
            <OutputSection />
            <InputSection />
        </div>
    );
}

export default App;