import React from 'react';

import { useSelector } from 'react-redux';

import Navigation from './Navigation';

const Header = () => {
    const user = useSelector((state) => state.user.current.data);
    const settings = useSelector((state) => state.app.settings.data);

    return (
        <>
            <div className="flex flex-row justify-between items-center text-white bg-green-800 header-gradient py-1 px-4">
                <div className="w-14 flex flex-row justify-between items-center text-3xl font-bold">
                    <div className="ml-5">
                        <span>React Core</span>
                        <span className="text-black italic text-lg ml-3">v.1.0</span>
                    </div>
                </div>
                {settings?.environment !== 'PROD' && (
                    <div className="bg-red-700 rounded-full px-4 py-1 font-bold">{settings?.environment}</div>
                )}
                <div className="text-md font-bold">Welcome, {user?.fullName}</div>
            </div>
            <Navigation />
            <div id="app-subheader-root" />
        </>
    );
};

export default Header;
