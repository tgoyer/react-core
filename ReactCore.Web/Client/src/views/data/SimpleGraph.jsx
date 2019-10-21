import React from 'react';

const SimpleGraph = ({ cell, total, aggregator }) => {
    const data = cell._cell.row.data;
    const val = aggregator(data);

    return <div style={{ backgroundColor: '#eee', border: '1px solid #000', boxShadow: 'inset 2px 2px 0px 0px rgba(0,0,0,0.12)', }}>
            <div style={{ backgroundColor: '#f00', height: 16, boxShadow: 'inset 2px 2px 0px 0px rgba(0,0,0,0.12)', width: `${(val/total)*100}%`, }}>
            </div>
        </div>
}

export default SimpleGraph;