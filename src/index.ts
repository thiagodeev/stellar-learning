import express, { Express, Request, Response } from "express";
import createKeypar from "./routes/createKeypar";
import balance from "./routes/balance";

const app: Express = express();
const port = 3000;

app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h5>====================</h5><h3>Wellcome</h3><h5>====================</h5><p> Made by Thiagodeev</p>");
});


app.use('/createKeypar', createKeypar)
app.use('/balance', balance)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});