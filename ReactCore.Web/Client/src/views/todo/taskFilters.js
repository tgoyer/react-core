import { addDays, isBefore, isToday, isWithinInterval, parseISO, startOfToday } from 'date-fns';

export const tabs = {
    INBOX: 0,
    TODAY: 1,
    WEEK: 2,
    MONTH: 3,
    PAST_DUE: 4,
    PROJECTS: 5,
    COMPLETE: 6,
    USERS: 7,
}

export const overdue =          t => isBefore(parseISO(t.DueDate), startOfToday());
export const userFilter =       userId => t => t.UserId === userId;
export const complete =    () => t => t.IsComplete === true;
export const inbox =       userId => t => t.IsComplete === false && userFilter(userId)(t); 
export const month =       () => t => t.IsComplete === false && (overdue(t) || isWithinInterval(parseISO(t.DueDate), { start: startOfToday(), end: addDays(startOfToday(), 30) }));
export const pastDue =     () => t => t.IsComplete === false && overdue(t);
export const project =     projectId => t => t.IsComplete === false && t.ProjectId === projectId;
export const today =       () => t => t.IsComplete === false && (overdue(t) || isToday(parseISO(t.DueDate)));
export const week =        () => t => t.IsComplete === false && (overdue(t) || isWithinInterval(parseISO(t.DueDate), { start: startOfToday(), end: addDays(startOfToday(), 7) }));
export const users =       userId => t => t.IsComplete === false && t.UserId === userId;

export default {
    [tabs.COMPLETE]: complete,
    [tabs.INBOX]: inbox,
    [tabs.MONTH]: month,
    [tabs.PAST_DUE]: pastDue,
    [tabs.PROJECTS]: project,
    [tabs.TODAY]: today,
    [tabs.WEEK]: week,
    [tabs.USERS]: users,
    userFilter,
    overdue
};