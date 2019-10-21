import React from 'react';
import injectSheet from "react-jss";

import { useSelector, useDispatch } from 'react-redux';
import { parseISO } from 'date-fns';

import { Button } from '../../components/Forms';
import { Modal } from '../../components/Modal';
import { SubNavigation, SubNavigationItem, SubNavigationSpacer } from '../../components/SubNavigation';
import Task from './Task';

import AddProject from './AddProject';
import AddTask from './AddTask';

import { getProjects } from '../../store/projects';
import { getTasks } from '../../store/tasks';
import { getUsers } from '../../store/users';
import { setAppTitle } from '../../store/appState';

import taskFilters, { tabs } from './taskFilters';

const styles = theme => ({
    loading: {
        padding: '8px 8px 8px 16px'
    },
    small: {
        fontWeight: theme.fonts.weights.bold,
        marginBottom: 12
    },
    taskList: {
        minWidth: 500,
        width: '33%',
    },
    taskListActions: {
        display: 'inline-block',
    },
    taskListHeading: {
        alignItems: 'center',
        display: 'flex',
        height: 70,
        justifyContent: 'space-between',
        padding: '8px 8px 0 8px',
        minWidth: 500,
        width: '33%',
    },
    taskListTitle: {
        display: 'inline-block',
        minHeight: '1rem',
        fontSize: '2rem',
        fontWeight: theme.fonts.weights.bold,
    },
    zeroState: { 
        fontSize: 16, 
        fontWeight: theme.fonts.weights.bold,
        marginBottom: 20
    }
})

const Todo = ({ classes }) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const [filterByUser, setFilterByUser] = React.useState(false);
    const [projectList, setProjectList] = React.useState([]);
    const [showAddProject, setShowAddProject] = React.useState(false);
    const [showAddTask, setShowAddTask] = React.useState(false);
    const [showProjects, setShowProjects] = React.useState(false);
    const [selectedProjectId, setSelectedProjectId] = React.useState(null);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [tab, setTab] = React.useState(0);
    const [taskList, setTaskList] = React.useState([]);

    const dispatch = useDispatch();
    const projectLoading = useSelector(state => state.projects.list.status.loading);
    const projectStore = useSelector(state => state.projects.list.data);
    const taskLoading = useSelector(state => state.tasks.list.status.loading);
    const taskStore = useSelector(state => state.tasks.list.data);
    const currentUserId = useSelector(state => state.users.current.data.Id);
    const userStore = useSelector(state => state.users.list.data);

    const isActiveTab = (tabIndex) => tab === tabIndex;
    const getTabCount = (tabIndex) => taskLoading ? null : filterTasks(taskStore, taskFilters[tabIndex](getFilterId(tabIndex))).length;
    const getTaskCount = (project) => taskLoading ? null : filterTasks(taskStore, taskFilters[tabs.PROJECTS](project.Id)).length;
    
    const filterTasks = React.useCallback((tasks, filter) => {
        tasks = filter != null ? taskStore.filter(filter) : [];
        if (filterByUser) tasks = tasks.filter(taskFilters.userFilter(currentUserId));
        return tasks.sort((a, b) => (parseISO(a.DueDate) > parseISO(b.DueDate)) ? 1 : -1);
    }, [currentUserId, filterByUser, taskStore]);

    const getFilterId = React.useCallback((tabIndex) => {
        return tabIndex === tabs.INBOX ? currentUserId : tabIndex === tabs.PROJECTS ? selectedProjectId : null;
    }, [currentUserId, selectedProjectId]);

    const handleCompleteClick = () => updateView(tabs.COMPLETE);
    const handleInboxClick = () => updateView(tabs.INBOX);
    const handleMonthClick = () => updateView(tabs.MONTH);
    const handleOverdueClick = () => updateView(tabs.PAST_DUE);
    const handleTodayClick = () => updateView(tabs.TODAY);
    const handleWeekClick = () => updateView(tabs.WEEK);

    const handleTaskClick = (task) => setSelectedTask( (selectedTask != null && task.Id === selectedTask.Id) ? null : task );
    const handleUserFilterClick = (filterByUser) => () => setFilterByUser(filterByUser);
    const handleProjectClick = (p) => (evt) => {
        setSelectedProjectId(p.Id);
        setTab(tabs.PROJECTS);
    }
    const handleProjectsClick = () => {
        const showList = !showProjects;

        if (selectedProjectId == null) {
            const projectId = projectList != null && projectList.length > 0 ? projectList[0].Id : null;
            setSelectedProjectId(projectId);
        }

        setTab(tabs.PROJECTS);
        setShowProjects(showList);
    }

    const handleAddProjectClick = () => {
        setShowAddProject(true);
        setShowAddTask(false);
    }
    const handleAddTaskClick = () => {
        setShowAddProject(false);
        setShowAddTask(true);
    }

    const handleModalClose = (data) => {
        console.log('Modal Close:', data);
        setShowAddProject(false);
        setShowAddTask(false);
    }
    const handleModalCancel = () => {
        console.log('Modal Cancel');
        setShowAddProject(false);
        setShowAddTask(false);
    }

    const setInitialTask = (tasks) => setSelectedTask(tasks != null && tasks.length > 0 ? tasks[0] : null);

    const updateView = React.useCallback((tabIndex) => {
        const id = getFilterId(tabIndex);
        const tasks = filterTasks(taskStore, taskFilters[tabIndex](id));

        setTab(tabIndex);
        setTaskList(tasks);
        setInitialTask(tasks);
    }, [filterTasks, getFilterId, taskStore]);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        dispatch(getProjects());
        dispatch(getTasks());
        dispatch(getUsers());
        dispatch(setAppTitle('To Do List'));
    }, [dispatch]);

    React.useEffect(() => {
        setProjectList(projectStore);

        if (tab === tabs.PROJECTS) {
            const projectId = projectStore != null && projectStore.length > 0 ? projectStore[0].Id : null;
            setSelectedProjectId(projectId);
        }
    }, [projectStore, tab]);

    React.useEffect(() => {
        const tasks = [ ...taskStore.filter(taskFilters[tabs.INBOX](currentUserId)) ];
        setTab(tabs.INBOX);
        setTaskList(tasks);
        setInitialTask(tasks);
    }, [currentUserId, taskStore]);

    React.useEffect(() => {
        updateView(tab);
    }, [selectedProjectId, filterByUser, updateView, tab]);

    return isMounted && (
        <React.Fragment>
            <Modal show={showAddProject || showAddTask} onClose={handleModalClose} onCancel={handleModalCancel}>
                { 
                    ({ onChange }) => (
                        <React.Fragment>
                            {showAddTask && <AddTask projects={projectStore} users={userStore} onChange={onChange} />}
                            {showAddProject && <AddProject users={userStore} onChange={onChange} />}
                        </React.Fragment>
                    )
                }
            </Modal>
            <SubNavigation>
                <SubNavigationItem label="Add a New Task" icon="fas fa-plus" onClick={handleAddTaskClick} />
                <SubNavigationSpacer />
                <SubNavigationItem active={isActiveTab(tabs.INBOX)} count={getTabCount(tabs.INBOX)} label="Inbox" icon="fas fa-inbox" onClick={handleInboxClick} />
                <SubNavigationItem active={isActiveTab(tabs.PAST_DUE)} count={getTabCount(tabs.PAST_DUE)} label="Overdue" icon="fas fa-exclamation-triangle" onClick={handleOverdueClick} />
                <SubNavigationItem active={isActiveTab(tabs.TODAY)} count={getTabCount(tabs.TODAY)} label="Today" icon="fas fa-calendar-day" onClick={handleTodayClick} />
                <SubNavigationItem active={isActiveTab(tabs.WEEK)} count={getTabCount(tabs.WEEK)} label="Next 7 Days" icon="fas fa-calendar-week" onClick={handleWeekClick} />
                <SubNavigationItem active={isActiveTab(tabs.MONTH)} count={getTabCount(tabs.MONTH)} label="Next 30 Days" icon="fas fa-calendar" onClick={handleMonthClick} />
                <SubNavigationSpacer />
                <SubNavigationItem active={isActiveTab(tabs.COMPLETE)} count={getTabCount(tabs.COMPLETE)} label="Completed" icon="fas fa-check-circle" onClick={handleCompleteClick} />
                <SubNavigationSpacer />
                <SubNavigationItem active={isActiveTab(tabs.PROJECTS) && showProjects} label="Projects" icon="fas fa-project-diagram" onClick={handleProjectsClick} />
                { showProjects && projectLoading && <span className={classes.loading}><i className="fas fa-spinner fa-pulse fa-2x"></i></span> }
                { showProjects && !projectLoading && projectList.map(p => {
                    const icon = p.Id === selectedProjectId ? "fas fa-chevron-circle-right" : "far fa-circle";
                    return <SubNavigationItem key={p.Id} depth={2} count={getTaskCount(p)} label={p.Name} icon={icon} onClick={handleProjectClick(p)} />
                })}
                { showProjects && !projectLoading && <SubNavigationItem depth={2} label="Add a New Project" icon="fas fa-plus" onClick={handleAddProjectClick} /> }
            </SubNavigation>
            <div className={classes.taskListHeading}>
                <div className={classes.taskListTitle}>Tasks</div>
                { tab !== tabs.INBOX && (
                    <div className={classes.taskListActions}>
                        { filterByUser === true && <Button type="primary" onClick={handleUserFilterClick(false)}>Show All Tasks</Button> }
                        { filterByUser === false && <Button type="primary" onClick={handleUserFilterClick(true)}>Show My Tasks</Button> }
                    </div>
                )}
            </div>
            <div className={classes.taskList}>
                { projectLoading || taskLoading 
                    ? <div className={classes.loading}><i className="fas fa-spinner fa-pulse fa-3x"></i></div>
                    : (
                        <React.Fragment>
                            {tab === tabs.INBOX ? null : filterByUser
                                ? <div className={classes.small}>Showing only my tasks</div>
                                : <div className={classes.small}>Showing all tasks</div>
                            }
                            { taskList.length === 0
                                ? ( 
                                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 50}}>
                                        <p className={classes.zeroState}>Hurray!  This task list is empty.</p>
                                        <Button type="primary" onClick={handleAddTaskClick}>Add a New Task</Button>
                                    </div>
                                ) : taskList.map(task => (
                                    <Task key={task.Id} 
                                        user={userStore.find(u => u.Id === task.UserId) }
                                        project={projectList.find(p => p.Id === task.ProjectId) }
                                        task={task} 
                                        onClick={handleTaskClick} 
                                        active={selectedTask != null && task.Id === selectedTask.Id} />
                                ))
                            }
                        </React.Fragment>
                    )
                }
            </div>
        </React.Fragment>
    )
}

export default injectSheet(styles)(Todo);