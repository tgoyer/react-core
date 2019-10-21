import React from 'react';

const TotalCell = ({ cell, aggregator }) => {
    const data = cell._cell.row.data;
    return <span>{ aggregator(data) }</span>;
}

export default TotalCell;