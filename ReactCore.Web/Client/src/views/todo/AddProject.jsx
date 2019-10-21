import React from 'react';
import injectSheet from "react-jss";

import { Form } from '../../components/Forms';

const styles = theme => ({});

const AddProject = ({ classes, project, users, onChange }) => {
    const [form, setForm] = React.useState({ type: 'project', name: '', user: '' });
    const userOptions = users != null
        ? users.map(user => ({ key: user.Id, text: user.FullName, value: user.Id }))
        : [];
    
    const handleChange = (evt, field) => {
        setForm({
            ...form,
            [field.name]: field.value
        })
    }

    React.useEffect(() => {
        onChange(form);
    }, [onChange, form]);

    return (
        <Form>
            <Form.Group widths="equal">
                <Form.Field 
                    control={Form.Input}
                    fluid={true} 
                    name="name"
                    id="name"
                    label="Name" 
                    placeholder="Name" 
                    onChange={handleChange}
                    value={form.name}
                />
                <Form.Field 
                    fluid={true} 
                    control={Form.Select}
                    name="user"
                    label={{ children: 'Owner', htmlFor: 'user' }}
                    placeholder="Owner" 
                    onChange={handleChange}
                    value={form.user}
                    options={userOptions}
                    search={true}
                    searchInput={{ id: 'user' }}
                />
            </Form.Group>
        </Form>
    );
}

export default injectSheet(styles)(AddProject);