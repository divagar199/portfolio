const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'projects.json');

// Default initial seed data (matching Divagar's portfolio showcases)
const DEFAULT_PROJECTS = [
  {
    id: "f83a48e2-c0cb-464a-9ef8-b197825b42fa",
    title: "Kuviyal",
    subtitle: "Digital Bookstore Platform",
    desc: "Built with MERN, Tailwind, Firebase, Supabase, Razorpay API. A digital bookstore that enables users to browse, search, purchase and download books online with seamless secure checkouts and cloud persistence.",
    tags: ["React.js", "Node.js", "Express", "MongoDB", "Firebase", "Supabase", "Razorpay", "Tailwind"],
    link: "https://github.com/divagar199",
    image: "" // Base64 placeholder (we will sync actual default base64 or reference static files)
  },
  {
    id: "e5cf6289-7221-48bf-ae4a-4e2b17a1c720",
    title: "TripAdvisor Clone",
    subtitle: "Online Travel Site UI",
    desc: "A pixel-perfect, highly responsive frontend clone of the TripAdvisor site, demonstrating advanced CSS grid/flexbox controls, precise layouts, custom micro-interactions, and high-fidelity responsive design standards.",
    tags: ["HTML5", "CSS3", "JavaScript (ES6+)", "DOM Manipulation", "Pixel-Perfect"],
    link: "https://github.com/divagar199",
    image: "" // Base64 placeholder
  }
];

// Helper: Ensure directories and database file exist
const initDatabase = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const projectsToSeed = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
    
    try {
      const rootAssetsDir = path.join(__dirname, '..', '..', 'assets', 'images');
      const kuviyalPath = path.join(rootAssetsDir, 'kuviyal_bookstore.png');
      const tripPath = path.join(rootAssetsDir, 'tripadvisor_clone.png');

      if (fs.existsSync(kuviyalPath)) {
        const kuviyalBase64 = fs.readFileSync(kuviyalPath).toString('base64');
        projectsToSeed[0].image = `data:image/png;base64,${kuviyalBase64}`;
        console.log("Seeded 'Kuviyal' bookstore preview image from file system.");
      }
      if (fs.existsSync(tripPath)) {
        const tripBase64 = fs.readFileSync(tripPath).toString('base64');
        projectsToSeed[1].image = `data:image/png;base64,${tripBase64}`;
        console.log("Seeded 'TripAdvisor' clone preview image from file system.");
      }
    } catch (err) {
      console.error("Could not read default images during database seed:", err.message);
    }

    // Write defaults
    fs.writeFileSync(DATA_FILE, JSON.stringify(projectsToSeed, null, 2), 'utf-8');
    console.log("Database file created and seeded with default portfolio projects.");
  }
};

// Main Database Controller API
const db = {
  // Read all projects
  async getAll() {
    initDatabase();
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error("Error reading database file, returning default projects:", error);
      return DEFAULT_PROJECTS;
    }
  },

  // Create a project
  async create(projectData) {
    initDatabase();
    const projects = await this.getAll();
    
    const newProject = {
      id: crypto.randomUUID(),
      title: projectData.title || "Untitled Project",
      subtitle: projectData.subtitle || "",
      desc: projectData.desc || "",
      tags: Array.isArray(projectData.tags) ? projectData.tags : [],
      link: projectData.link || "#",
      image: projectData.image || "",
      createdAt: new Date().toISOString()
    };

    projects.unshift(newProject); // Add to the top of the showcase list
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
    return newProject;
  },

  // Update a project
  async update(id, updateData) {
    initDatabase();
    const projects = await this.getAll();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return null;
    }

    const updatedProject = {
      ...projects[index],
      title: updateData.title !== undefined ? updateData.title : projects[index].title,
      subtitle: updateData.subtitle !== undefined ? updateData.subtitle : projects[index].subtitle,
      desc: updateData.desc !== undefined ? updateData.desc : projects[index].desc,
      tags: Array.isArray(updateData.tags) ? updateData.tags : projects[index].tags,
      link: updateData.link !== undefined ? updateData.link : projects[index].link,
      image: updateData.image !== undefined ? updateData.image : projects[index].image,
      updatedAt: new Date().toISOString()
    };

    projects[index] = updatedProject;
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
    return updatedProject;
  },

  // Delete a project
  async delete(id) {
    initDatabase();
    const projects = await this.getAll();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return false;
    }

    projects.splice(index, 1);
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
    return true;
  }
};

module.exports = db;
