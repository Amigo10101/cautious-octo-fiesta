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

  return (async () => {
    try {
      res.status(200).json(
        await prisma.pages.delete({
          where: { id: parseInt(id) },
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
