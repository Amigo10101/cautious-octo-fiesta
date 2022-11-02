import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const body = req.body;

  (async () => {
    try {
      res.status(200).json(
        await prisma.pages.create({
          data: {
            disabled: false,
            created_on: moment().format(),
            ...body,
          },
        })
      );
    } catch (err) {
      console.error("error executing query:", err);
      console.log(body);
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
