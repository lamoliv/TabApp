import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Home from './Home';
import TodoList from './TodoList';

function TabApp() {
    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <div>
            <Stack
                marginTop={10}
            >
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="home" label="Home" />
                    <Tab value="todolist" label="Todos" />
                </Tabs>
                {value === 'home' && <Home />}
                {value === 'todolist' && <TodoList />
                }
            </Stack>
        </div>
    );
}

export default TabApp;

