import React from 'react';
import s from './ButtonsSection.module.scss';
import Button from './Button';

type PropsType = {
    buttons: any,
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
                <Button key={buttons[key].name}
                        name={buttons[key].name}
                        isActive={buttons[key].isPressed}
                        action={buttons[key].action}
                        handleClick={handleClick}
                />
            );
            if (i % numInRow === 0 || i === arr.length) {
                container.push(
                    <div className={s.row} key={i + buttons[key].name}>{row}</div>
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