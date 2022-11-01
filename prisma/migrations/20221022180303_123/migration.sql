/*
  Warnings:

  - You are about to drop the column `data` on the `Packages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Packages" DROP COLUMN "data";
ALTER TABLE "Packages" ADD COLUMN     "content" JSONB;
