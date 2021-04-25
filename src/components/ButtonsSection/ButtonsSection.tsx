import React from 'react';
import s from './ButtonsSection.module.scss';
import Button from './Button';

type PropsType = {
    btnArray: any,
    handleClick: (action: any) => void
}

const ButtonsSection: React.FC<PropsType> = ({btnArray, handleClick}) => {
    const sortEl = (elArray: {}[], numInRow: number): JSX.Element[] => {
        const container:JSX.Element[] = [];
        let row:JSX.Element[] = [];
        elArray.forEach((el: any, index: number): void => {
            const i = index + 1;
            const objKey = Object.keys(el)[0];
            row.push(
                <Button key={el[objKey].name}
                        name={el[objKey].name}
                        isActive={el[objKey].isPressed}
                        action={el[objKey].action}
                        handleClick={handleClick}
                />
            );
            if (i % numInRow === 0 || i === elArray.length) {
                container.push(
                    <div className={s.row} key={i + el[objKey].name}>{row}</div>
                );
                row = [];
            }
        })
        return container;
    }

    return (
        <div>
            {sortEl(btnArray, 4)}
        </div>
    );
}

export default ButtonsSection;