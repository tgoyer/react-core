import React from 'react';
import cn from 'classnames';
import injectSheet from "react-jss";
import { format, isBefore, parseISO, startOfToday } from 'date-fns';

import OverdueBadge from './OverdueBadge';

const styles = theme => ({
    alert: {
        color: theme.colors.alert.text,
        fontWeight: theme.fonts.weights.bold,
    },
    collapsed: {
        borderRadius: 8,
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        boxShadow: '1px 1px 3px rgba(0, 0, 0, .25)',
        marginBottom: 8,
        width: '100%',
    },
    content: {
        padding: '16px 16px 16px 24px',
        '& strong': {
            fontSize: 14,
            fontWeight: theme.fonts.weights.bold,
        },
        '& p': {
            marginLeft: 24
        }            
    },
    subtitle: {
        display: 'flex',
        backgroundColor: '#e7f4fd',
        borderColor: '#9fd3f9',
        borderWidth: '1px 0 1px 0',
        borderStyle: 'solid',
        justifyContent: 'space-between',
        padding: '4px 16px',
        '& strong': {
            marginRight: 16
        },
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#cfe9fc',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        color: '#40a9f3',
        cursor: 'pointer',
        fontSize: 18,
        fontWeight: theme.fonts.weights.bold,
        padding: 12,
    },
});

const Task = ({ active, classes, project, task, user, onClick }) => {
    const handleClick = (evt) => {
        if (onClick != null) {
            onClick(task);
        }
    }

    const getStatus = () => task.IsComplete === true ? 'Complete' : 'Incomplete';

    const dueDate = parseISO(task.DueDate);
    const dueDatePassed = isBefore(dueDate, startOfToday()) && task.IsComplete === false;

    return (
        <div className={classes.container}>
            <div className={cn(classes.title, { [classes.collapsed]: !active })} onClick={handleClick}>
                <span>{ task.Name }</span>
                <OverdueBadge show={dueDatePassed} task={task} />
            </div>
            { active && (
                <React.Fragment>
                    <div className={classes.subtitle}>
                        <span><strong>Due:</strong><span className={ cn({ [classes.alert]: dueDatePassed }) }>{ format(dueDate, "LLL dd, yyyy") }</span></span>
                        <span><strong>Status:</strong>{ getStatus(task) }</span>
                    </div>
                    <div className={classes.content}>
                        <strong>Comments:</strong>
                        <p>{ task.Comments }</p>
                        <strong>Project:</strong>
                        <p>{ project != null ? project.Name : '- Unassigned -' }</p>
                        <strong>Assigned User:</strong>
                        <p>{ user != null ? user.FullName : '- Unassigned -' }</p>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default injectSheet(styles)(Task);