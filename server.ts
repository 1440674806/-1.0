import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock "State.DB" - In memory for this demo
  const history = [
    { id: '1', date: '2026-05-08', title: 'The Silent Morning', mood: 'Calm', duration: '04:12' },
    { id: '2', date: '2026-05-07', title: 'Urban Echoes', mood: 'Energetic', duration: '03:45' }
  ];

  // API Routes
  app.get("/api/history", (req, res) => {
    res.json(history);
  });

  app.post("/api/save-entry", (req, res) => {
    const entry = req.body;
    console.log("Saving to State.DB:", entry);
    res.json({ status: "success", id: Date.now().toString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Claudio-FM Server running on http://localhost:${PORT}`);
  });
}

startServer();
