import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { init } from "./start.services.js";
import { produceMessage } from "./controller/producer.js";
const app: Application = express();
const PORT = process.env.PORT_PRODUCER || 7000;

init();

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});
app.post("/post-producer", produceMessage);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
