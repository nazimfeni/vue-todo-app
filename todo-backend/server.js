const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL database
const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root', // Your MySQL password
      database: 'todo_list_db'
    });

    db.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL Database');
    });
    // Get all tasks
app.get('/tasks', (req, res) => {
      db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
      });
    });

    // Add a new task
app.post('/tasks', (req, res) => {
      const { title } = req.body;
      db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, title, completed: false });
      });
    })



    // Update task completion status
app.put('/tasks/:id', (req, res) => {
      const { id } = req.params;
      const { completed } = req.body;
      db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Task updated successfully' });
      });
    });

    
    // Delete a task
app.delete('/tasks/:id', (req, res) => {
      const { id } = req.params;
      db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Task deleted successfully' });
      });
    });


    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    })
