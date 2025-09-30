/*
  Warnings:

  - You are about to drop the column `payment_type` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `orders` table. All the data in the column will be lost.
  - The `delivery_date` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."orders" DROP COLUMN "payment_type",
DROP COLUMN "value",
DROP COLUMN "delivery_date",
ADD COLUMN     "delivery_date" TIMESTAMP(3);
