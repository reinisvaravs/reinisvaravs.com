import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Portfolio at "/"
app.use("/", express.static(path.join(__dirname, "portfolio")));
app.use("/app", express.static(path.join(__dirname, "frontend-todo/dist")));
app.use("/store", express.static(path.join(__dirname, "frontend-ecom/dist")));

app.get("/app/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend-todo/dist/index.html"));
});
app.get("/store/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend-ecom/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
