import React from 'react';
import ReactDOM from 'react-dom';

const SubHeader = ({ children }) => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted
        ? ReactDOM.createPortal(
              <div className="flex flex-row items-center bg-gray-50 shadow-md px-0 py-2">{children}</div>,
              document.getElementById('app-subheader-root')
          )
        : null;
};

export default SubHeader;
