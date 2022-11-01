import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let id = req.query.id as string;
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    console.log(req.query);
    return;
  }
  const fs = require("fs");

  const path = "./file.txt";

  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  return (async () => {
    try {
      res.status(200).json(
        await prisma.images.delete({
          where: { id: id },
        })
      );
    } catch (err) {
      console.error("error executing query:", err);
      res.status(403).json(err.meta.cause);
    } finally {
      prisma.$disconnect();
    }
  })();
};
