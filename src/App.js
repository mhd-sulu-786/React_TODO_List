import React from 'react';
import './App.css';
import { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function App() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  const dayOfWeek = date.getDay();
  const day = days[dayOfWeek];

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

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
    <Container maxWidth="md">
      <Typography variant="h1" align="center" gutterBottom>
        ToDo List
      </Typography>
      <Typography variant="h2" align="center" gutterBottom>
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
      <div className="todos">
        {activeTodos.map((val) => (
          <div className="todo" key={val.id}>
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
        <div>
          <Typography variant="h3">Completed Tasks</Typography>
          {completedTodos.map((val) => (
            <div className="todo" key={val.id}>
              <Typography variant="body1" className="completed-text">{val.text}</Typography>
              <IconButton onClick={() => handleDelete(val.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      }
    </Container>
  );
}

export default App;
