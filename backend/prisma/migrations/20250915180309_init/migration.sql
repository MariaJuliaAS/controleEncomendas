/*
  Warnings:

  - Made the column `delivery_date` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."orders" ALTER COLUMN "delivery_date" SET NOT NULL,
ALTER COLUMN "delivery_date" SET DATA TYPE TEXT;
