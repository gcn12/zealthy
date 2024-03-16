import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { prisma } from "./prisma/prisma";

dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.get("/", async (req: Request, res: Response) => {
  const data = await prisma.ticket.findMany();
  res.send(data);
});

app.get("/generate", async (req: Request, res: Response) => {
  await prisma.ticket.create({
    data: {
      description:
        "Lorem ipsum dolor sit amet consectetur. Nunc nascetur morbi vulputate blandit purus faucibus semper malesuada. Vitae pretium eu nunc dictum vestibulum morbi dolor tempus. Viverra enim dignissim nunc turpis. Amet duis a pellentesque fames fringilla et urna.",
      email: "harris@gmail.com",
      name: "John Harris",
      status: "new",
      subject: "App will not connect",
    },
  });
  // const data = await prisma.ticket.findMany();
  // res.send(data);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
