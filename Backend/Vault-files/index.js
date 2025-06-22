const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs'); // <--- שורה חדשה: ייבוא מודול fs לקריאת קבצים

// Connect to MongoDB
// שינוי כאן: קוראים את ה-URL מקובץ ש-Vault Agent יזריק
try {
  const mongoUrlFromFile = fs.readFileSync('/vault/secrets/mongo-url', 'utf8').trim(); // <--- שורה חדשה: קריאת ה-URL מקובץ
  mongoose.connect(mongoUrlFromFile, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB successfully');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
} catch (error) {
  console.error('Failed to read MongoDB URL from file or connect:', error);
  // חשוב: אם הקובץ לא קיים או שיש בעיה בחיבור, האפליקציה לא תוכל לפעול.
  // כדאי להוסיף לוגיקה לטיפול בשגיאה (לדוגמה, יציאה מהתהליך או ניסיון חוזר).
  process.exit(1); // יציאה מהתהליך אם הקובץ לא נקרא או יש בעיה בחיבור
}


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define Task Schema and Model
const taskSchema = new mongoose.Schema({
  taskName: String,
  completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// GET /tasks - Retrieve all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log(`Fetched ${tasks.length} tasks from the database.`);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// POST /tasks - Create a new task
app.post('/tasks', async (req, res) => {
  const { taskName } = req.body;
  console.log(`Attempting to insert task: ${taskName}`);

  const newTask = new Task({
    taskName,
    completed: false
  });

  try {
    const savedTask = await newTask.save();
    console.log(`Task inserted successfully: ${savedTask}`);
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error inserting task:', error);
    res.status(500).json({ error: 'Error inserting task' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});