import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="bg-black">
            <ul className="flex flex-row items-center m-0 py-0 px-8 h-10">
                <li className="list-none">
                    <Link className="text-white text-sm no-underline hover:underline" to="/">
                        Dashboard
                    </Link>
                </li>
                <li className="list-none ml-8">
                    <Link className="text-white text-sm no-underline hover:underline" to="/route-2">
                        Another Route
                    </Link>
                </li>
                <li className="list-none ml-8">
                    <Link className="text-white text-sm no-underline hover:underline" to="/route-3">
                        A Third Route
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;
