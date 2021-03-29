import React from 'react';
import s from './OutputSection.module.scss';

type PropsType = {
    output: string
}

const OutputSection: React.FC<PropsType> = ({output}) => {
    return (
        <div className={s.container}>
            <span className={s.value}>{output}</span>
        </div>
    );
}

export default OutputSection;