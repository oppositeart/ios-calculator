import React from 'react';

const btnArr: Array<string[]> = [
    ['AC', '+/-', '%', '÷'],
    ['mc', 'mr', 'm-', 'm+'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', ',', '=']
];

type PropsType = {
    clickHandler: (value: number) => any
}

const InputSection: React.FC<PropsType> = ({clickHandler}) => {
    return (
        <div>
            {btnArr.map(line => (
                <div>
                    {line.map(txt => (
                        <button onClick={() => clickHandler(parseInt(txt))}>{txt}</button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default InputSection;