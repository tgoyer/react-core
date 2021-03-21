import React from 'react';
import cn from 'classnames';

import { noOp } from 'components/utilities';
import { buildClass } from 'components/buttons/utilities';

const Button = ({
    children,
    appearance = Appearance.DEFAULT,
    intent = Intent.DEFAULT,
    disabled = false,
    gutter = true,
    rounded = true,
    onClick = noOp('onClick'),
}) => {
    return (
        <button
            disabled={disabled}
            className={cn(
                'px-4 py-2 text-xs focus:outline-none transition ease-out duration-150',
                buildClass(appearance, intent, disabled),
                {
                    'cursor-auto': disabled,
                    'opacity-60': disabled,
                    'mx-2': gutter,
                    'rounded-lg': rounded && appearance !== Appearance.MINIMAL,
                }
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;

export const Appearance = Object.freeze({
    DEFAULT: 'default',
    SOLID: 'solid',
    MINIMAL: 'minimal',
});

export const Intent = Object.freeze({
    DEFAULT: 'default',
    SUCCESS: 'secondary',
    WARNING: 'warning',
    DANGER: 'danger',
});
