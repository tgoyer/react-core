import React from 'react';
import injectSheet from "react-jss";

import { Form } from '../../components/Forms';

const styles = theme => ({});

const AddTask = ({ classes, projects, task, users, onChange }) => {
    const [form, setForm] = React.useState({ 
        type: 'task', 
        name: '', 
        user: null, 
        project: null, 
        comments: ''  
    });

    const userOptions = users != null
        ? users.map(user => ({ key: user.Id, text: user.FullName, value: user.Id }))
        : [];
    const projectOptions = projects != null
        ? projects.map(project => ({ key: project.Id, text: project.Name, value: project.Id }))
        : [];
    
    const handleChange = (evt, field) => {
        setForm({
            ...form,
            [field.name]: field.value
        })
    }

    React.useEffect(() => {
        if (task != null) {
            setForm({
                name: task.Name, 
                user: task.UserId, 
                project: task.ProjectId, 
                comments: task.Comments 
            })
        }
    }, [task])

    React.useEffect(() => {
        onChange(form);
    }, [onChange, form]);

    return (
        <Form>
            <Form.Group widths="equal">
                <Form.Field 
                    control={Form.Input}
                    fluid
                    name="name"
                    id="name"
                    label="Name" 
                    placeholder="Name" 
                    onChange={handleChange}
                    value={form.name}
                />
                <Form.Field 
                    fluid
                    control={Form.Select}
                    name="project"
                    label={{ children: 'Project', htmlFor: 'project' }}
                    placeholder="Project" 
                    onChange={handleChange}
                    value={form.project}
                    options={projectOptions}
                    search={true}
                    searchInput={{ id: 'project' }}
                />
                <Form.Field 
                    fluid
                    control={Form.Select}
                    name="user"
                    label={{ children: 'Assignee', htmlFor: 'user' }}
                    placeholder="Assignee" 
                    onChange={handleChange}
                    value={form.user}
                    options={userOptions}
                    search={true}
                    searchInput={{ id: 'user' }}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field 
                    fluid
                    control={Form.TextArea}
                    id="comments"
                    name="comments"
                    label="Comments" 
                    placeholder="Comments" 
                    style={{ minHeight: 100 }}
                    onChange={handleChange}
                    value={form.comments}
                />
            </Form.Group>
        </Form>
    );
}

export default injectSheet(styles)(AddTask);