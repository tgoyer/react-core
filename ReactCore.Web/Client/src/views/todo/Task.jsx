import React from 'react';
import cn from 'classnames';
import injectSheet from "react-jss";
import { format, isBefore, parseISO, startOfToday } from 'date-fns';

import themeHelper from '../../utils/themeHelper';

import OverdueBadge from './OverdueBadge';

const styles = theme => ({
    active: {
        maxHeight: '500px !important',
        padding: '16px 16px 16px 24px !important',
        transition: 'max-height 150ms ease, padding 150ms ease',
    },
    collapsedSubTitle: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        transition: 'border-radius 150ms ease',
    },
    container: {
        backgroundColor: themeHelper.color.brightness(theme.colors.secondary.color, 150),
        border: `1px solid ${theme.colors.secondary.color}`,
        borderRadius: 12,
        marginBottom: 8,
        width: '100%',
    },
    content: {
        backgroundColor: themeHelper.color.brightness(theme.colors.secondary.color, 150),
        borderRadius: '0 0 12px 12px',
        padding: '0 16px 0 24px',
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'max-height 200ms ease, padding 200ms ease',
        '& strong': {
            fontSize: 14,
            fontWeight: theme.fonts.weights.bold,
        },
        '& p': {
            marginLeft: 24
        }            
    },
    subtitle: {
        color: theme.colors.secondary.text,
        display: 'flex',
        backgroundColor: themeHelper.color.brightness(theme.colors.secondary.color, 50),
        borderColor: theme.colors.secondary.color,
        borderWidth: '1px 0 1px 0',
        borderStyle: 'solid',
        justifyContent: 'space-between',
        padding: '4px 16px',
        transition: 'border-radius 150ms ease',
        '& strong': {
            marginRight: 16
        },
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.secondary.color,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        color: theme.colors.secondary.text,
        cursor: 'pointer',
        fontSize: 18,
        fontWeight: theme.fonts.weights.bold,
        padding: 12,
    },
});

const Task = ({ active, classes, project, task, user, onClick }) => {
    const dueDate = parseISO(task.DueDate);
    const dueDatePassed = isBefore(dueDate, startOfToday()) && task.IsComplete === false;

    const handleClick = (evt) => {
        if (onClick != null) {
            onClick(task);
        }
    }

    const getStatus = () => {
        return task.IsComplete === true ? 'Complete' 
            : dueDatePassed ? 'Overdue' 
            : 'Incomplete';
    }

    return (
        <div className={classes.container}>
            <div className={classes.title} onClick={handleClick}>
                <span>{ task.Name }</span>
                <OverdueBadge show={dueDatePassed} task={task} />
            </div>
            <div className={cn({ [classes.collapsedSubTitle]: !active }, classes.subtitle)}>
                <span><strong>Due:</strong>{ format(dueDate, "LLL dd, yyyy") }</span>
                <span><strong>Assigned User:</strong>{ user != null ? user.FullName : '- Unassigned -' }</span>
                <span><strong>Status:</strong>{ getStatus(task) }</span>
            </div>
            <div className={cn(classes.content, { [classes.active]: active })}>
                <strong>Comments:</strong>
                <p>{ task.Comments }</p>
                <strong>Project:</strong>
                <p>{ project != null ? project.Name : '- Unassigned -' }</p>
            </div>
        </div>
    );
}

export default injectSheet(styles)(Task);