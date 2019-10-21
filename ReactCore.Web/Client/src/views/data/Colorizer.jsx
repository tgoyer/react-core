import React from 'react';

const Colorizer = ({ cell, warning, danger }) => {
    const value = cell._cell.value;
    const color = value > warning
        ? '#090'
        : value > danger
            ? '#00f'
            : '#f00';

    return <span style={{ color }}>{ value }</span>
}

export default Colorizer;