/*
  Warnings:

  - Added the required column `value` to the `Dimension` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dimension" ADD COLUMN     "value" TEXT NOT NULL;
