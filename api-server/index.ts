import express from "express";
import cors from "cors";
import path from "path";

const PORT = process.env.PORT || 9000;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});
app.listen(PORT, () => {
  console.log("started", PORT);
});
