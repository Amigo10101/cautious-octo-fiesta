import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import NextCors from "nextjs-cors";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let id = req.query.id as string;
  return (async () => {
    await NextCors(req, res, {
      methods: ["GET"],
      origin: "*",
      optionsSuccessStatus: 200,
    });
    try {
      res.status(200).json(
        await prisma.pages.findUniqueOrThrow({
          where: {
            id: parseInt(id),
          },
        })
      );
    } catch (err) {
      res.status(403).json({ err });
    } finally {
      prisma.$disconnect();
    }
  })();
};
