// server.ts
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var PORT = Number(process.env.PORT) || 3e3;
var distDir = path.resolve(__dirname, "dist");
var distIndex = path.join(distDir, "index.html");
var isDevMode = process.argv.includes("--dev") || process.env.npm_lifecycle_event === "dev";
var isProduction = process.env.NODE_ENV === "production" || !isDevMode && fs.existsSync(distIndex);
async function startServer() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "b-render-architectural-studio" });
  });
  app.post("/api/bookings", (req, res) => {
    const body = req.body ?? {};
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const consultationDate = typeof body.consultationDate === "string" ? body.consultationDate.trim() : "";
    if (!fullName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !consultationDate) {
      res.status(400).json({ error: "Valid name, email, and consultation date are required." });
      return;
    }
    const code = Math.floor(1e3 + Math.random() * 9e3);
    res.status(201).json({
      referenceId: `BR-2026-${code}`,
      fullName,
      email,
      company: typeof body.company === "string" && body.company.trim() ? body.company.trim() : "Independent Practice",
      serviceTitle: typeof body.serviceTitle === "string" && body.serviceTitle.trim() ? body.serviceTitle.trim() : "Exterior Architectural Stills",
      viewCount: typeof body.viewCount === "number" ? body.viewCount : 1,
      consultationDate,
      estimatedDays: typeof body.estimatedDays === "string" && body.estimatedDays.trim() ? body.estimatedDays.trim() : "5\u20137 Business Days"
    });
  });
  if (isProduction && fs.existsSync(distIndex)) {
    app.use(express.static(distDir, { maxAge: "7d" }));
    app.get("*", (_req, res) => {
      res.sendFile(distIndex);
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`B-Render Architectural Studio listening on port ${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
