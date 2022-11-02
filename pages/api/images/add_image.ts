import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import { randomUUID } from "crypto";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

var path = require("path");
const prisma = new PrismaClient();

var filename = "";
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const uuid = randomUUID();
      cb(null, uuid + path.extname(file.originalname));
      filename = uuid + path.extname(file.originalname);
    },
  }),
});

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post((req, res) => {
  (async () => {
    try {
      res.status(200).json(
        await prisma.images.create({
          data: {
            url: filename,
            created_on: moment().format(),
          },
        })
      );
    } catch (err) {
      console.error("error executing query:", err);
      console.log();
      res.status(403).json({
        error: true,
        message: "Make Sure you enter the correct data",
        err,
      });
    } finally {
      prisma.$disconnect();
    }
  })();
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
