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

// --- SKILLS COLLECTION CRUD ---
app.get('/api/skills', async (req, res) => {
  try {
    const data = await db.getAll('skills');
    res.json(data);
  } catch (error) {
    console.error("API GET Skills Error:", error);
    res.status(500).json({ error: "Could not fetch skills." });
  }
});

app.post('/api/skills', async (req, res) => {
  try {
    const { category, skills } = req.body;
    if (!category || !skills) {
      return res.status(400).json({ error: "Required fields missing (category, skills)." });
    }
    const parsedSkills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean);
    const item = await db.create({ category, skills: parsedSkills }, 'skills');
    res.status(201).json({ success: true, skill: item });
  } catch (error) {
    console.error("API POST Skill Error:", error);
    res.status(500).json({ error: "Could not save skill category." });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { category, skills } = req.body;
    const parsedSkills = Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : undefined);
    
    const updated = await db.update(id, {
      category,
      skills: parsedSkills
    }, 'skills');

    if (!updated) return res.status(404).json({ error: "Skill category not found." });
    res.json({ success: true, skill: updated });
  } catch (error) {
    console.error("API PUT Skill Error:", error);
    res.status(500).json({ error: "Could not modify skill category." });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.delete(id, 'skills');
    if (!deleted) return res.status(404).json({ error: "Skill category not found." });
    res.json({ success: true, message: "Skill category deleted successfully." });
  } catch (error) {
    console.error("API DELETE Skill Error:", error);
    res.status(500).json({ error: "Could not delete skill category." });
  }
});

// --- EXPERIENCES COLLECTION CRUD ---
app.get('/api/experiences', async (req, res) => {
  try {
    const data = await db.getAll('experiences');
    res.json(data);
  } catch (error) {
    console.error("API GET Experiences Error:", error);
    res.status(500).json({ error: "Could not fetch experiences." });
  }
});

app.post('/api/experiences', async (req, res) => {
  try {
    const { role, company, duration, location, desc } = req.body;
    if (!role || !company) {
      return res.status(400).json({ error: "Required fields missing (role, company)." });
    }
    const item = await db.create({ role, company, duration, location, desc }, 'experiences');
    res.status(201).json({ success: true, experience: item });
  } catch (error) {
    console.error("API POST Experience Error:", error);
    res.status(500).json({ error: "Could not save experience entry." });
  }
});

app.put('/api/experiences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role, company, duration, location, desc } = req.body;
    
    const updated = await db.update(id, {
      role, company, duration, location, desc
    }, 'experiences');

    if (!updated) return res.status(404).json({ error: "Experience entry not found." });
    res.json({ success: true, experience: updated });
  } catch (error) {
    console.error("API PUT Experience Error:", error);
    res.status(500).json({ error: "Could not modify experience entry." });
  }
});

app.delete('/api/experiences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.delete(id, 'experiences');
    if (!deleted) return res.status(404).json({ error: "Experience entry not found." });
    res.json({ success: true, message: "Experience entry deleted successfully." });
  } catch (error) {
    console.error("API DELETE Experience Error:", error);
    res.status(500).json({ error: "Could not delete experience entry." });
  }
});

// --- EDUCATION COLLECTION CRUD ---
app.get('/api/education', async (req, res) => {
  try {
    const data = await db.getAll('education');
    res.json(data);
  } catch (error) {
    console.error("API GET Education Error:", error);
    res.status(500).json({ error: "Could not fetch education data." });
  }
});

app.post('/api/education', async (req, res) => {
  try {
    const { degree, college, duration, details } = req.body;
    if (!degree || !college) {
      return res.status(400).json({ error: "Required fields missing (degree, college)." });
    }
    const item = await db.create({ degree, college, duration, details }, 'education');
    res.status(201).json({ success: true, education: item });
  } catch (error) {
    console.error("API POST Education Error:", error);
    res.status(500).json({ error: "Could not save education entry." });
  }
});

app.put('/api/education/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { degree, college, duration, details } = req.body;
    
    const updated = await db.update(id, {
      degree, college, duration, details
    }, 'education');

    if (!updated) return res.status(404).json({ error: "Education entry not found." });
    res.json({ success: true, education: updated });
  } catch (error) {
    console.error("API PUT Education Error:", error);
    res.status(500).json({ error: "Could not modify education entry." });
  }
});

app.delete('/api/education/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.delete(id, 'education');
    if (!deleted) return res.status(404).json({ error: "Education entry not found." });
    res.json({ success: true, message: "Education entry deleted successfully." });
  } catch (error) {
    console.error("API DELETE Education Error:", error);
    res.status(500).json({ error: "Could not delete education entry." });
  }
});

// --- CERTIFICATIONS COLLECTION CRUD ---
app.get('/api/certifications', async (req, res) => {
  try {
    const data = await db.getAll('certifications');
    res.json(data);
  } catch (error) {
    console.error("API GET Certifications Error:", error);
    res.status(500).json({ error: "Could not fetch certifications." });
  }
});

app.post('/api/certifications', async (req, res) => {
  try {
    const { title, issuer, desc } = req.body;
    if (!title || !issuer) {
      return res.status(400).json({ error: "Required fields missing (title, issuer)." });
    }
    const item = await db.create({ title, issuer, desc }, 'certifications');
    res.status(201).json({ success: true, certification: item });
  } catch (error) {
    console.error("API POST Certification Error:", error);
    res.status(500).json({ error: "Could not save certification entry." });
  }
});

app.put('/api/certifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, issuer, desc } = req.body;
    
    const updated = await db.update(id, {
      title, issuer, desc
    }, 'certifications');

    if (!updated) return res.status(404).json({ error: "Certification not found." });
    res.json({ success: true, certification: updated });
  } catch (error) {
    console.error("API PUT Certification Error:", error);
    res.status(500).json({ error: "Could not modify certification." });
  }
});

app.delete('/api/certifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.delete(id, 'certifications');
    if (!deleted) return res.status(404).json({ error: "Certification not found." });
    res.json({ success: true, message: "Certification deleted successfully." });
  } catch (error) {
    console.error("API DELETE Certification Error:", error);
    res.status(500).json({ error: "Could not delete certification." });
  }
});

// Start the Express Listener
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` MERN BACKEND SERVER RUNNING SECURELY ON PORT ${PORT} `);
  console.log(`===================================================`);
});
