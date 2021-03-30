import React from 'react';
import s from './ButtonsSection.module.scss';
import Button from './Button';

type PropsType = {
    buttons: any,
    handleClick: (action: any) => void
}

const ButtonsSection: React.FC<PropsType> = ({buttons, handleClick}) => {
    const sortEl = (btnsArr: {}[], numInRow: number): JSX.Element[] => {
        const container:JSX.Element[] = [];
        let row:JSX.Element[] = [];
        //const keysArr: string[] = Object.keys(btnsObj);
        btnsArr.forEach((el: any, index: number): void => {
            const i = index + 1;
            row.push(
                <Button key={el.name}
                        name={el.name}
                        isActive={el.isPressed}
                        action={el.action}
                        handleClick={handleClick}
                />
            );
            if (i % numInRow === 0 || i === btnsArr.length) {
                container.push(
                    <div className={s.row} key={i + el.name}>{row}</div>
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