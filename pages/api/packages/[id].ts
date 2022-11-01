import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let id = req.query.id as string;
  return (async () => {
    try {
      res.status(200).json(
        await prisma.packages.findUniqueOrThrow({
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
