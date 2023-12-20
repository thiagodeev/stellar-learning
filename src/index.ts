import express, { Express, Request, Response } from "express";
import birds from "./routes/index";


const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Olá");
});

// app.use("/test", router)
app.get("/test", (req: Request, res: Response) => {
  res.status(200).send("asdfasfd");
});

app.use('/birds', birds)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});