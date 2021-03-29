import React from 'react';
import s from './ButtonsSection.module.scss';

type PropsType = {
    buttons: any,
    // TODO: Choose type
    handleClick: (action: any) => void
}

const ButtonsSection: React.FC<PropsType> = ({buttons, handleClick}) => {
    const sortEl = (btnsObj: any, numInRow: number): JSX.Element[] => {
        const container:JSX.Element[] = [];
        let row:JSX.Element[] = [];
        const keysArr: string[] = Object.keys(btnsObj);
        keysArr.forEach((key: string, index: number, arr): void => {
            const i = index + 1;
            row.push(
                <button className={buttons[key].isPressed ? s.active : s.btn} key={buttons[key].name} onClick={() => handleClick(buttons[key].action)}>{buttons[key].name}</button>
            );
            if (i % numInRow === 0 || i === arr.length) {
                container.push(
                    <div key={i + buttons[key].name}>{row}</div>
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

export default ButtonsSection;