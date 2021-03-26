import React from 'react';
import {BtnObjType} from '../../store/reducers/btnReducer';

type PropsType = {
    buttons: BtnObjType[],
    // TODO: Choose type
    handleClick: (action: any) => void
}

const InputSection: React.FC<PropsType> = ({buttons, handleClick}) => {
    const sortEl = (elArray: BtnObjType[], numInRow: number): JSX.Element[] => {
        const container:JSX.Element[] = [];
        let row:JSX.Element[] = [];

        elArray.forEach((btn: BtnObjType, index: number, arr): void => {
            const i = index + 1;
            row.push(
                <button key={btn.name} onClick={() => handleClick(btn.action)}>{btn.name}</button>
            );
            if (i % numInRow === 0 || i === arr.length) {
                container.push(
                    <div key={i + btn.name}>{row}</div>
                );
                row = [];
            }
        })
        return container;
    }

    return (
        <div>
            {sortEl(buttons, 4)}
        </div>
    );
}

export default InputSection;