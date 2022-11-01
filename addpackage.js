const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  try {
    console.log(
      await prisma.packages.findUnique({
        where: { disabled: false },
        select: {
          name: true,
        },
      })
    );
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    prisma.$disconnect();
  }
})();
