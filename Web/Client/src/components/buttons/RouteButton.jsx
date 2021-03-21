import React from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { ButtonAppearance, ButtonIntent } from 'components/buttons';
import { buildClass } from 'components/buttons/utilities';

const RouteButton = ({
    children,
    appearance = ButtonAppearance.MINIMAL,
    intent = ButtonIntent.DEFAULT,
    disabled = false,
    gutter = true,
    rounded = true,
    ...props
}) => {
    return (
        <Link
            className={cn(
                'px-4 py-2 text-xs focus:outline-none transition ease-out duration-150',
                buildClass(appearance, intent, disabled),
                {
                    'cursor-auto': disabled,
                    'opacity-60': disabled,
                    'mx-2': gutter,
                    'rounded-lg': rounded && appearance !== ButtonAppearance.MINIMAL,
                }
            )}
            {...props}
        >
            {children}
        </Link>
    );
};

export default RouteButton;
