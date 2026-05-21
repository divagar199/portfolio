const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for cross-origin client requests
app.use(cors({
  origin: '*', // In production, restrict this to specific origins if desired
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configure high request limits to support base64 compressed project preview graphic uploads
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

// Serve static assets if needed
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// --- REST API ROUTES ---

// Admin Login Authentication Gate
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Credentials missing." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim().toLowerCase();

  // Robust check allowing case-insensitivity (prevents mobile keyboard auto-cap errors)
  if (cleanEmail === 'divagar.m.msc.cs@gmail.com' && cleanPassword === 'diva755034') {
    return res.json({
      success: true,
      token: "active_secure_mern_session_token",
      user: { email: "divagar.m.msc.cs@gmail.com", name: "Divagar M" }
    });
  } else {
    return res.status(401).json({ success: false, message: "Access Denied: Invalid security credentials." });
  }
});

// GET: Fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.getAll();
    res.json(projects);
  } catch (error) {
    console.error("API GET Projects Error:", error);
    res.status(500).json({ error: "Could not fetch portfolio projects." });
  }
});

// POST: Add a new project
app.post('/api/projects', async (req, res) => {
  try {
    const { title, subtitle, desc, tags, link, image } = req.body;

    if (!title || !desc || !image) {
      return res.status(400).json({ error: "Required fields missing (title, desc, image)." });
    }

    const newProject = await db.create({
      title,
      subtitle,
      desc,
      tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean),
      link,
      image
    });

    res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    console.error("API POST Project Error:", error);
    res.status(500).json({ error: "Could not save portfolio project." });
  }
});

// PUT: Modify an existing project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, desc, tags, link, image } = req.body;

    const parsedTags = Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined);

    const updatedProject = await db.update(id, {
      title,
      subtitle,
      desc,
      tags: parsedTags,
      link,
      image
    });

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error("API PUT Project Error:", error);
    res.status(500).json({ error: "Could not modify portfolio project." });
  }
});

// DELETE: Remove an existing project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    console.error("API DELETE Project Error:", error);
    res.status(500).json({ error: "Could not delete portfolio project." });
  }
});

// Start the Express Listener
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` MERN BACKEND SERVER RUNNING SECURELY ON PORT ${PORT} `);
  console.log(`===================================================`);
});
