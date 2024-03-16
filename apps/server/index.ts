import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { prisma } from "./prisma/prisma";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3001;

app.get("/tickets", async (req: Request, res: Response) => {
  const data = await prisma.ticket.findMany();
  res.send(data);
});

app.get("/ticket/:ticketID", async (req: Request, res: Response) => {
  const data = await prisma.ticket.findUnique({
    where: { id: Number(req.params.ticketID) },
  });
  res.send(data);
});

app.post("/ticket", async (req: Request, res: Response) => {
  const data = await prisma.ticket.create({
    data: { ...req.body, status: "new" },
  });

  res.send(data);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
