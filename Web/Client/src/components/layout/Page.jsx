import React from 'react';

import { Helmet } from 'react-helmet-async';

import { isNullOrEmpty } from 'utilities/stringHelper';

const Page = ({ title = null, description = 'web view', children }) => {
    const viewTitle = isNullOrEmpty(title) ? 'ATLAS' : `ATLAS - ${title}`;

    return (
        <div className="px-8 py-5">
            <Helmet>
                <title>{viewTitle}</title>
                <meta name="description" content={`${viewTitle} ${description}`} />
            </Helmet>
            {children}
        </div>
    );
};

export default Page;
