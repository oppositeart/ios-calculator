import React from 'react';

type PropsType = {
    output: number
}

const OutputSection: React.FC<PropsType> = ({output}) => {
    return (
        <div>
            {output}
        </div>
    );
}

export default OutputSection;