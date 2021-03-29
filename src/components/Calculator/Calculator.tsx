import React from 'react';
import s from './Calculator.module.scss';
import OutputSection from '../OutputSection/OutputSection';
import ButtonsSection from '../ButtonsSection/ButtonsSection';

type PropsType = {
    output: string,
    buttons: {[x: string]: any},
    handleClick: (action: () => {}) => void
}

const Calculator: React.FC<PropsType> = ({output, buttons, handleClick}) => {
    return (
        <div className={s.container}>
            <OutputSection output={output} />
            <ButtonsSection buttons={buttons} handleClick={handleClick} />
        </div>
    );
}

export default Calculator;