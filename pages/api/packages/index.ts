import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return (async () => {
    try {
      res.status(200).json(
        await prisma.packages.findMany({
          select: {
            name: true,
            price: true,
            disabled: true,
            created_on: true,
            id: true,
            content: true,
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
