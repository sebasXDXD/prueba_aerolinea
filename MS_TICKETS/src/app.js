import express from "express";
import morgan from "morgan";
import cors from "cors"
import ticketsRoutes from "./routes/tickets.routes.js";

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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;