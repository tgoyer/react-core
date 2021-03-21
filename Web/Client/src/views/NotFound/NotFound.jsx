import React, { useState, useEffect } from 'react';

import { Page } from 'components/layout';
import { RouteButton } from 'components/buttons';

const NotFound = ({ classes }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 1000);
        return () => clearTimeout(timer);
    }, [count, setCount]);

    return (
        <Page title="Page Not Found">
            <div className="flex flex-row justify-center mt-24">
                <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden">
                    <img className="w-auto h-96" src={`${process.env.PUBLIC_URL}/images/lost.gif`} alt="What are we?" />
                    <div className="text-lg font-bold mt-6">I'm sorry. I couldn't find that for you.</div>
                    <div className="mt-6 text-sm">
                        <span>Perhaps you are here because:</span>
                        <ul className="list-disc list-inside">
                            <li>The page has moved.</li>
                            <li>The page no longer exists.</li>
                            <li>You were looking for data and it's stuck in the intertubes.</li>
                            <li>Perhaps you just like 404 pages? Probably not.</li>
                        </ul>
                    </div>
                    <div className="mt-6 mb-6 font-bold">
                        <RouteButton to="/">Go back home</RouteButton>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default NotFound;
