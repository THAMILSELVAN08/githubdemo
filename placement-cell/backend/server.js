const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite DB setup
const db = new sqlite3.Database(path.join(__dirname, 'db.sqlite'), (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables if not exist
const initDb = () => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    title TEXT,
    description TEXT,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    job_id INTEGER,
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(job_id) REFERENCES jobs(id)
  )`);
};

initDb();

// Placeholder routes
app.get('/', (req, res) => {
  res.send('Placement Cell API running');
});

// Students
app.post('/api/students/register', (req, res) => {
  // TODO: Implement registration
  res.json({ message: 'Student registration endpoint' });
});

// Companies
app.post('/api/companies/register', (req, res) => {
  // TODO: Implement registration
  res.json({ message: 'Company registration endpoint' });
});

// Jobs
app.get('/api/jobs', (req, res) => {
  // TODO: Implement job listing
  res.json({ jobs: [] });
});

// Stats
app.get('/api/stats', (req, res) => {
  // TODO: Implement stats
  res.json({ stats: {} });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});