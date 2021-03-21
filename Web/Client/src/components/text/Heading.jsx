import React from 'react';
import cn from 'classnames';

const Heading = ({ children, underline = true }) => {
    return <h1 className={cn('text-2xl font-bold pl-1', { 'border-b-2 border-gray-400': underline })}>{children}</h1>;
};

export default Heading;
