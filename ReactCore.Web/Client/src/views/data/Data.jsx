import React from 'react';
import cn from 'classnames';
import injectSheet from "react-jss";
import { useSelector, useDispatch } from 'react-redux';

import { ReactTabulator, reactFormatter } from "react-tabulator"; // https://github.com/ngduc/react-tabulator

import { SubNavigation, SubNavigationItem } from '../../components/SubNavigation';
import Colorizer from './Colorizer';
import SimpleGraph from './SimpleGraph';
import TotalCell from './TotalCell';

import { clearData, getData } from '../../store/data';
import { setAppTitle } from '../../store/appState';
import broadcast from '../../utils/broadcast';

import 'react-tabulator/lib/styles.css'; // default theme
import 'react-tabulator/css/semantic-ui/tabulator_semantic-ui.min.css'; // use Theme(s)

const styles = theme => ({
    grid: {
        '&.tabulator': {
            backgroundColor: '#f9fafb',
            margin: 0,
        },
        '& .tabulator-row.tabulator-selected': {
            backgroundColor: '#fff8d6',
        },
        '& .tabulator-headers .tabulator-col-resize-handle': {
            backgroundColor: '#f6f7f9',
            borderLeft: '1px solid #e6e6e6',
            margin: 0,
            paddingLeft: 2,
            paddingRight: 0,
            width: 0,
            '&.prev': {
                borderLeft: 0,
                borderRight: '1px solid #e6e6e6',
                paddingLeft: 0,
                paddingRight: 2,
            }
        },
        '& .tabulator-col-content': {
            padding: '1em !important'
        },
        '& .tabulator-row': {
            backgroundColor: '#fff',
        },
        '& .tabulator-row-handle': {
            cursor: 'ns-resize',
        }
    },
    gridContainer: {
        position: 'relative',
        margin: 0,
        width: '100%',
        '& input.input-sm': {
            lineHeight: '8px',
        },
        '& span.badge': {
            fontSize: 20,
            padding: '0 5px',
        },
    },
    gridOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(138, 138, 138, 0.75)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridSpinner: {
        color: '#ffffff',
    }
});

const dataAggregator = data => {
    return data.Count1 + data.Count2 + data.Count3 + data.Count4 + data.Count5 + data.Count6 + data.Count7 + data.Count8;
}

const headerClipboardAccessor = () => false;
const handleHeaderClick = (e, column) => column._column.definition;

const gridOptions = {
    clipboard: true,
    clipboardCopySelector: 'table',
    columnHeaders: 'columns',
    columnVertAlign: 'bottom', 
    headerSortTristate: true,
    height: 'calc(100vh - 190px)',
    layout: 'fitDataFill',
    movableColumns: true,
    movableRows: true,
    persistentLayout: true,
    persistenceMode: true,
    persistentSort: true,
    persistenceID: 'gridPersistence',
    selectable: true,
    rowClick: (e, id, data, row) => {
        console.log('rowClick: ', e, id, data, row)
    },
    rowContext: (e, id, data, row) => {
        console.log('rowContext: ', e, id, data, row)
    },
    rowSelectionChanged: (data, rows) => {
        console.log('rowSelectionChanged: ', data);
    },
};

const DataGrid = ({ classes }) => {
    const gridRef = React.useRef();
    const dispatch = useDispatch();
    const gridData = useSelector(state => state.data.data);
    const isLoading = useSelector(state => state.data.status.loading);

    const columns = [
        { title: 'General', columns: [
            { rowHandle: true, formatter: "handle", headerSort: false, frozen: true, width: 45, minWidth: 45 },
            { field: 'Id', title: 'ID', width: 75, sorter: 'number', frozen: true },
            { field: 'Title', title: 'Title', frozen: true },
        ]},
        { title: 'Value Group 1', columns: [
            { field: 'Count1', title: 'Value 1' },
            { field: 'Count2', title: 'Value 2' },
            { field: 'Count3', title: 'Value 3' },
            { field: 'Count4', title: 'Value 4' },
        ]},
        { title: 'Value Group 2', columns: [
            { field: 'Count5', title: 'Value 5' },
            { field: 'Count6', title: 'Value 6' },
            { field: 'Count7', title: 'Value 7' },
            { field: 'Count8', title: 'Value 8' },
        ]},
        { title: 'Value Group 3', columns: [
            { field: 'Count9', title: 'Value 9' },
            { field: 'Count10', title: 'Value 10' },
            { field: 'Count11', title: 'Value 11' },
            { field: 'Count12', title: 'Value 12' },
        ]},
        { title: 'Value Group 4', columns: [
            { field: 'Count13', title: 'Value 13' },
            { field: 'Count14', title: 'Value 14' },
            { field: 'Count15', title: 'Value 15' },
            { field: 'Count16', title: 'Value 16' },
        ]},
        { title: 'Misc', columns: [
            { title: 'Total', headerSort: false, formatter: reactFormatter(<TotalCell aggregator={dataAggregator} />) },
            { title: 'Graph', headerSort: false, formatter: reactFormatter(<SimpleGraph aggregator={dataAggregator} total={800} />) },
        ]},
    ].map(c => {
        return (c.columns != null) 
            ? { 
                ...c, 
                accessorClipboard: headerClipboardAccessor,
                headerClick: handleHeaderClick, 
                columns: ['General', 'Misc'].indexOf(c.title) >= 0 
                    ? c.columns 
                    : c.columns.map(cc => ({ 
                        sorter: 'number', 
                        formatter: reactFormatter(<Colorizer warning={35} danger={10} />),
                        ...cc
                    }))
            } : c
    });

    const initOnLoad = React.useCallback(() => { 
        dispatch(getData());
        dispatch(setAppTitle('Data Grid Demo'))
    }, [dispatch]);

    React.useEffect(() => {
        initOnLoad();
    }, [initOnLoad]);

    const handleClear = (event) => {
        broadcast.message('Grid data cleared.  Press "Reload" to re-fetch the data.')
        dispatch(clearData());
    }

    const handleReload = (event) => {
        initOnLoad();
    }

    const rowClick = (e, row) => {
        console.log('ref table: ', gridRef.current.table); // this is the Tabulator table instance
        console.log('rowClick', row.getData().Id, row, e);
    };
  
    return (
        <React.Fragment>
            <SubNavigation>
                <SubNavigationItem label="Reload" icon="fas fa-sync-alt" onClick={handleReload} />
                <SubNavigationItem label="Clear" icon="fas fa-trash" onClick={handleClear} />
            </SubNavigation>
            <div className={classes.gridContainer}>
                { isLoading && (
                    <div className={classes.gridOverlay}>
                        <i className={cn('fas', 'fa-3x', 'fa-spinner', 'fa-spin', classes.gridSpinner)}></i>
                    </div>
                )}
                <ReactTabulator
                    ref={gridRef}
                    columns={columns}
                    data={gridData}
                    rowClick={rowClick}
                    options={gridOptions}
                    className={classes.grid}
                />
            </div>
        </React.Fragment>
    );
}

export default injectSheet(styles)(DataGrid);
