/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Added the required column `depth` to the `Dimension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Dimension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Dimension` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dimension" ADD COLUMN     "depth" TEXT NOT NULL,
ADD COLUMN     "height" TEXT NOT NULL,
ADD COLUMN     "width" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);
