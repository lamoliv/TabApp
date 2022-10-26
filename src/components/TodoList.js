import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';


import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css';

function TodoList() {
    const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();
    const [open, setOpen] = useState(false);


    const addTodo = (event) => {
        event.preventDefault();
        setTodos([...todos, todo]);
    }

    const changed = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value });
    }

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index !== gridRef.current.getSelectedNodes()[0].childIndex));
            setOpen(true)
        }
        else {
            alert('Select row first');
        }
    }

    const [columns] = useState([
        { headerName: "Description", field: "description", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Date", field: "date", sortable: true, filter: true, floatingFilter: true },
        {
            headerName: "Priority", field: "priority", sortable: true, filter: true, floatingFilter: true,
            cellStyle: params => params.value === 'High' ? { color: 'red' } : { color: 'black' }
        }
    ]);

    return (
        <div>
            <h2>To-Do List</h2>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                marginTop={10}
            >
                <TextField
                    label="Description"
                    variant="standard"
                    onChange={changed}
                    name="description"
                    value={todo.description}
                />

                <TextField
                    label="Date"
                    variant="standard"
                    name="date"
                    value={todo.date}
                    onChange={changed}
                />

                <TextField
                    label="Priority"
                    variant="standard"
                    onChange={changed}
                    name="priority"
                    value={todo.priority}
                />
                <Button
                    startIcon={<AddIcon />}
                    onClick={addTodo}
                    variant="contained" >
                    Add
                </Button>
                <Button
                    startIcon={<DeleteIcon />}
                    onClick={deleteTodo}
                    variant="contained"
                    color="error">
                    Delete
                </Button>
            </Stack>

            <div className='ag-theme-material' style={{ margin: 'auto', width: '50%', height: 600 }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection='single'
                    rowData={todos}
                    columnDefs={columns}
                    animateRows={true}
                />
            </div>

            <Snackbar
                open={open}
                message="Todo deleted succesfully"
                autoHideDuration={1500}
                onClose={() => setOpen(false)}
            />
        </div>
    );
}

export default TodoList;