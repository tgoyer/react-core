import React from 'react';
import injectSheet from "react-jss";
import { format, parseISO } from 'date-fns';
import Tooltip from 'react-tooltip';

const styles = theme => ({
    alert: {
        color: theme.colors.alert.text,
        fontWeight: theme.fonts.weights.bold,
        textShadow: '0 0 4px #ffffff',
    }
});

const OverdueBadge = ({ classes, task, show }) => {
    const formattedDate = format(parseISO(task.DueDate), "LLL dd, yyyy")
    const tooltipId = `tt_pastdue_${task.Id}`;
    return show === true && (
        <React.Fragment>
            <span data-tip data-for={tooltipId} className={classes.alert}><i className="fas fa-exclamation-circle"></i></span>
            <Tooltip place="right" type="dark" effect="solid" id={tooltipId} aria-haspopup="true" role="example">
                <p>This task is past due.</p>
                <p>The due date was { formattedDate }.</p>
            </Tooltip>
        </React.Fragment>
    )
}

export default injectSheet(styles)(OverdueBadge);