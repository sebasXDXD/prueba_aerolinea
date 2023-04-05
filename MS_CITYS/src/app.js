import express from "express";
import morgan from "morgan";
import cors from "cors";
import ticketsRoutes from "./routes/citys.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3005"
}));

// Routes
app.use("/api", ticketsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;