import React, {useEffect, useRef, useState} from 'react';
import s from './OutputSection.module.scss';

type PropsType = {
    output: string
}

const OutputSection: React.FC<PropsType> = ({output}) => {
    // Divide output by 3 digit
    const formatOutput = (str: string): string => {
        const isMinus: boolean = str.indexOf('-') > -1;
        const isComma: boolean = str.indexOf(',') > -1;
        const separate = str.split(',')[0].split('-')[str.split('-').length - 1].split('').reverse().join('').match(/.{1,3}/g);
        let val = separate
            ? separate.join(' ').split('').reverse().join('')
            : str;
        if (isComma) {
            val += str.slice(str.indexOf(','));
        }
        return separate && isMinus ? '-' + val : val;
    }

    const [value, setValue] = useState<string>('0');
    const ref = useRef<HTMLElement>(null);

    // Change font-size if string length > 5
    useEffect(() => {
        // First change font-size, then send value to component
        const el = ref.current;
        let fontSize = 1;
        if (el) {
            if (output.length > 6) {
                for (let i: number = 0; i < output.length - 6; i++) {
                    fontSize -= (fontSize * fontSize * 0.17);
                    el.style.fontSize = fontSize + 'em';
                }
            } else {
                el.style.fontSize = fontSize + 'em';
            }
        }
        // Set output as value to show
        setValue(output);
    }, [output]);

    return (
        <div className={s.container}>
            <span ref={ref} className={s.value}>{formatOutput(value)}</span>
        </div>
    );
}

export default OutputSection;