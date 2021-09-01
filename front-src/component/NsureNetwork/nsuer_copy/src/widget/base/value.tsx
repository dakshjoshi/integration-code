import React, {useState, useEffect} from 'react'
import CountUp from 'react-countup'

import styled from 'styled-components'

interface ValueProps {
    value: string | number
    decimals?: number,
    padding?:string,

}

export const ValueWidget: React.FC<ValueProps> = ({value, decimals,padding}) => {
    const [start, updateStart] = useState(0);
    const [end, updateEnd] = useState(0);


    useEffect(() => {
        if (typeof value === 'number') {
            updateStart(end);
            updateEnd(value)
        }
    }, [value]);

    return (
        <StyledValue padding={padding}>
            {typeof value == 'string' ? (
                value
            ) : (
                <CountUp
                    start={start}
                    end={end}
                    decimals={
                        decimals !== undefined ? decimals : 0
                    }
                    duration={1}
                    separator=","
                />
            )}
        </StyledValue>
    )
};

const StyledValue = styled.div<{padding?:string}>`
padding: ${(props)=>props.padding || '0'};
  //font-size: 24px;
`;

