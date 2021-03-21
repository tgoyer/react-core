import { ButtonAppearance, ButtonIntent } from 'components/buttons';

export const buildClass = (appearance, intent, disabled) => {
    if (appearance === ButtonAppearance.DEFAULT && intent === ButtonIntent.DEFAULT) {
        return `ring-1 font-bold ring-gray-300 text-blue-700 bg-gradient-to-b from-white to-gray-100 ${
            disabled ? '' : 'hover:from-gray-100 hover:to-gray-200'
        }`;
    }
    if (appearance === ButtonAppearance.DEFAULT && intent === ButtonIntent.SUCCESS) {
        return `ring-1 font-bold ring-gray-300 text-green-700 bg-gradient-to-b from-white to-gray-100 ${
            disabled ? '' : 'hover:from-gray-100 hover:to-gray-200'
        }`;
    }
    if (appearance === ButtonAppearance.DEFAULT && intent === ButtonIntent.WARNING) {
        return `ring-1 font-bold ring-gray-300 text-yellow-700 bg-gradient-to-b from-white to-gray-100 ${
            disabled ? '' : 'hover:from-gray-100 hover:to-gray-200'
        }`;
    }
    if (appearance === ButtonAppearance.DEFAULT && intent === ButtonIntent.DANGER) {
        return `ring-1 font-bold ring-gray-300 text-red-700 bg-gradient-to-b from-white to-gray-100 ${
            disabled ? '' : 'hover:from-gray-100 hover:to-gray-200'
        }`;
    }

    if (appearance === ButtonAppearance.SOLID && intent === ButtonIntent.DEFAULT) {
        return `ring-2 ring-opacity-60 ring-inset ring-blue-700 font-bold text-white bg-gradient-to-b from-blue-500 to-blue-800 ${
            disabled ? '' : 'hover:from-blue-600 hover:to-blue-900'
        }`;
    }
    if (appearance === ButtonAppearance.SOLID && intent === ButtonIntent.SUCCESS) {
        return `ring-2 ring-opacity-60 ring-inset ring-green-700 font-bold text-white bg-gradient-to-b from-green-500 to-green-800 ${
            disabled ? '' : 'hover:from-green-600 hover:to-green-900'
        }`;
    }
    if (appearance === ButtonAppearance.SOLID && intent === ButtonIntent.WARNING) {
        return `ring-2 ring-opacity-60 ring-inset ring-yellow-700 font-bold text-white bg-gradient-to-b from-yellow-500 to-yellow-800 ${
            disabled ? '' : 'hover:from-yellow-600 hover:to-yellow-900'
        }`;
    }
    if (appearance === ButtonAppearance.SOLID && intent === ButtonIntent.DANGER) {
        return `ring-2 ring-opacity-60 ring-inset ring-red-700 font-bold text-white bg-gradient-to-b from-red-500 to-red-800 ${
            disabled ? '' : 'hover:from-red-600 hover:to-red-900'
        }`;
    }

    if (appearance === ButtonAppearance.MINIMAL && intent === ButtonIntent.DEFAULT) {
        return `font-bold bg-transparent border-b-2 border-transparent text-blue-600 ${
            disabled ? '' : 'hover:border-blue-600'
        }`;
    }
    if (appearance === ButtonAppearance.MINIMAL && intent === ButtonIntent.SUCCESS) {
        return `font-bold bg-transparent border-b-2 border-transparent text-green-600 ${
            disabled ? '' : 'hover:border-green-600'
        }`;
    }
    if (appearance === ButtonAppearance.MINIMAL && intent === ButtonIntent.WARNING) {
        return `font-bold bg-transparent border-b-2 border-transparent text-yellow-600 ${
            disabled ? '' : 'hover:border-yellow-600'
        }`;
    }
    if (appearance === ButtonAppearance.MINIMAL && intent === ButtonIntent.DANGER) {
        return `font-bold bg-transparent border-b-2 border-transparent text-red-600 ${
            disabled ? '' : 'hover:border-red-600'
        }`;
    }
};
