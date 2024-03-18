import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import { prisma } from "./prisma/prisma";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3001;

app.get("/tickets", async (req: Request, res: Response) => {
  try {
    const searchQuery = (req.query.searchQuery ?? "") as string;
    const { status } = req.query;

    const searchObject = {
      email: { search: searchQuery },
      name: { search: searchQuery },
      subject: { search: searchQuery },
    };

    const queryObject = {
      ...(searchQuery ? searchObject : {}),
      ...(status === "all" ? {} : { status: String(status) }),
    };

    const getTickets = prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
      where: queryObject,
      take: 10,
      skip: Number(req.query.page) * 10,
    });

    const getNumTickets = prisma.ticket.count({
      where: queryObject,
    });

    const [tickets, numTickets] = await Promise.all([
      getTickets,
      getNumTickets,
    ]);
    res.send({ tickets, numTickets });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/ticket/:ticketID", async (req: Request, res: Response) => {
  try {
    const data = await prisma.ticket.findUnique({
      where: { id: Number(req.params.ticketID) },
    });
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/ticket", async (req: Request, res: Response) => {
  try {
    const data = await prisma.ticket.create({
      data: { ...req.body, status: "new" },
    });

    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/status", async (req: Request, res: Response) => {
  try {
    const data = await prisma.ticket.update({
      where: { id: req.body.id },
      data: { status: req.body.status },
    });

    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
