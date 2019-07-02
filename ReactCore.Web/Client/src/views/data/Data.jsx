import React from 'react';
import ReactDataGrid from 'react-data-grid';
import cn from 'classnames';
import injectSheet from "react-jss";
import { useSelector, useDispatch } from 'react-redux';
import { Toolbar, Data, Filters } from 'react-data-grid-addons';

import Button from '../../components/Button';

import { getData } from '../../store/data';

const {
    //AutoCompleteFilter,
    NumericFilter,
    MultiSelectFilter,
    //SingleSelectFilter
} = Filters;
const selectors = Data.Selectors;  

const defaultColumnProperties = {
    filterable: true,
    resizable: true,
    sortable: true,
    sortDescendingFirst: true,
    width: 185,
};
const columns = [
    { key: 'ID', name: 'ID', frozen: true, filterRenderer: NumericFilter, width: 120 },
    { key: 'Title', name: 'Title', filterRenderer: MultiSelectFilter },
    { key: 'Count1', name: 'Value 1', filterRenderer: NumericFilter },
    { key: 'Count2', name: 'Value 2', filterRenderer: NumericFilter },
    { key: 'Count3', name: 'Value 3', filterRenderer: NumericFilter },
    { key: 'Count4', name: 'Value 4', filterRenderer: NumericFilter },
    { key: 'Count5', name: 'Value 5', filterRenderer: NumericFilter },
    { key: 'Count6', name: 'Value 6', filterRenderer: NumericFilter },
    { key: 'Count7', name: 'Value 7', filterRenderer: NumericFilter },
    { key: 'Count8', name: 'Value 8', filterRenderer: NumericFilter },
].map(c => ({ 
    ...defaultColumnProperties, 
    ...c 
}));

const styles = theme => ({
    grid: {
        position: 'relative',
        margin: '0 0 20px 0',
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
})

const DataGrid = ({ classes }) => {
    const [ rows, setRows ] = React.useState([]);
    const [ filters, setFilters ] = React.useState({});

    const dispatch = useDispatch();
    const gridData = useSelector(state => state.data.data);
    const isLoading = useSelector(state => state.data.status.loading);

    const getDataDispatch = React.useCallback(() => { 
        dispatch(getData());
    }, [dispatch]);

    React.useEffect(() => {
        getDataDispatch();
    }, [getDataDispatch]);

    React.useEffect(() => {
        setRows(gridData);
    }, [setRows, gridData]);

    const getRows = (rows, filters) => selectors.getRows({ rows, filters });
    
    const getValidFilterValues = (rows, columnId) => rows
        .map(r => r[columnId])
        .filter((item, i, a) => i === a.indexOf(item));

    const handleClick = (event) => {
        getDataDispatch();
    }
    const handleFilterChange = (filter) => (filters) => {
        const newFilters = { ...filters };

        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        
        return newFilters;
    };

    const sortRows = (initialRows, sortColumn, sortDirection) => (rows) => {
        return sortDirection === "NONE" ? initialRows : [...rows].sort((a, b) => {
            if (sortDirection === "ASC") {
                return a[sortColumn] > b[sortColumn] ? 1 : -1;
            } else if (sortDirection === "DESC") {
                return a[sortColumn] < b[sortColumn] ? 1 : -1;
            }
            return 0;
        });
    };
    const filteredRows = getRows(rows, filters);

    return (
        <React.Fragment>
            <div className={classes.grid}>
                { isLoading && (
                    <div className={classes.gridOverlay}>
                        <i className={cn('fas', 'fa-3x', 'fa-spinner', 'fa-spin', classes.gridSpinner)}></i>
                    </div>
                )}
                <ReactDataGrid
                    columns={columns}
                    rowGetter={i => filteredRows[i]}
                    rowsCount={filteredRows.length}
                    toolbar={<Toolbar enableFilter={true} />}

                    onAddFilter={filter => setFilters(handleFilterChange(filter))}
                    onGridSort={ (sortColumn, sortDirection) => setRows(sortRows(rows, sortColumn, sortDirection)) }
                    onClearFilters={() => setFilters({})}
                    getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}

                    /* Temporary console.warn fix for React Data Grid v6.1 */
                    enableRowSelect={null}
                    rowScrollTimeout={null}
                />
            </div>
            
            <Button type="primary" onClick={handleClick}>Reload</Button>
        </React.Fragment>
    );
}

export default injectSheet(styles)(DataGrid);
