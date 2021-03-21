import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import Root from './Root';

describe('<Root>', () => {
    it('renders learn react link', () => {
        const { getByText } = render(<Root />);
        const linkElement = getByText(/learn react/i);
        expect(document.body.contains(linkElement));
    });
});
