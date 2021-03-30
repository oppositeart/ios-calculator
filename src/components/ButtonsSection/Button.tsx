import React, {useState} from 'react';
import s from './ButtonsSection.module.scss';

type PropsType = {
    name: string,
    isActive: boolean,
    action: () => {}
    handleClick: (action: () => {}) => void
}

const Button: React.FC<PropsType> = ({name, isActive, action, handleClick}) => {
    const [isPressed, setPressed] = useState<boolean>(false);
    const handleMouseDown = () => {
        setPressed(true);
    }
    const handleMouseUp = () => {
        setPressed(false);
    }
    const cls = [s.btn];
    isActive && cls.push(s.active)
    isPressed && cls.push(s.pressed)
    return (
        <button className={cls.join(' ')}
                onClick={() => handleClick(action)}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
        >
            <span>{name}</span>
        </button>
    );
}

export default Button;