import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { init } from "./start.services.js";
const app: Application = express();
const PORT = process.env.PORT_CONSUMER || 7000;

init();

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
