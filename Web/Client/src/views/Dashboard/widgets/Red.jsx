import React from 'react';
import styled from 'styled-components';

import { TileItem } from 'components/grids';

const StyledItem = styled(TileItem)`
    box-shadow: inset 0 0 1px 1px red, 0 0 1px 0px red, 0 1px 2px 0px hsl(0deg 0% 0% / 50%);
`;

export const Defaults = {
    w: 2,
    h: 4,
};

export const Component = React.forwardRef(({ children, data, config, ...props }, ref) => {
    return (
        <StyledItem ref={ref} {...props}>
            <div>Red: {children}</div>
        </StyledItem>
    );
});
