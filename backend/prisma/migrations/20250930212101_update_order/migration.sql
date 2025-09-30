/*
  Warnings:

  - You are about to drop the column `name` on the `itens` table. All the data in the column will be lost.
  - Added the required column `nameItem` to the `itens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."itens" DROP COLUMN "name",
ADD COLUMN     "nameItem" TEXT NOT NULL;
