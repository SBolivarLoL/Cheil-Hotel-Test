import express from "express";
import morgan from "morgan";

//Routes
import hotelesRoutes from "./routes/hoteles.routes";

const app = express();

//settings
app.set("port", 4000);

//Middleware
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/hoteles", hotelesRoutes);

export default app;