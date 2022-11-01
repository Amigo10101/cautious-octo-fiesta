/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Packages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Packages" ADD COLUMN     "name" STRING NOT NULL;
ALTER TABLE "Packages" ADD COLUMN     "price" FLOAT8 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Packages_name_key" ON "Packages"("name");
