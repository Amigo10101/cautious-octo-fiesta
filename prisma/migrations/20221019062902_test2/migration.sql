-- AlterTable
ALTER TABLE "Packages" ALTER COLUMN "data" DROP NOT NULL;
ALTER TABLE "Packages" ALTER COLUMN "name" DROP NOT NULL;
ALTER TABLE "Packages" ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "email" DROP NOT NULL;