import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Manually define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve Portfolio (HTML, CSS, JS) at "/"
app.use(express.static(path.join(__dirname, "portfolio")));

// Serve Padlet Clone (React App) at "/app/"
app.use("/app", express.static(path.join(__dirname, "padlet-clone/dist")));

// Ensure React Router works inside Padlet Clone
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(__dirname, "padlet-clone/dist/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
