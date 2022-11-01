import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let id = req.query.id as string;
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const body = req.body;

  return (async () => {
    try {
      res.status(200).json(
        await prisma.packages.update({
          where: { id: parseInt(id) },

          ...body,
        })
      );
    } catch (err) {
      res.status(403).json({
        error: true,
        message: "Make Sure you enter the correct data",
        err,
      });
    } finally {
      prisma.$disconnect();
    }
  })();
};
