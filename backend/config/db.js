const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Seeding Data Configurations
const SEED_DATA = {
  projects: [
    {
      id: "f83a48e2-c0cb-464a-9ef8-b197825b42fa",
      title: "Kuviyal",
      subtitle: "Digital Bookstore Platform",
      desc: "Built with MERN, Tailwind, Firebase, Supabase, Razorpay API. A digital bookstore that enables users to browse, search, purchase and download books online with seamless secure checkouts and cloud persistence.",
      tags: ["React.js", "Node.js", "Express", "MongoDB", "Firebase", "Supabase", "Razorpay", "Tailwind"],
      link: "https://github.com/divagar199",
      image: "" // Handled via base64 seeding
    },
    {
      id: "e5cf6289-7221-48bf-ae4a-4e2b17a1c720",
      title: "TripAdvisor Clone",
      subtitle: "Online Travel Site UI",
      desc: "A pixel-perfect, highly responsive frontend clone of the TripAdvisor site, demonstrating advanced CSS grid/flexbox controls, precise layouts, custom micro-interactions, and high-fidelity responsive design standards.",
      tags: ["HTML5", "CSS3", "JavaScript (ES6+)", "DOM Manipulation", "Pixel-Perfect"],
      link: "https://github.com/divagar199",
      image: ""
    }
  ],
  skills: [
    {
      id: "skills-cat-0",
      category: "Frontend",
      skills: ["React.js", "HTML5", "CSS3", "JavaScript ES6+", "Tailwind CSS"]
    },
    {
      id: "skills-cat-1",
      category: "Backend & APIs",
      skills: ["Node.js", "Express.js", "REST APIs"]
    },
    {
      id: "skills-cat-2",
      category: "Database",
      skills: ["MongoDB"]
    },
    {
      id: "skills-cat-3",
      category: "Cloud & Integration",
      skills: ["Firebase", "Supabase", "Razorpay API"]
    },
    {
      id: "skills-cat-4",
      category: "AI & Productivity",
      skills: ["ChatGPT", "Google Gemini", "Prompt Engineering", "Git", "Vercel", "Render"]
    }
  ],
  experiences: [
    {
      id: "exp-0",
      role: "Floor Manager",
      company: "V-Mart Retail Ltd",
      duration: "APR 2025 - SEP 2025",
      location: "Coimbatore",
      desc: "Spearheaded store floor activities and inventory workflows, cultivating seamless operations and high performance. Handled visual layouts, stock management, and team synchronization, refining outstanding organizational and agile troubleshooting abilities in high-intensity settings."
    },
    {
      id: "exp-1",
      role: "Sales Executive",
      company: "Zink London (Pantaloons)",
      duration: "JUL 2023 - APR 2025",
      location: "Tiruppur",
      desc: "Drove commercial performance, client interaction, and customer satisfaction. Strengthened key skills in proactive engagement, customer relation frameworks, and data tracking, enhancing interpersonal communications and goal-focused strategic planning."
    },
    {
      id: "exp-2",
      role: "Sales Assistant",
      company: "Max Fashion India",
      duration: "JUN 2020 - OCT 2021",
      location: "Tiruppur",
      desc: "Assisted customers, managed shelf displays, and handled front-end transactions. Fostered collaborative capabilities, active problem resolution techniques, and customer experience methodologies."
    }
  ],
  education: [
    {
      id: "edu-0",
      degree: "M.Sc. in Computer Science",
      college: "Park's College",
      duration: "2023 - 2025",
      details: "Acquired advanced knowledge in database administration, software modeling, computer networks, and full-stack systems architecture. Specialized in leveraging MERN stack integrations and cloud architectures."
    },
    {
      id: "edu-1",
      degree: "BCA (Bachelor of Computer Applications)",
      college: "Park's College",
      duration: "2020 - 2023",
      details: "Established robust fundamental concepts in object-oriented programming, data structures, UI design, web layouts, and SQL query scripting."
    }
  ],
  certifications: [
    {
      id: "cert-0",
      title: "MERN Full Stack Developer",
      issuer: "Professional Certification",
      desc: "Detailed mastery in structuring React frontends, Express APIs, Node execution contexts, and MongoDB clusters."
    },
    {
      id: "cert-1",
      title: "Prompt Engineering Course",
      issuer: "Advanced AI Systems",
      desc: "Formulating advanced templates, multi-shot styling, and role constraints to streamline high-quality coding deliverables."
    },
    {
      id: "cert-2",
      title: "Power BI Master Certification",
      issuer: "Data Analysis & Visuals",
      desc: "Data cleaning pipelines, interactive dashboard modeling, DAX query logic, and robust business visual analytics."
    }
  ]
};

// Helper: Ensure directories and database files exist with proper seeding
const initDatabase = (collection) => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const filePath = path.join(DATA_DIR, `${collection}.json`);

  if (!fs.existsSync(filePath)) {
    const defaultData = SEED_DATA[collection] || [];
    const seededData = JSON.parse(JSON.stringify(defaultData));

    // Special base64 image seeding for projects
    if (collection === 'projects' && seededData.length > 0) {
      try {
        const rootAssetsDir = path.join(__dirname, '..', '..', 'assets', 'images');
        const kuviyalPath = path.join(rootAssetsDir, 'kuviyal_bookstore.png');
        const tripPath = path.join(rootAssetsDir, 'tripadvisor_clone.png');

        if (fs.existsSync(kuviyalPath)) {
          const kuviyalBase64 = fs.readFileSync(kuviyalPath).toString('base64');
          seededData[0].image = `data:image/png;base64,${kuviyalBase64}`;
          console.log("Seeded 'Kuviyal' bookstore preview image from file system.");
        }
        if (fs.existsSync(tripPath)) {
          const tripBase64 = fs.readFileSync(tripPath).toString('base64');
          seededData[1].image = `data:image/png;base64,${tripBase64}`;
          console.log("Seeded 'TripAdvisor' clone preview image from file system.");
        }
      } catch (err) {
        console.error("Could not read default project images during database seed:", err.message);
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(seededData, null, 2), 'utf-8');
    console.log(`Database collection file '${collection}.json' created and seeded.`);
  }
};

// Main Database Controller API
const db = {
  // Read all records in a collection
  async getAll(collection = 'projects') {
    initDatabase(collection);
    const filePath = path.join(DATA_DIR, `${collection}.json`);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error reading database file for ${collection}, returning defaults:`, error);
      return SEED_DATA[collection] || [];
    }
  },

  // Create a record in a collection
  async create(data, collection = 'projects') {
    initDatabase(collection);
    const items = await this.getAll(collection);
    
    const newItem = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString()
    };

    items.unshift(newItem); // Add to the top of the list
    const filePath = path.join(DATA_DIR, `${collection}.json`);
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');
    return newItem;
  },

  // Update a record in a collection
  async update(id, updateData, collection = 'projects') {
    initDatabase(collection);
    const items = await this.getAll(collection);
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      return null;
    }

    const updatedItem = {
      ...items[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    items[index] = updatedItem;
    const filePath = path.join(DATA_DIR, `${collection}.json`);
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');
    return updatedItem;
  },

  // Delete a record in a collection
  async delete(id, collection = 'projects') {
    initDatabase(collection);
    const items = await this.getAll(collection);
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      return false;
    }

    items.splice(index, 1);
    const filePath = path.join(DATA_DIR, `${collection}.json`);
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');
    return true;
  }
};

module.exports = db;
