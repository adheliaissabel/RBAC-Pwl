import express from "express";
import "dotenv/config";
import path from "path";

import userRoutes from "./routers/userRoutes";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

// 🔐 fake login (WAJIB 1x saja)
app.use((req: any, res, next) => {
  req.user = { id: 1, role_id: 1 };
  next();
});

app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});