import express from "express";
import morgan from "morgan";

const app = express();
const multer = require("multer");
//Storage configuration for our file upload using multer
const strorage = multer.diskStorage({
  //falta código acá
});

//Routes
import hotelesRoutes from "./routes/hoteles.routes";

//setting the view engine
app.set("view engine", "ejs");

//settings
app.set("port", 4000);

//Middleware
app.use(morgan("dev"));
app.use(express.json()); //nuestro "body-parser"
const upload = multer({});

//Routes
app.use("/api/hoteles", hotelesRoutes);

export default app;