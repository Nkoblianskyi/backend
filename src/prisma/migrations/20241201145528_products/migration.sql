/*
  Warnings:

  - You are about to drop the column `type` on the `Dimension` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Dimension` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `depth` on table `Dimension` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Image_url_key";

-- DropIndex
DROP INDEX "Product_name_key";

-- AlterTable
ALTER TABLE "Dimension" DROP COLUMN "type",
DROP COLUMN "value",
ALTER COLUMN "depth" SET NOT NULL;

-- DropTable
DROP TABLE "User";
