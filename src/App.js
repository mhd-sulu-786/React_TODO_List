import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { Typography, TextField, Button, Grid, Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import 'react-bootstrap';

function App() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  const dayOfWeek = date.getDay();
  const day = days[dayOfWeek];

  // Retrieve todos from local storage or initialize an empty array
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [todo, setTodo] = useState('');

  // Save todos to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, { text: todo, completed: false, id: Date.now() }]);
      setTodo('');
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className='container-fluid'>
     
   <div className='main_1 ' >
      <Typography variant="h2" className='h1'  align="center" gutterBottom>
        ToDo List
      </Typography>
      <Typography variant="h3" className='h3' align="center" gutterBottom>
        Whoop, it's {day} 🌝 ☕
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            variant="outlined"
            label="Add item..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddTodo}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <div className="todos mt-2" >
        {activeTodos.map((val) => (
          <div className="todo px-2" key={val.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={val.completed}
                  onChange={() => handleToggleComplete(val.id)}
                />
              }
              label={val.text}
            />
            <IconButton onClick={() => handleDelete(val.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      {completedTodos.length > 0 &&
        <div className='completed mt-2 '>
          <Typography variant="h3">Completed Tasks</Typography>
          {completedTodos.map((val) => (
            <div className="todo px-2 bg-success" key={val.id}>
              <Typography variant="body1" className="completed-text">{val.text}</Typography>
              <IconButton onClick={() => handleDelete(val.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      }
    </div>
   
    </div>
  );
}

export default App;

